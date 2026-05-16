import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* CTA cerrado */}
      <section className="border-t border-stone-200/70 dark:border-stone-800/70 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-slate-700 dark:bg-slate-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-slate-700 dark:text-slate-400 font-mono">
              Listo para la noche electoral
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight max-w-2xl">
            Accede al sistema y procesa tu primera acta.
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 h-12 border-2 border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-stone-50 dark:text-stone-900 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Acceder al sistema
            <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200/70 dark:border-stone-800/70 py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-stone-500 dark:text-stone-500">
          <p>
            <span className="font-medium text-foreground">PREP Copilot</span>{" "}
            · Proyecto del Hackathon IEE Chihuahua 2026 · Eje 7 — PREP con IA
          </p>
          <p className="font-mono tabular-nums">© {year}</p>
        </div>
      </footer>
    </>
  );
}
