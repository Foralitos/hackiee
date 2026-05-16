const COLAS = [
  { key: "verde", label: "Verde", bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  { key: "amarilla", label: "Amarilla", bg: "bg-amber-500 dark:bg-amber-400", text: "text-amber-700 dark:text-amber-400" },
  { key: "roja", label: "Roja", bg: "bg-red-600 dark:bg-red-500", text: "text-red-700 dark:text-red-400" },
];

export default function ColaDistributionBar({ porCola = {}, total = 0 }) {
  const sum =
    total || (porCola.verde || 0) + (porCola.amarilla || 0) + (porCola.roja || 0);

  if (sum === 0) {
    return (
      <p className="text-sm text-stone-500 italic">
        Sin actas procesadas aún.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-3 overflow-hidden border border-stone-200/70 dark:border-stone-800/70">
        {COLAS.map((c) => {
          const n = porCola[c.key] || 0;
          const pct = (n / sum) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={c.key}
              className={c.bg}
              style={{ width: `${pct}%` }}
              title={`${c.label}: ${n} (${pct.toFixed(1)}%)`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {COLAS.map((c) => {
          const n = porCola[c.key] || 0;
          const pct = sum > 0 ? (n / sum) * 100 : 0;
          return (
            <div key={c.key} className="flex flex-col gap-1">
              <span className={`text-[10px] uppercase tracking-[0.22em] font-medium ${c.text}`}>
                {c.label}
              </span>
              <span className="font-mono tabular-nums text-lg">
                {n}
                <span className="text-xs text-stone-500 ml-1.5 font-normal">
                  {pct.toFixed(0)}%
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
