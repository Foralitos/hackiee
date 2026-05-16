import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Acta from "@/models/Acta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIPO_TO_ESTADO = {
  validar: "validada",
  corregir: "corregida",
  devolver: "devuelta",
};

const FINAL_STATES = new Set(["validada", "corregida", "devuelta"]);

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

  const tipo = body?.tipo;
  const nota = typeof body?.nota === "string" ? body.nota.trim() : "";

  if (!TIPO_TO_ESTADO[tipo]) {
    return NextResponse.json(
      { error: "tipo must be one of: validar, corregir, devolver" },
      { status: 400 }
    );
  }

  if (tipo === "devolver" && nota.length < 3) {
    return NextResponse.json(
      { error: "nota is required when devolver (min 3 chars)" },
      { status: 400 }
    );
  }

  await connectMongo();

  const acta = await Acta.findById(id);
  if (!acta) {
    return NextResponse.json({ error: "acta not found" }, { status: 404 });
  }

  if (FINAL_STATES.has(acta.estado)) {
    return NextResponse.json(
      { error: `acta already ${acta.estado}` },
      { status: 409 }
    );
  }

  acta.decisiones.push({
    operador: session.user.id,
    tipo,
    nota: nota || undefined,
    payload: null,
  });
  acta.estado = TIPO_TO_ESTADO[tipo];

  await acta.save();
  await acta.populate("decisiones.operador", "name image");

  return NextResponse.json({ acta }, { status: 201 });
}
