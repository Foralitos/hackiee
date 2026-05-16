import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectMongo from "@/lib/mongoose";
import toPlain from "@/lib/toPlain";
import Acta from "@/models/Acta";
import PageShell from "@/components/templates/PageShell";
import CapturaSecundariaForm from "@/components/organisms/CapturaSecundariaForm";

export const dynamic = "force-dynamic";

export default async function VerificarActaPage({ params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  await connectMongo();
  const acta = await Acta.findById(id);
  if (!acta) notFound();

  if (acta.estado !== "esperando_verificacion") {
    return (
      <PageShell>
        <div className="flex flex-col gap-6">
          <Link
            href={`/dashboard/actas/${id}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft size={14} strokeWidth={2.25} />
            Ver detalle del acta
          </Link>
          <div className="p-4 border-l-2 border-amber-700 bg-amber-50/60 dark:bg-amber-950/20 text-sm">
            <strong>Esta acta no está esperando verificación.</strong>
            <span className="ml-2 font-mono text-xs text-stone-500">
              estado: {acta.estado}
            </span>
          </div>
        </div>
      </PageShell>
    );
  }

  const data = toPlain(acta);

  return (
    <PageShell>
      <div className="flex flex-col gap-6">
        <Link
          href="/dashboard/actas"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} strokeWidth={2.25} />
          Volver a la bandeja
        </Link>

        <CapturaSecundariaForm acta={data} />
      </div>
    </PageShell>
  );
}
