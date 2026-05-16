import PageShell from "@/components/templates/PageShell";
import ActaBrowser from "@/components/organisms/ActaBrowser";

export const dynamic = "force-dynamic";

export default function BandejaPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Bandeja de actas
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Historial de actas decididas. Filtra por estado o cola y abre
            cualquiera para revisar su detalle.
          </p>
        </header>

        <ActaBrowser />
      </div>
    </PageShell>
  );
}
