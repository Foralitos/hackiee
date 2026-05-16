import { AlertTriangle } from "lucide-react";
import ConfidenceIndicator from "@/components/atoms/ConfidenceIndicator";

function num(field) {
  if (field == null) return null;
  if (typeof field === "object" && "votos" in field) return field.votos;
  return field;
}

function conf(field) {
  if (field && typeof field === "object" && "confidence" in field) {
    return field.confidence;
  }
  return null;
}

function Mini({ label, value, confidence, emphasis = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
          {label}
        </span>
        {confidence != null && (
          <ConfidenceIndicator value={confidence} size={6} />
        )}
      </div>
      <span
        className={`font-mono tabular-nums tracking-tight text-foreground ${
          emphasis ? "text-4xl font-semibold" : "text-2xl font-normal"
        }`}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function TotalesPanel({ extraccion = {}, sumaCheck = null }) {
  const noReg = num(extraccion.noRegistrados);
  const nulos = num(extraccion.nulos);
  const total = num(extraccion.totalVotos);

  const noRegConf = conf(extraccion.noRegistrados);
  const nulosConf = conf(extraccion.nulos);
  const totalConf = conf(extraccion.totalVotos);

  const sumaFalla = sumaCheck && sumaCheck.ok === false;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-x-8">
        <Mini label="No registrados" value={noReg} confidence={noRegConf} />
        <Mini label="Nulos" value={nulos} confidence={nulosConf} />
        <Mini label="Total" value={total} confidence={totalConf} emphasis />
      </div>

      {sumaFalla && (
        <div className="flex items-start gap-3 px-4 py-3 border-l-2 border-red-700 dark:border-red-400 bg-red-50/60 dark:bg-red-950/20">
          <AlertTriangle
            size={18}
            strokeWidth={2.25}
            className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
          />
          <div className="text-sm leading-relaxed">
            <div className="font-semibold text-red-700 dark:text-red-400">
              La suma no cuadra
            </div>
            <div className="font-mono tabular-nums text-xs text-stone-700 dark:text-stone-300 mt-1">
              Declarado{" "}
              <strong className="font-semibold">
                {sumaCheck.totalDeclarado}
              </strong>{" "}
              · Suma calculada{" "}
              <strong className="font-semibold">
                {sumaCheck.sumaCalculada}
              </strong>{" "}
              · Diferencia{" "}
              <strong className="font-semibold">
                {sumaCheck.diferencia > 0 ? "+" : ""}
                {sumaCheck.diferencia}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
