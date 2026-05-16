import SectionLabel from "@/components/atoms/SectionLabel";
import ComplianceItem from "@/components/molecules/ComplianceItem";

const ITEMS = [
  {
    title: "Principios constitucionales",
    note: "Certeza, legalidad y máxima transparencia en cada operación registrada por el sistema.",
  },
  {
    title: "Doble captura",
    note: "Cumple el lineamiento INE: toda corrección numérica requiere verificación independiente por un segundo operador.",
  },
  {
    title: "Minimización de datos personales",
    note: "El sistema no almacena más información que la estrictamente necesaria para operar y auditar el proceso.",
  },
  {
    title: "Validaciones no vinculantes",
    note: "La máquina propone, el humano decide. Ninguna acción sobre el acta se ejecuta sin confirmación del operador.",
  },
  {
    title: "Explicabilidad obligatoria",
    note: "Las validaciones aritméticas son 100% deterministas. Cada decisión del sistema es trazable a una regla legible.",
  },
  {
    title: "Trazabilidad y auditoría",
    note: "Cada decisión queda registrada con operador, timestamp, payload antes/después y nota cuando aplica.",
  },
];

export default function ComplianceSection() {
  return (
    <section
      id="cumplimiento"
      className="border-t border-stone-200/70 dark:border-stone-800/70 py-24 sm:py-32 bg-stone-50/40 dark:bg-stone-950/40"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionLabel number="04">Cumplimiento normativo</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-3xl leading-tight mb-14 sm:mb-20">
          Diseñado dentro del marco regulatorio del PREP, no alrededor de él.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 border-t border-stone-200/70 dark:border-stone-800/70">
          {ITEMS.map((item) => (
            <ComplianceItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
