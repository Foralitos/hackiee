import PageShell from "@/components/templates/PageShell";
import UploadActaForm from "@/components/organisms/UploadActaForm";

export const dynamic = "force-dynamic";

export default function UploadActaPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Procesar acta
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sube la foto de un acta de escrutinio y cómputo. El sistema la
            clasificará en cola verde, amarilla o roja según OCR + validación
            matemática.
          </p>
        </header>

        <UploadActaForm />
      </div>
    </PageShell>
  );
}
