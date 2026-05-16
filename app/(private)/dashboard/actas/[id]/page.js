import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectMongo from "@/lib/mongoose";
import toPlain from "@/lib/toPlain";
import Acta from "@/models/Acta";
import PageShell from "@/components/templates/PageShell";
import ActaResultView from "@/components/organisms/ActaResultView";

export const dynamic = "force-dynamic";

export default async function ActaDetailPage({ params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  await connectMongo();
  const acta = await Acta.findById(id).populate(
    "decisiones.operador",
    "name image"
  );
  if (!acta) notFound();

  // Mongoose document → fully plain JSON for the client component.
  // toJSON() alone leaves ObjectIds in subdocuments; toPlain serializes the
  // whole tree.
  const data = toPlain(acta);

  return (
    <PageShell>
      <div className="flex flex-col gap-8">
        <Link
          href="/dashboard/actas"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} strokeWidth={2.25} />
          Volver a la bandeja
        </Link>

        <ActaResultView acta={data} readOnly />
      </div>
    </PageShell>
  );
}
