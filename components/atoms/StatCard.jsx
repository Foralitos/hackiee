const TONES = {
  default: "text-foreground",
  muted: "text-stone-500 dark:text-stone-500",
  danger: "text-red-700 dark:text-red-400",
};

export default function StatCard({
  label,
  value,
  suffix,
  hint,
  tone = "default",
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-stone-500">
        {label}
      </span>
      <span
        className={`font-mono tabular-nums text-3xl font-medium tracking-tight ${
          TONES[tone] || TONES.default
        }`}
      >
        {value ?? "—"}
        {suffix && (
          <span className="text-base ml-1 text-stone-500 font-normal">
            {suffix}
          </span>
        )}
      </span>
      {hint && (
        <span className="text-xs text-stone-500 dark:text-stone-500">
          {hint}
        </span>
      )}
    </div>
  );
}
