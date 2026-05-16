"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
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

// Build an empty extraction skeleton from a known structure (partido names
// only, all numbers blank). The operator must re-enter every number.
function buildBlind(template) {
  return {
    identificacion: template.identificacion || {},
    boletas: {
      recibidas: null,
      sobrantes: null,
      personasQueVotaron: null,
      repsPartidos: null,
    },
    votosPorPartido: (template.votosPorPartido || []).map((p) => ({
      partido: p.partido,
      votos: null,
      confidence: 1,
    })),
    noRegistrados: { votos: null, confidence: 1 },
    nulos: { votos: null, confidence: 1 },
    totalVotos: { votos: null, confidence: 1 },
    confianzaGeneral: 1,
  };
}

export default function CapturaSecundariaForm({ acta }) {
  const router = useRouter();
  const [extraccion, setExtraccion] = useState(() => buildBlind(acta.extraccion || {}));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { matched, diffs }

  function setBoletas(boletas) {
    setExtraccion((e) => ({ ...e, boletas }));
  }
  function setVotos(votosPorPartido) {
    setExtraccion((e) => ({ ...e, votosPorPartido }));
  }
  function setTotales(updated) {
    setExtraccion(updated);
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/actas/${acta.id || acta._id}/verificacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extraccion }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setResult({ matched: data.matched, diffs: data.diffs || [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="flex flex-col gap-6">
        <div
          className={`flex items-start gap-4 p-5 border ${
            result.matched
              ? "border-emerald-700/30 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20"
              : "border-red-700/30 dark:border-red-500/30 bg-red-50/60 dark:bg-red-950/20"
          }`}
        >
          {result.matched ? (
            <CheckCircle2
              size={22}
              className="text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0"
            />
          ) : (
            <XCircle
              size={22}
              className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
            />
          )}
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <div
              className={`text-sm font-semibold ${
                result.matched
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {result.matched
                ? "Verificación coincide. Acta validada."
                : `Discrepancia detectada en ${result.diffs.length} campo(s)`}
            </div>
            {!result.matched && (
              <ul className="text-xs font-mono tabular-nums text-stone-700 dark:text-stone-300 space-y-0.5">
                {result.diffs.map((d, i) => (
                  <li key={i}>
                    <span className="text-stone-500">{d.campo}:</span>{" "}
                    primera <strong>{d.primera ?? "—"}</strong> · segunda{" "}
                    <strong>{d.segunda ?? "—"}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/dashboard/actas")}
            className="inline-flex items-center justify-center gap-2 px-5 h-11 border border-foreground bg-foreground text-background text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Volver a la bandeja
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 border-b border-stone-300 dark:border-stone-700 pb-6">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-medium text-amber-700 dark:text-amber-400">
          <ShieldCheck size={14} strokeWidth={2.25} />
          Doble captura — verificación ciega
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Recaptura los números del acta
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
          Mirá la imagen del acta y recaptura todos los números desde cero. Si
          coinciden con la primera captura, el acta queda validada
          automáticamente. Si difieren, se marca como discrepancia para el
          supervisor.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <aside className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-20 lg:self-start order-2 lg:order-1">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-stone-500">
            Imagen del acta
          </span>
          {acta.imagen?.secureUrl ? (
            <a
              href={acta.imagen.secureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={acta.imagen.secureUrl}
                alt="Acta"
                className="w-full h-auto block"
                referrerPolicy="no-referrer"
              />
            </a>
          ) : (
            <div className="aspect-[3/4] bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-500 text-sm italic">
              Sin imagen
            </div>
          )}
        </aside>

        <div className="lg:col-span-7 flex flex-col gap-10 order-1 lg:order-2">
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
        </div>
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

      <div className="border-t border-stone-300 dark:border-stone-700 pt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 h-11 border border-foreground bg-foreground text-background text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <ShieldCheck size={16} strokeWidth={2.25} />
          {loading ? "Verificando…" : "Enviar verificación"}
        </button>
      </div>
    </article>
  );
}
