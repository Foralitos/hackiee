"use client";

export default function VotosTableEditable({ votos = [], onChange }) {
  if (!votos.length) {
    return (
      <p className="text-sm text-stone-500 italic">Sin votos registrados.</p>
    );
  }

  function setVoto(i, raw) {
    const next = votos.map((row, idx) =>
      idx === i
        ? { ...row, votos: raw === "" ? null : Number(raw), confidence: 1 }
        : row
    );
    onChange(next);
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-300 dark:border-stone-700">
            <th className="text-left py-2.5 px-1 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
              Partido / coalición
            </th>
            <th className="text-right py-2.5 px-1 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
              Votos
            </th>
          </tr>
        </thead>
        <tbody>
          {votos.map((row, i) => (
            <tr
              key={`${row.partido}-${i}`}
              className="border-b border-stone-200/60 dark:border-stone-800/60"
            >
              <td className="py-3 px-1 text-foreground font-medium">{row.partido}</td>
              <td className="py-3 px-1 text-right">
                <input
                  type="number"
                  min="0"
                  value={row.votos ?? ""}
                  onChange={(e) => setVoto(i, e.target.value)}
                  className="w-24 text-right font-mono tabular-nums text-lg bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-foreground py-0.5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
