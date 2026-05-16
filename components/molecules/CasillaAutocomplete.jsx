"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function CasillaAutocomplete({ value, onChange }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // debounced fetch — JSX hides results when !q, so we don't need to clear state synchronously.
  useEffect(() => {
    if (!q || selected) return;
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/casillas?q=${encodeURIComponent(q)}&limit=10`
        );
        const data = await res.json();
        if (res.ok) setResults(data.casillas || []);
      } catch {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q, selected]);

  function pick(c) {
    setSelected(c);
    setQ(c.identificador);
    setOpen(false);
    onChange?.(c.id);
  }

  function clear() {
    setSelected(null);
    setQ("");
    onChange?.(null);
  }

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search
          size={14}
          strokeWidth={2.25}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSelected(null);
            setOpen(true);
            if (!e.target.value) onChange?.(null);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar casilla por identificador, sección o distrito"
          className="w-full text-sm border border-stone-300 dark:border-stone-700 pl-9 pr-9 py-2 bg-transparent font-mono focus:outline-none focus:border-foreground"
        />
        {(selected || q) && (
          <button
            type="button"
            onClick={clear}
            aria-label="Limpiar"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-foreground p-1"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        )}
      </div>

      {open && q && results.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 border border-stone-300 dark:border-stone-700 bg-background max-h-72 overflow-auto shadow-sm">
          {results.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => pick(c)}
                className="w-full text-left px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-900 flex items-baseline justify-between gap-3"
              >
                <span className="text-sm font-mono">{c.identificador}</span>
                <span className="text-xs text-stone-500 truncate">
                  {[c.distrito && `D ${c.distrito}`, c.seccion && `Sec ${c.seccion}`]
                    .filter(Boolean)
                    .join(" · ")}
                  {typeof c.listaNominal === "number" && (
                    <> · LN {c.listaNominal}</>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && q && !selected && results.length === 0 && (
        <div className="absolute z-20 left-0 right-0 mt-1 border border-stone-300 dark:border-stone-700 bg-background p-3 text-xs text-stone-500 italic">
          Sin resultados. Crea la casilla en /dashboard/casillas.
        </div>
      )}
    </div>
  );
}
