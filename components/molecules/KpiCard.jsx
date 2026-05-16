const TONES = {
  default: "text-foreground",
  verde: "text-emerald-700 dark:text-emerald-400",
  amarilla: "text-amber-700 dark:text-amber-400",
  roja: "text-red-700 dark:text-red-400",
  muted: "text-stone-500 dark:text-stone-500",
};

export default function KpiCard({ label, value, sub, tone = "default" }) {
  return (
    <div className="flex flex-col gap-2 p-5 border border-stone-200/70 dark:border-stone-800/70">
      <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500">
        {label}
      </span>
      <span
        className={`font-mono tabular-nums text-4xl font-semibold tracking-tight ${
          TONES[tone] || TONES.default
        }`}
      >
        {value ?? "—"}
      </span>
      {sub && (
        <span className="text-xs text-stone-500 dark:text-stone-500">{sub}</span>
      )}
    </div>
  );
}
