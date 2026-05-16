import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Acta from "@/models/Acta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "invalid acta id" }, { status: 400 });
  }

  await connectMongo();

  const acta = await Acta.findById(id).populate(
    "decisiones.operador",
    "name image"
  );
  if (!acta) {
    return NextResponse.json({ error: "acta not found" }, { status: 404 });
  }

  return NextResponse.json({ acta });
}
