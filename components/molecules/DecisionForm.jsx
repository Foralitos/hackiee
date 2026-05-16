"use client";

import { useState } from "react";

const COPY = {
  corregir: {
    title: "Marcar para corrección",
    helper:
      "Nota opcional para el registro (qué campo identifica el operador como dudoso).",
    confirmLabel: "Confirmar corrección",
    required: false,
  },
  devolver: {
    title: "Devolver a casilla",
    helper:
      "La nota es obligatoria. Explica brevemente por qué se devuelve esta acta.",
    confirmLabel: "Confirmar devolución",
    required: true,
  },
};

export default function DecisionForm({ tipo, onSubmit, onCancel, loading }) {
  const cfg = COPY[tipo] || COPY.corregir;
  const [nota, setNota] = useState("");

  const trimmed = nota.trim();
  const valid = cfg.required ? trimmed.length >= 3 : true;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid || loading) return;
    onSubmit(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-3 p-4 border border-stone-300 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/40"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
          {cfg.title}
        </span>
        <span className="text-xs text-stone-600 dark:text-stone-400">
          {cfg.helper}
        </span>
      </div>

      <textarea
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        rows={3}
        placeholder={cfg.required ? "Motivo (obligatorio)" : "Nota (opcional)"}
        className="w-full text-sm border border-stone-300 dark:border-stone-700 px-3 py-2 bg-background focus:outline-none focus:border-foreground resize-y"
        autoFocus
        disabled={loading}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="inline-flex items-center justify-center px-4 h-9 border border-stone-300 dark:border-stone-700 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!valid || loading}
          className="inline-flex items-center justify-center px-4 h-9 border border-foreground bg-foreground text-background text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Guardando…" : cfg.confirmLabel}
        </button>
      </div>
    </form>
  );
}
