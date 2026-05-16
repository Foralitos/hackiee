import ValidationItem from "@/components/atoms/ValidationItem";

const LABELS = {
  suma_votos: "Suma de votos coincide con el total declarado",
  conservacion_boletas:
    "Conservación de boletas (sobrantes + usadas = recibidas)",
  votos_vs_personas:
    "Total de votos coincide con personas que votaron",
  lista_nominal: "Total de votos ≤ lista nominal de la casilla",
};

function detailFor(check) {
  if (check.ok === false) {
    switch (check.regla) {
      case "suma_votos":
        return `Calculado ${check.sumaCalculada} · Declarado ${check.totalDeclarado} · Diferencia ${check.diferencia}`;
      case "conservacion_boletas":
        return `Recibidas ${check.recibidas} · Sobrantes + usadas = ${
          (check.sobrantes ?? 0) + (check.usadas ?? 0)
        } · Diferencia ${check.diferencia}`;
      case "votos_vs_personas":
        return `Total votos ${check.totalVotos} · Personas + reps ${check.personasYReps} · Diferencia ${check.diferencia} (tolerancia ±${check.tolerancia})`;
      case "lista_nominal":
        return `Total ${check.totalVotos} excede la lista nominal (${check.listaNominal}) por ${check.excedente}`;
      default:
        return null;
    }
  }
  if (check.ok === null) return check.mensaje;
  return null;
}

export default function ValidacionesList({ checks = [] }) {
  if (!checks.length) {
    return (
      <p className="text-sm text-stone-500 italic">
        Sin validaciones ejecutadas.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-stone-200/70 dark:divide-stone-800/70 -my-2">
      {checks.map((check, i) => {
        const state =
          check.ok === true ? "ok" : check.ok === false ? "fail" : "unknown";
        return (
          <ValidationItem
            key={`${check.regla}-${i}`}
            state={state}
            label={LABELS[check.regla] || check.regla}
            detail={detailFor(check)}
          />
        );
      })}
    </div>
  );
}
