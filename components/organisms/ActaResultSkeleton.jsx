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

function Bar({ className = "" }) {
  return <Shimmer className={`h-3 ${className}`} />;
}

export default function ActaResultSkeleton() {
  return (
    <article className="flex flex-col gap-10" aria-label="Cargando resultado">
      {/* Header */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-b border-stone-300 dark:border-stone-700 pb-6">
        <div className="flex flex-col gap-3">
          <Shimmer className="h-10 w-44" />
          <Bar className="w-72" />
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <Bar className="w-24 h-2" />
          <Shimmer className="h-8 w-20" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <aside className="lg:col-span-5 flex flex-col gap-3">
          <Bar className="w-24 h-2" />
          <Shimmer className="aspect-[3/4] w-full" />
        </aside>

        <div className="lg:col-span-7 flex flex-col gap-10">
          {[0, 1, 2, 3].map((i) => (
            <section key={i} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Bar className="w-6 h-2" />
                <Bar className="w-40 h-4" />
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="flex flex-col gap-2">
                    <Bar className="w-20 h-2" />
                    <Shimmer className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-300 dark:border-stone-700 pt-6 flex justify-end gap-3">
        <Shimmer className="h-11 w-32" />
        <Shimmer className="h-11 w-28" />
        <Shimmer className="h-11 w-28" />
      </div>
    </article>
  );
}
