import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV = [
  { href: "#problema", label: "Problema" },
  { href: "#funcionamiento", label: "Funcionamiento" },
  { href: "#colas", label: "Colas" },
  { href: "#cumplimiento", label: "Cumplimiento" },
];

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-stone-200/70 dark:border-stone-800/70">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="hidden sm:flex items-center gap-2 pt-3 pb-1.5 text-[10px] uppercase tracking-[0.25em] font-medium text-slate-700 dark:text-slate-400 font-mono">
          <span className="inline-block w-4 h-px bg-slate-700/60 dark:bg-slate-400/60" />
          Hackathon IEE 2026 · Eje 7 — PREP con IA
        </div>
        <div className="h-14 sm:h-12 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight">
              PREP Copilot
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-stone-500 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 sm:px-5 h-10 border-2 border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-stone-50 dark:text-stone-900 text-xs sm:text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Acceder al sistema
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </header>
  );
}
