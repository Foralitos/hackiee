"use client";

export default function FilterChip({
  active = false,
  onClick,
  children,
  count,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 px-3 h-8 border text-xs font-medium tracking-wide transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700 hover:text-foreground hover:border-stone-400 dark:hover:border-stone-600"
      }`}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={`font-mono tabular-nums text-[10px] ${
            active ? "opacity-80" : "text-stone-400 dark:text-stone-500"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
