"use client";

import { useState } from "react";
import { CheckCircle2, Pencil, RotateCcw, AlertCircle } from "lucide-react";
import DecisionForm from "@/components/molecules/DecisionForm";

const VARIANTS = {
  primary:
    "bg-foreground text-background hover:opacity-90 border-foreground",
  default:
    "bg-transparent text-foreground border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900",
  danger:
    "bg-transparent text-red-700 dark:text-red-400 border-red-700/30 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-950/30",
};

function ActionBtn({ icon: Icon, label, variant = "default", onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 h-11 border text-sm font-medium tracking-wide transition-colors disabled:opacity-50 ${VARIANTS[variant]}`}
    >
      <Icon size={16} strokeWidth={2.25} />
      {label}
    </button>
  );
}

const FINAL_STATES = new Set(["validada", "corregida", "devuelta"]);

export default function ActaActions({ actaId, estado, onDecided }) {
  const [activeAction, setActiveAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (FINAL_STATES.has(estado)) return null;
  if (!actaId) return null;

  async function postDecision(tipo, nota) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/actas/${actaId}/decisiones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, nota }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setActiveAction(null);
      onDecided?.(data.acta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
        <ActionBtn
          icon={RotateCcw}
          label="Devolver a casilla"
          variant="danger"
          onClick={() => setActiveAction("devolver")}
          disabled={loading || activeAction !== null}
        />
        <ActionBtn
          icon={Pencil}
          label="Corregir"
          onClick={() => setActiveAction("corregir")}
          disabled={loading || activeAction !== null}
        />
        <ActionBtn
          icon={CheckCircle2}
          label="Validar"
          variant="primary"
          onClick={() => postDecision("validar")}
          disabled={loading || activeAction !== null}
        />
      </div>

      {activeAction && (
        <DecisionForm
          tipo={activeAction}
          loading={loading}
          onCancel={() => {
            setActiveAction(null);
            setError(null);
          }}
          onSubmit={(nota) => postDecision(activeAction, nota)}
        />
      )}

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
    </div>
  );
}
