import KpiCard from "@/components/molecules/KpiCard";
import ColaDistributionBar from "@/components/molecules/ColaDistributionBar";
import TopList from "@/components/molecules/TopList";

function SectionHeading({ number, title }) {
  return (
    <header className="flex items-baseline gap-3 mb-5">
      <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-400 dark:text-stone-600">
        {number}
      </span>
      <h2 className="text-base font-semibold text-foreground tracking-tight">
        {title}
      </h2>
    </header>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-stone-200/70 dark:border-stone-800/70" />;
}

function formatMinutes(mins) {
  if (mins == null) return "—";
  if (mins < 1) return `${(mins * 60).toFixed(0)}s`;
  if (mins < 60) return `${mins.toFixed(1)} min`;
  return `${(mins / 60).toFixed(1)} h`;
}

export default function SupervisorOverview({ stats }) {
  const { total, porEstado, porCola, topDistritos, topOperadores, tiempoPromedio } =
    stats || {};

  const decididas =
    (porEstado?.validada || 0) +
    (porEstado?.corregida || 0) +
    (porEstado?.devuelta || 0);
  const pendientesTotal =
    (porEstado?.pendiente || 0) +
    (porEstado?.esperando_verificacion || 0) +
    (porEstado?.discrepancia || 0);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionHeading number="01" title="Totales" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiCard label="Procesadas" value={total ?? 0} />
          <KpiCard
            label="Validadas"
            value={porEstado?.validada ?? 0}
            tone="verde"
          />
          <KpiCard
            label="Corregidas"
            value={porEstado?.corregida ?? 0}
          />
          <KpiCard
            label="Devueltas"
            value={porEstado?.devuelta ?? 0}
            tone="roja"
          />
          <KpiCard
            label="En proceso"
            value={pendientesTotal}
            sub={`${porEstado?.pendiente ?? 0} pend. · ${porEstado?.esperando_verificacion ?? 0} por verif. · ${porEstado?.discrepancia ?? 0} discrep.`}
            tone="muted"
          />
        </div>
      </section>

      <Divider />

      <section>
        <SectionHeading number="02" title="Distribución por cola" />
        <ColaDistributionBar porCola={porCola} total={total} />
      </section>

      <Divider />

      <section>
        <SectionHeading number="03" title="Tiempo promedio de decisión" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <KpiCard
            label="Promedio"
            value={formatMinutes(tiempoPromedio?.minutos)}
          />
          <KpiCard
            label="Actas decididas"
            value={tiempoPromedio?.count ?? decididas}
            tone="muted"
          />
          <KpiCard
            label="Tasa decisión"
            value={
              total
                ? `${Math.round((decididas / total) * 100)}%`
                : "—"
            }
            sub={`${decididas} de ${total}`}
            tone="muted"
          />
        </div>
      </section>

      <Divider />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <SectionHeading number="04" title="Top distritos por volumen" />
          <TopList
            items={(topDistritos || []).map((d) => ({
              label: `Distrito ${d._id}`,
              count: d.count,
              subCount: d.rojas || undefined,
            }))}
            emptyMessage="Sin distritos identificados aún."
          />
        </div>
        <div>
          <SectionHeading number="05" title="Operadores activos" />
          <TopList
            items={(topOperadores || []).map((o) => ({
              label: o.name || "operador desconocido",
              image: o.image || null,
              count: o.decisiones,
            }))}
            emptyMessage="Sin decisiones registradas aún."
          />
        </div>
      </section>
    </div>
  );
}
