"use client";

function NumInput({ value, onChange, label }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
        {label}
      </span>
      <input
        type="number"
        min="0"
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : Number(v));
        }}
        className="text-2xl font-mono tabular-nums tracking-tight bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-foreground py-1"
      />
    </div>
  );
}

export default function BoletasGridEditable({ boletas = {}, onChange }) {
  function set(field, val) {
    onChange({ ...boletas, [field]: val });
  }
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      <NumInput label="Recibidas" value={boletas.recibidas} onChange={(v) => set("recibidas", v)} />
      <NumInput label="Sobrantes" value={boletas.sobrantes} onChange={(v) => set("sobrantes", v)} />
      <NumInput label="Personas que votaron" value={boletas.personasQueVotaron} onChange={(v) => set("personasQueVotaron", v)} />
      <NumInput label="Reps. de partidos" value={boletas.repsPartidos} onChange={(v) => set("repsPartidos", v)} />
    </div>
  );
}
