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
