"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import CasillaForm from "@/components/molecules/CasillaForm";

function CasillaRow({ casilla }) {
  return (
    <div className="flex items-center justify-between gap-3 p-4 border border-stone-200/70 dark:border-stone-800/70">
      <div className="flex items-center gap-3 min-w-0">
        <MapPin
          size={16}
          strokeWidth={2}
          className="text-stone-400 shrink-0"
        />
        <div className="min-w-0">
          <div className="text-sm font-medium font-mono">
            {casilla.identificador}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            {[
              casilla.entidad,
              casilla.distrito && `Distrito ${casilla.distrito}`,
              casilla.seccion && `Sección ${casilla.seccion}`,
              casilla.tipoCasilla,
            ]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
      </div>
      {typeof casilla.listaNominal === "number" && (
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
            Lista nominal
          </div>
          <div className="font-mono tabular-nums text-lg">
            {casilla.listaNominal}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CasillasManager() {
  const [casillas, setCasillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/casillas");
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
        setCasillas(data.casillas || []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleCreated(nueva) {
    setCasillas((cs) => [nueva, ...cs]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
      <div className="lg:col-span-5">
        <CasillaForm onCreated={handleCreated} />
      </div>

      <div className="lg:col-span-7 flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500">
          {loading ? "Cargando…" : `${casillas.length} casillas`}
        </div>

        {error && (
          <div className="text-sm text-red-700 dark:text-red-400 font-mono">
            {error}
          </div>
        )}

        {!loading && !error && casillas.length === 0 && (
          <div className="text-sm text-stone-500 italic py-8">
            Sin casillas. Crea la primera con el formulario de la izquierda.
          </div>
        )}

        <div className="flex flex-col gap-2">
          {casillas.map((c) => (
            <CasillaRow key={c.id} casilla={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
