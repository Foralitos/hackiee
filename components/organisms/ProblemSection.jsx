import SectionLabel from "@/components/atoms/SectionLabel";
import StatBig from "@/components/atoms/StatBig";

const STATS = [
  {
    value: "10–20%",
    label: "Inconsistencia interna",
    description:
      "De las actas de escrutinio y cómputo presentan al menos un error aritmético detectable, según evaluaciones documentadas del proceso electoral.",
  },
  {
    value: "< 4 hrs",
    label: "Ventana crítica",
    description:
      "Los errores capturados en la noche electoral se propagan al portal público antes de poder corregirse en el cómputo oficial.",
  },
  {
    value: "∞",
    label: "Tensión operativa",
    description:
      "Acelerar el procesamiento sin sacrificar el control humano que la ley exige genera cuellos de botella sistemáticos.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="border-t border-stone-200/70 dark:border-stone-800/70 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionLabel number="01">El problema</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-3xl leading-tight mb-14 sm:mb-20">
          La captura del PREP es la cadena más vulnerable del proceso
          electoral.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-x-10">
          {STATS.map((s) => (
            <StatBig key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
