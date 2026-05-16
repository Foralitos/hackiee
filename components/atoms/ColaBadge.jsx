import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const COLA = {
  verde: {
    Icon: CheckCircle2,
    label: "Verde",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
    border: "border-emerald-700/40 dark:border-emerald-500/40",
  },
  amarilla: {
    Icon: AlertTriangle,
    label: "Amarilla",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50/70 dark:bg-amber-950/30",
    border: "border-amber-700/40 dark:border-amber-500/40",
  },
  roja: {
    Icon: XCircle,
    label: "Roja",
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50/70 dark:bg-red-950/30",
    border: "border-red-700/40 dark:border-red-500/40",
  },
};

export default function ColaBadge({ cola = "verde", size = "md" }) {
  const cfg = COLA[cola] || COLA.amarilla;
  const lg = size === "lg";

  return (
    <span
      className={`inline-flex items-center gap-2.5 border-2 ${cfg.border} ${cfg.bg} ${cfg.text} ${
        lg ? "px-5 py-2.5" : "px-3 py-1.5"
      }`}
    >
      <cfg.Icon size={lg ? 20 : 16} strokeWidth={2.25} />
      <span
        className={`font-semibold uppercase tracking-[0.18em] ${
          lg ? "text-sm" : "text-[11px]"
        }`}
      >
        Cola {cfg.label}
      </span>
    </span>
  );
}
