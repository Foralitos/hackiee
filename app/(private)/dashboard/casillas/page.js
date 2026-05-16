import PageShell from "@/components/templates/PageShell";
import CasillasManager from "@/components/organisms/CasillasManager";

export const dynamic = "force-dynamic";

export default function CasillasPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Casillas</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Registra las casillas con su lista nominal para activar el
            cross-check durante el procesamiento de actas.
          </p>
        </header>

        <CasillasManager />
      </div>
    </PageShell>
  );
}
