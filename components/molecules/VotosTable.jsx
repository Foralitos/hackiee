import ConfidenceIndicator from "@/components/atoms/ConfidenceIndicator";

export default function VotosTable({ votos = [] }) {
  if (!votos.length) {
    return (
      <p className="text-sm text-stone-500 italic">Sin votos registrados.</p>
    );
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
            <th className="text-right py-2.5 pl-3 pr-1 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 w-14">
              Conf.
            </th>
          </tr>
        </thead>
        <tbody>
          {votos.map((row, i) => {
            const conf = row.confidence ?? 0;
            const low = conf < 0.7;
            return (
              <tr
                key={`${row.partido}-${i}`}
                title={
                  low
                    ? "Confianza baja — revisa este campo manualmente"
                    : undefined
                }
                className={`border-b border-stone-200/60 dark:border-stone-800/60 ${
                  low ? "bg-amber-50/70 dark:bg-amber-950/15" : ""
                }`}
              >
                <td className="py-3 px-1 text-foreground font-medium">
                  {row.partido}
                </td>
                <td className="py-3 px-1 text-right font-mono tabular-nums text-lg">
                  {row.votos ?? "—"}
                </td>
                <td className="py-3 pl-3 pr-1 text-right">
                  <span className="inline-flex justify-end w-full">
                    <ConfidenceIndicator value={conf} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
