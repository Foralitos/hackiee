export default function ProcessStep({ number, icon: Icon, title, description }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-stone-200/70 dark:border-stone-800/70">
        <span className="font-mono tabular-nums text-[11px] text-slate-700 dark:text-slate-400">
          {number}
        </span>
        {Icon && (
          <Icon size={16} strokeWidth={2} className="text-stone-400 dark:text-stone-500 ml-auto" />
        )}
      </div>
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
