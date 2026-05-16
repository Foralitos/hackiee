import Link from "next/link";
import { ArrowRight, ScanLine } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32">
      <div
        className="flex flex-col gap-10 max-w-4xl"
        style={{ animation: "fade-in-up 500ms ease-out both" }}
      >
        <div className="inline-flex items-center gap-3 self-start">
          <span className="w-8 h-px bg-slate-700 dark:bg-slate-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-slate-700 dark:text-slate-400 font-mono">
            Programa de Resultados Electorales Preliminares
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
          Asistencia computacional con{" "}
          <em className="not-italic font-normal text-slate-700 dark:text-slate-300">
            control humano
          </em>{" "}
          para el PREP.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
          Reduce errores de captura en la noche electoral combinando OCR
          asistido, validación matemática determinista y monitoreo operativo en
          tiempo real. El operador del IEE conserva la decisión final sobre
          cada acta.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 border-2 border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-stone-50 dark:text-stone-900 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Acceder al sistema
            <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
          <a
            href="#funcionamiento"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 border-2 border-stone-300 dark:border-stone-700 text-foreground text-sm font-medium tracking-wide hover:border-foreground dark:hover:border-foreground transition-colors"
          >
            <ScanLine size={16} strokeWidth={2.25} />
            Conoce el funcionamiento
          </a>
        </div>
      </div>
    </section>
  );
}
