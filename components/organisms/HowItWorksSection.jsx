import { Vote, ScanLine, Calculator, ShieldCheck } from "lucide-react";
import SectionLabel from "@/components/atoms/SectionLabel";
import ProcessStep from "@/components/molecules/ProcessStep";

const STEPS = [
  {
    number: "01",
    icon: Vote,
    title: "Captura",
    description:
      "El operador sube la fotografía del acta desde el consejo distrital, asociándola a la casilla correspondiente.",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "OCR asistido",
    description:
      "Un modelo multimodal extrae los campos numéricos y reporta un score de confianza por cada celda manuscrita.",
  },
  {
    number: "03",
    icon: Calculator,
    title: "Validación determinista",
    description:
      "Cuatro reglas aritméticas evalúan la consistencia interna del acta sin intervención de IA, garantizando explicabilidad.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Decisión humana",
    description:
      "El operador valida, corrige o devuelve. Toda corrección numérica pasa por doble captura ciega antes de validarse.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="funcionamiento"
      className="border-t border-stone-200/70 dark:border-stone-800/70 py-24 sm:py-32 bg-stone-50/40 dark:bg-stone-950/40"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionLabel number="02">Cómo funciona</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-3xl leading-tight mb-14 sm:mb-20">
          Cuatro etapas. Una decisión humana al final de cada una.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-x-8">
          {STEPS.map((s) => (
            <ProcessStep key={s.number} {...s} />
          ))}
        </div>

        <div className="mt-20 sm:mt-24 pt-10 border-t border-stone-200/70 dark:border-stone-800/70 max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-slate-700/60 dark:bg-slate-400/60" />
            <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-slate-700 dark:text-slate-400">
              Tres prototipos del track integrados
            </span>
          </div>
          <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            OCR Asistido con Priorización Humana, Detector de Inconsistencias
            Matemáticas y Monitor Operativo del PREP conviven en una sola
            herramienta, evitando que el operador alterne entre sistemas
            durante la noche electoral.
          </p>
        </div>
      </div>
    </section>
  );
}
