export default function SectionLabel({ number, children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-8">
      <span className="font-mono tabular-nums text-[11px] text-slate-700 dark:text-slate-400">
        {number}
      </span>
      <span className="w-6 h-px bg-slate-700/60 dark:bg-slate-400/60" />
      <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-slate-700 dark:text-slate-400">
        {children}
      </span>
    </div>
  );
}
