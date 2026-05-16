import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Acta from "@/models/Acta";
import Casilla from "@/models/Casilla";
import { validarActa } from "@/lib/validador";
import { clasificar } from "@/lib/clasificador";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FINAL_STATES = new Set(["validada", "devuelta"]);

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

  const newExtraccion = body?.extraccion;
  const nota = typeof body?.nota === "string" ? body.nota.trim() : "";
  if (!newExtraccion || typeof newExtraccion !== "object") {
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

  if (FINAL_STATES.has(acta.estado)) {
    return NextResponse.json(
      { error: `acta already ${acta.estado}, cannot correct` },
      { status: 409 }
    );
  }

  // Re-run validator with current casilla's lista nominal (if any).
  let listaNominalCasilla = null;
  if (acta.casilla) {
    const casilla = await Casilla.findById(acta.casilla);
    if (casilla) listaNominalCasilla = casilla.listaNominal ?? null;
  }

  const validacion = validarActa(newExtraccion, { listaNominalCasilla });
  const clasificacion = clasificar(newExtraccion, validacion);

  // Snapshot the before/after for audit. Decisions[].payload carries it.
  const antes = acta.extraccion;
  acta.extraccion = newExtraccion;
  acta.validacion = validacion;
  acta.clasificacion = clasificacion;

  acta.decisiones.push({
    operador: session.user.id,
    tipo: "corregir",
    nota: nota || undefined,
    payload: { antes, despues: newExtraccion },
  });

  // After a correction, the acta moves into double-capture queue.
  acta.estado = "esperando_verificacion";

  await acta.save();
  await acta.populate("decisiones.operador", "name image");

  return NextResponse.json({ acta }, { status: 200 });
}
