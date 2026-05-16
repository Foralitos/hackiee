import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import { uploadActa } from "@/lib/cloudinary";
import { extraerActa } from "@/lib/ocr";
import { validarActa } from "@/lib/validador";
import { clasificar } from "@/lib/clasificador";
import Acta from "@/models/Acta";
import Casilla from "@/models/Casilla";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_COLAS = new Set(["verde", "amarilla", "roja"]);
const VALID_ESTADOS = new Set([
  "pendiente",
  "en_revision",
  "esperando_verificacion",
  "discrepancia",
  "validada",
  "corregida",
  "devuelta",
]);
// "Decididas o en proceso de revisión" — todo lo que aparece en la bandeja
// por default. Las pendientes (recién subidas, sin tocar) quedan fuera.
const FINAL_ESTADOS = [
  "validada",
  "corregida",
  "devuelta",
  "esperando_verificacion",
  "discrepancia",
];

export async function GET(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const cola = params.get("cola");
  const estado = params.get("estado");
  const limit = Math.min(parseInt(params.get("limit") || "50", 10) || 50, 100);
  const skip = parseInt(params.get("skip") || "0", 10) || 0;

  const query = {};
  if (cola && VALID_COLAS.has(cola)) query["clasificacion.cola"] = cola;
  if (estado && VALID_ESTADOS.has(estado)) {
    query.estado = estado;
  } else {
    // Default: historial puro (solo actas decididas).
    query.estado = { $in: FINAL_ESTADOS };
  }

  await connectMongo();

  const [actas, total] = await Promise.all([
    Acta.find(query)
      .select(
        "clasificacion estado createdAt updatedAt extraccion.identificacion decisiones casilla"
      )
      .populate("decisiones.operador", "name image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true }),
    Acta.countDocuments(query),
  ]);

  // lean() with virtuals still leaves _id; normalize to id for the client.
  const cleaned = actas.map((a) => ({
    ...a,
    id: a._id?.toString(),
    _id: undefined,
  }));

  return NextResponse.json({ actas: cleaned, total });
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "expected multipart/form-data" },
      { status: 400 }
    );
  }

  const file = form.get("image");
  const casillaId = form.get("casillaId") || null;

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "missing 'image' file field" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  await connectMongo();

  // 1. Subir imagen a Cloudinary
  const imagen = await uploadActa(buffer, {
    casillaId: casillaId || "sin-casilla",
  });

  // 2. OCR vía OpenRouter (Gemini 2.5 Flash por default)
  const { extraccion, usage, model } = await extraerActa(imagen.secureUrl);

  // 3. Cross-check externo si tenemos casilla referenciada
  let listaNominalCasilla = null;
  let casillaRef = null;
  if (casillaId) {
    casillaRef = await Casilla.findById(casillaId);
    if (casillaRef) listaNominalCasilla = casillaRef.listaNominal ?? null;
  }

  // 4. Validador determinista
  const validacion = validarActa(extraccion, { listaNominalCasilla });

  // 5. Clasificador V/A/R
  const clasificacion = clasificar(extraccion, validacion);

  // 6. Persistir
  const acta = await Acta.create({
    casilla: casillaRef?._id,
    imagen,
    extraccion,
    validacion,
    clasificacion,
    estado: "pendiente",
    modelo: model,
    usage,
  });

  return NextResponse.json({ acta }, { status: 201 });
}
