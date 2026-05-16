function Shimmer({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-stone-200/60 dark:bg-stone-800/60 ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        style={{ animation: "shimmer 1.6s infinite" }}
      />
    </div>
  );
}

export default function ActaListSkeleton({ count = 4 }) {
  return (
    <div className="flex flex-col gap-2" aria-label="Cargando bandeja">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-stone-200/70 dark:border-stone-800/70 p-4 flex items-center gap-3"
        >
          <Shimmer className="h-7 w-28 shrink-0" />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <Shimmer className="h-3 w-2/3" />
            <Shimmer className="h-2 w-1/3" />
          </div>
          <Shimmer className="h-5 w-20 shrink-0" />
        </div>
      ))}
    </div>
  );
}
