import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Acta from "@/models/Acta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await connectMongo();

  const [facet] = await Acta.aggregate([
    {
      $facet: {
        total: [{ $count: "count" }],
        porEstado: [{ $group: { _id: "$estado", count: { $sum: 1 } } }],
        porCola: [
          { $group: { _id: "$clasificacion.cola", count: { $sum: 1 } } },
        ],
        topDistritos: [
          { $match: { "extraccion.identificacion.distrito": { $exists: true, $ne: null } } },
          {
            $group: {
              _id: "$extraccion.identificacion.distrito",
              count: { $sum: 1 },
              rojas: {
                $sum: {
                  $cond: [{ $eq: ["$clasificacion.cola", "roja"] }, 1, 0],
                },
              },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ],
        topOperadores: [
          { $unwind: "$decisiones" },
          {
            $group: {
              _id: "$decisiones.operador",
              decisiones: { $sum: 1 },
            },
          },
          { $sort: { decisiones: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              _id: 0,
              decisiones: 1,
              name: "$user.name",
              image: "$user.image",
            },
          },
        ],
        tiempoDecision: [
          {
            $match: {
              estado: { $in: ["validada", "corregida", "devuelta"] },
              "decisiones.0": { $exists: true },
            },
          },
          {
            $project: {
              ms: {
                $subtract: [
                  { $arrayElemAt: ["$decisiones.createdAt", -1] },
                  "$createdAt",
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              avgMs: { $avg: "$ms" },
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);

  const counts = { pendiente: 0, validada: 0, corregida: 0, devuelta: 0, esperando_verificacion: 0, discrepancia: 0, en_revision: 0 };
  for (const row of facet.porEstado || []) {
    counts[row._id] = row.count;
  }

  const colas = { verde: 0, amarilla: 0, roja: 0 };
  for (const row of facet.porCola || []) {
    if (row._id) colas[row._id] = row.count;
  }

  const tiempo = facet.tiempoDecision?.[0];

  return NextResponse.json({
    total: facet.total?.[0]?.count || 0,
    porEstado: counts,
    porCola: colas,
    topDistritos: facet.topDistritos || [],
    topOperadores: facet.topOperadores || [],
    tiempoPromedio: tiempo
      ? {
          ms: tiempo.avgMs,
          minutos: tiempo.avgMs / 60000,
          count: tiempo.count,
        }
      : null,
  });
}
