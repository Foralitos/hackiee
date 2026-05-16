import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Acta from "@/models/Acta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function num(field) {
  if (field == null) return null;
  if (typeof field === "object" && "votos" in field) return field.votos;
  return field;
}

// Compare two extractions field-by-field. Returns { matched: bool, diffs: [...] }.
function compareExtracciones(a, b) {
  const diffs = [];
  const ab = a?.boletas || {};
  const bb = b?.boletas || {};
  for (const k of ["recibidas", "sobrantes", "personasQueVotaron", "repsPartidos"]) {
    if ((ab[k] ?? null) !== (bb[k] ?? null)) {
      diffs.push({ campo: `boletas.${k}`, primera: ab[k] ?? null, segunda: bb[k] ?? null });
    }
  }

  const aPart = a?.votosPorPartido || [];
  const bPart = b?.votosPorPartido || [];
  const map = new Map();
  for (const p of aPart) map.set(p.partido, num(p));
  for (const p of bPart) {
    const primera = map.get(p.partido);
    const segunda = num(p);
    if (primera !== segunda) {
      diffs.push({ campo: `partido.${p.partido}`, primera, segunda });
    }
    map.delete(p.partido);
  }
  for (const [partido, primera] of map.entries()) {
    diffs.push({ campo: `partido.${partido}`, primera, segunda: null });
  }

  for (const k of ["noRegistrados", "nulos", "totalVotos"]) {
    const primera = num(a?.[k]);
    const segunda = num(b?.[k]);
    if (primera !== segunda) {
      diffs.push({ campo: k, primera, segunda });
    }
  }

  return { matched: diffs.length === 0, diffs };
}

export async function POST(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "invalid acta id" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected JSON body" }, { status: 400 });
  }

  const captura = body?.extraccion;
  if (!captura || typeof captura !== "object") {
    return NextResponse.json(
      { error: "extraccion (object) is required" },
      { status: 400 }
    );
  }

  await connectMongo();

  const acta = await Acta.findById(id);
  if (!acta) {
    return NextResponse.json({ error: "acta not found" }, { status: 404 });
  }

  if (acta.estado !== "esperando_verificacion") {
    return NextResponse.json(
      { error: `acta is ${acta.estado}, not waiting for verification` },
      { status: 409 }
    );
  }

  // The "first capture" is the current acta.extraccion (saved by the
  // correction endpoint). Compare the new submission against it.
  const { matched, diffs } = compareExtracciones(acta.extraccion, captura);

  acta.decisiones.push({
    operador: session.user.id,
    tipo: matched ? "validar" : "reprocesar",
    nota: matched
      ? "Verificación coincide con la primera captura"
      : `Discrepancia: ${diffs.length} campo(s) distintos`,
    payload: { capturaSecundaria: captura, matched, diffs },
  });

  acta.estado = matched ? "validada" : "discrepancia";

  await acta.save();
  await acta.populate("decisiones.operador", "name image");

  return NextResponse.json({ acta, matched, diffs }, { status: 200 });
}
