import { CheckCircle2, Pencil, RotateCcw } from "lucide-react";
import Avatar from "@/components/atoms/Avatar";

const STATE_CFG = {
  validada: {
    Icon: CheckCircle2,
    label: "Acta validada",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-700/30 dark:border-emerald-500/30",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
  },
  corregida: {
    Icon: Pencil,
    label: "Acta marcada para corrección",
    text: "text-foreground",
    border: "border-stone-300 dark:border-stone-700",
    bg: "bg-stone-50/60 dark:bg-stone-900/40",
  },
  devuelta: {
    Icon: RotateCcw,
    label: "Acta devuelta a casilla",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-700/30 dark:border-red-500/30",
    bg: "bg-red-50/60 dark:bg-red-950/20",
  },
};

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function lastDecisionFor(acta, estado) {
  const TIPO = { validada: "validar", corregida: "corregir", devuelta: "devolver" }[
    estado
  ];
  const decisiones = acta?.decisiones || [];
  for (let i = decisiones.length - 1; i >= 0; i--) {
    if (decisiones[i].tipo === TIPO) return decisiones[i];
  }
  return null;
}

export default function DecisionBanner({ acta }) {
  if (!acta) return null;
  const cfg = STATE_CFG[acta.estado];
  if (!cfg) return null;

  const decision = lastDecisionFor(acta, acta.estado);
  const operador = decision?.operador;
  const operadorName =
    (operador && typeof operador === "object" && operador.name) ||
    "operador desconocido";
  const operadorImage =
    operador && typeof operador === "object" ? operador.image : null;
  const fecha = formatDate(decision?.createdAt);
  const nota = decision?.nota;

  return (
    <div
      className={`flex items-start gap-4 p-5 border ${cfg.border} ${cfg.bg}`}
    >
      <cfg.Icon
        size={22}
        strokeWidth={2}
        className={`${cfg.text} mt-0.5 shrink-0`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className={`text-sm font-semibold ${cfg.text}`}>
            {cfg.label}
          </span>
          {fecha && (
            <span className="text-xs text-stone-500 dark:text-stone-500 font-mono">
              · {fecha}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
          <Avatar src={operadorImage} name={operadorName} size={20} />
          <span>
            por <span className="font-medium text-foreground">{operadorName}</span>
          </span>
        </div>

        {nota && (
          <div className="text-sm text-stone-700 dark:text-stone-300 border-l-2 border-stone-300 dark:border-stone-700 pl-3 mt-1 italic">
            “{nota}”
          </div>
        )}
      </div>
    </div>
  );
}
