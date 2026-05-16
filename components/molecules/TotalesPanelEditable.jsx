"use client";

function NumField({ label, value, onChange, emphasis = false }) {
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
        className={`bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-foreground py-1 font-mono tabular-nums tracking-tight ${
          emphasis ? "text-4xl font-semibold" : "text-2xl font-normal"
        }`}
      />
    </div>
  );
}

function numOf(field) {
  if (field == null) return null;
  if (typeof field === "object" && "votos" in field) return field.votos;
  return field;
}

export default function TotalesPanelEditable({ extraccion = {}, onChange }) {
  function set(field, value) {
    onChange({ ...extraccion, [field]: { votos: value, confidence: 1 } });
  }

  return (
    <div className="grid grid-cols-3 gap-x-8">
      <NumField
        label="No registrados"
        value={numOf(extraccion.noRegistrados)}
        onChange={(v) => set("noRegistrados", v)}
      />
      <NumField
        label="Nulos"
        value={numOf(extraccion.nulos)}
        onChange={(v) => set("nulos", v)}
      />
      <NumField
        label="Total"
        value={numOf(extraccion.totalVotos)}
        onChange={(v) => set("totalVotos", v)}
        emphasis
      />
    </div>
  );
}
