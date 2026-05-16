"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const TIPOS = ["basica", "contigua", "extraordinaria", "especial"];

const EMPTY = {
  entidad: "Chihuahua",
  distrito: "",
  seccion: "",
  tipoCasilla: "basica",
  identificador: "",
  listaNominal: "",
};

export default function CasillaForm({ onCreated }) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function set(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.seccion || !data.identificador) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...data,
        listaNominal: data.listaNominal ? Number(data.listaNominal) : undefined,
      };
      const res = await fetch("/api/casillas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Error ${res.status}`);
      setData(EMPTY);
      onCreated?.(json.casilla);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-5 border border-stone-300 dark:border-stone-700"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500">
          Nueva casilla
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Identificador" required>
          <input
            type="text"
            value={data.identificador}
            onChange={(e) => set("identificador", e.target.value)}
            placeholder="ej. 1423-B"
            required
            className={inputCls}
          />
        </Field>

        <Field label="Sección" required>
          <input
            type="text"
            value={data.seccion}
            onChange={(e) => set("seccion", e.target.value)}
            placeholder="ej. 1423"
            required
            className={inputCls}
          />
        </Field>

        <Field label="Distrito">
          <input
            type="text"
            value={data.distrito}
            onChange={(e) => set("distrito", e.target.value)}
            placeholder="ej. 08"
            className={inputCls}
          />
        </Field>

        <Field label="Entidad">
          <input
            type="text"
            value={data.entidad}
            onChange={(e) => set("entidad", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Tipo">
          <select
            value={data.tipoCasilla}
            onChange={(e) => set("tipoCasilla", e.target.value)}
            className={inputCls}
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Lista nominal">
          <input
            type="number"
            min="0"
            value={data.listaNominal}
            onChange={(e) => set("listaNominal", e.target.value)}
            placeholder="ej. 750"
            className={inputCls}
          />
        </Field>
      </div>

      {error && (
        <div className="text-xs text-red-700 dark:text-red-400 font-mono">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !data.seccion || !data.identificador}
          className="inline-flex items-center gap-2 px-5 h-11 border border-foreground bg-foreground text-background text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={2.25} />
          {loading ? "Guardando…" : "Crear casilla"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full text-sm border border-stone-300 dark:border-stone-700 px-3 py-2 bg-transparent font-mono focus:outline-none focus:border-foreground";

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
        {label}
        {required && <span className="text-red-700 dark:text-red-400 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
