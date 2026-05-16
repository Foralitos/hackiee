"use client";

import FilterChip from "@/components/atoms/FilterChip";

const ESTADOS = [
  { value: null, label: "Todas" },
  { value: "validada", label: "Validadas" },
  { value: "corregida", label: "Corregidas" },
  { value: "devuelta", label: "Devueltas" },
];

const COLAS = [
  { value: null, label: "Todas" },
  { value: "verde", label: "Verde" },
  { value: "amarilla", label: "Amarilla" },
  { value: "roja", label: "Roja" },
];

function FilterRow({ title, options, value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500 sm:w-16 shrink-0">
        {title}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterChip
            key={opt.value ?? "all"}
            active={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

export default function ActaFilters({
  estado = null,
  cola = null,
  onEstadoChange,
  onColaChange,
}) {
  return (
    <div className="flex flex-col gap-3 pb-5 border-b border-stone-200/70 dark:border-stone-800/70">
      <FilterRow
        title="Estado"
        options={ESTADOS}
        value={estado}
        onChange={onEstadoChange}
      />
      <FilterRow
        title="Cola"
        options={COLAS}
        value={cola}
        onChange={onColaChange}
      />
    </div>
  );
}
