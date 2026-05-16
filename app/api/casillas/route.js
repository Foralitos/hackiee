import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Casilla from "@/models/Casilla";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const q = (params.get("q") || "").trim();
  const limit = Math.min(parseInt(params.get("limit") || "50", 10) || 50, 100);

  const filter = {};
  if (q) {
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [
      { identificador: re },
      { seccion: re },
      { distrito: re },
      { entidad: re },
    ];
  }

  await connectMongo();

  const casillas = await Casilla.find(filter)
    .sort({ identificador: 1 })
    .limit(limit)
    .lean({ virtuals: true });

  return NextResponse.json({
    casillas: casillas.map((c) => ({ ...c, id: c._id?.toString(), _id: undefined })),
  });
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected JSON body" }, { status: 400 });
  }

  const { entidad, distrito, seccion, tipoCasilla, identificador, listaNominal } =
    body || {};

  if (!seccion || !identificador) {
    return NextResponse.json(
      { error: "seccion and identificador are required" },
      { status: 400 }
    );
  }

  await connectMongo();

  try {
    const casilla = await Casilla.create({
      entidad,
      distrito,
      seccion,
      tipoCasilla: tipoCasilla || "basica",
      identificador,
      listaNominal: typeof listaNominal === "number" ? listaNominal : undefined,
    });
    return NextResponse.json({ casilla }, { status: 201 });
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: `identificador "${identificador}" ya existe` },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: err?.message || "error creando casilla" },
      { status: 500 }
    );
  }
}
