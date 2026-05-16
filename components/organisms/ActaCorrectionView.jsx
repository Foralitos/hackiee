"use client";

import { useState } from "react";
import { Save, X, AlertCircle } from "lucide-react";
import ActaIdentificacion from "@/components/molecules/ActaIdentificacion";
import BoletasGridEditable from "@/components/molecules/BoletasGridEditable";
import VotosTableEditable from "@/components/molecules/VotosTableEditable";
import TotalesPanelEditable from "@/components/molecules/TotalesPanelEditable";

function SectionHeading({ number, title }) {
  return (
    <header className="flex items-baseline gap-3 mb-5">
      <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-400 dark:text-stone-600">
        {number}
      </span>
      <h2 className="text-base font-semibold text-foreground tracking-tight">
        {title}
      </h2>
    </header>
  );
}

export default function ActaCorrectionView({ acta, onCancel, onSaved }) {
  // Editable local state, seeded from acta.extraccion.
  const [extraccion, setExtraccion] = useState(() => ({
    identificacion: acta.extraccion?.identificacion || {},
    boletas: acta.extraccion?.boletas || {},
    votosPorPartido: (acta.extraccion?.votosPorPartido || []).map((p) => ({
      ...p,
    })),
    noRegistrados: acta.extraccion?.noRegistrados,
    nulos: acta.extraccion?.nulos,
    totalVotos: acta.extraccion?.totalVotos,
    confianzaGeneral: 1,
  }));
  const [nota, setNota] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setBoletas(boletas) {
    setExtraccion((e) => ({ ...e, boletas }));
  }
  function setVotos(votosPorPartido) {
    setExtraccion((e) => ({ ...e, votosPorPartido }));
  }
  function setTotales(updated) {
    setExtraccion(updated);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/actas/${acta.id || acta._id}/correccion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extraccion, nota }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      onSaved?.(data.acta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-300 dark:border-stone-700 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-medium text-amber-700 dark:text-amber-400">
            Modo corrección
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">
            Editar números del acta
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-lg">
            Corrige los campos que el OCR leyó mal. Al guardar, el acta pasa a
            verificación por un segundo operador antes de validarse.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-10">
        <section>
          <SectionHeading number="01" title="Identificación" />
          <ActaIdentificacion data={extraccion.identificacion} />
        </section>

        <hr className="border-t border-stone-200/70 dark:border-stone-800/70" />

        <section>
          <SectionHeading number="02" title="Boletas" />
          <BoletasGridEditable boletas={extraccion.boletas} onChange={setBoletas} />
        </section>

        <hr className="border-t border-stone-200/70 dark:border-stone-800/70" />

        <section>
          <SectionHeading number="03" title="Votos por partido" />
          <VotosTableEditable
            votos={extraccion.votosPorPartido}
            onChange={setVotos}
          />
        </section>

        <hr className="border-t border-stone-200/70 dark:border-stone-800/70" />

        <section>
          <SectionHeading number="04" title="Totales" />
          <TotalesPanelEditable
            extraccion={extraccion}
            onChange={setTotales}
          />
        </section>

        <hr className="border-t border-stone-200/70 dark:border-stone-800/70" />

        <section className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
            Nota de corrección (opcional)
          </label>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            rows={2}
            placeholder="ej. corregí MORENA y total porque la suma no cuadraba"
            className="w-full text-sm border border-stone-300 dark:border-stone-700 px-3 py-2 bg-transparent focus:outline-none focus:border-foreground resize-y"
            disabled={loading}
          />
        </section>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-3 border-l-2 border-red-700 dark:border-red-400 bg-red-50/60 dark:bg-red-950/20 text-sm">
          <AlertCircle
            size={16}
            strokeWidth={2.25}
            className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
          />
          <span className="text-stone-700 dark:text-stone-300 font-mono text-xs">
            {error}
          </span>
        </div>
      )}

      <div className="border-t border-stone-300 dark:border-stone-700 pt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 h-11 border border-stone-300 dark:border-stone-700 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors disabled:opacity-50"
        >
          <X size={16} strokeWidth={2.25} />
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 h-11 border border-foreground bg-foreground text-background text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save size={16} strokeWidth={2.25} />
          {loading ? "Guardando…" : "Guardar corrección"}
        </button>
      </div>
    </article>
  );
}
