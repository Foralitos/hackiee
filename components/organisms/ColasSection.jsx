import SectionLabel from "@/components/atoms/SectionLabel";
import ColaExplainer from "@/components/molecules/ColaExplainer";

const COLAS = [
  {
    cola: "verde",
    titulo: "Lectura clara y matemática consistente",
    descripcion:
      "Todos los campos numéricos se leyeron con alta confianza y las cuatro validaciones aritméticas se cumplen.",
    accion: "El operador valida con un click",
  },
  {
    cola: "amarilla",
    titulo: "Confianza baja en uno o más campos",
    descripcion:
      "El OCR detectó incertidumbre en algún número manuscrito, pero la matemática del acta cuadra.",
    accion: "El operador revisa los campos marcados",
  },
  {
    cola: "roja",
    titulo: "Inconsistencia aritmética detectada",
    descripcion:
      "Al menos una regla falla. La suma de votos, el balance de boletas o el cruce con la lista nominal no cierra.",
    accion: "El operador corrige y dispara doble captura",
  },
];

export default function ColasSection() {
  return (
    <section
      id="colas"
      className="border-t border-stone-200/70 dark:border-stone-800/70 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionLabel number="03">Sistema de colas</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-3xl leading-tight mb-14 sm:mb-20">
          Cada acta se asigna a una de tres colas, priorizando el tiempo del
          operador.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-16">
          {COLAS.map((c) => (
            <ColaExplainer key={c.cola} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
