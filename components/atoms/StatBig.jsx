export default function StatBig({ value, label, description }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono tabular-nums text-5xl sm:text-6xl font-medium tracking-tight text-foreground leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-slate-700 dark:text-slate-400 pt-2">
        {label}
      </span>
      {description && (
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
          {description}
        </p>
      )}
    </div>
  );
}
