import { headers } from "next/headers";
import PageShell from "@/components/templates/PageShell";
import SupervisorOverview from "@/components/organisms/SupervisorOverview";

export const dynamic = "force-dynamic";

async function fetchStats() {
  // Use absolute URL constructed from incoming headers so that the server-side
  // fetch hits our own /api/actas/stats with the user's cookies forwarded.
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || "http";
  const cookie = h.get("cookie") || "";

  const res = await fetch(`${proto}://${host}/api/actas/stats`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`stats fetch failed: ${res.status}`);
  }
  return res.json();
}

export default async function SupervisorPage() {
  let stats = null;
  let error = null;
  try {
    stats = await fetchStats();
  } catch (e) {
    error = e.message;
  }

  return (
    <PageShell>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Supervisor</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Monitor operativo del PREP en tiempo real. Volumen, distribución
            por cola, tiempos de decisión y operadores activos.
          </p>
        </header>

        {error ? (
          <div className="p-4 border-l-2 border-red-700 bg-red-50/60 dark:bg-red-950/20 text-sm font-mono text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : (
          <SupervisorOverview stats={stats} />
        )}
      </div>
    </PageShell>
  );
}
