import {
  Clock,
  CheckCircle2,
  Pencil,
  RotateCcw,
  Eye,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

const STATES = {
  pendiente: {
    Icon: Clock,
    label: "Pendiente",
    text: "text-stone-600 dark:text-stone-400",
    border: "border-stone-300 dark:border-stone-700",
    bg: "bg-stone-100/70 dark:bg-stone-900/40",
  },
  en_revision: {
    Icon: Eye,
    label: "En revisión",
    text: "text-stone-600 dark:text-stone-400",
    border: "border-stone-300 dark:border-stone-700",
    bg: "bg-stone-100/70 dark:bg-stone-900/40",
  },
  esperando_verificacion: {
    Icon: ShieldCheck,
    label: "Por verificar",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-700/30 dark:border-amber-500/30",
    bg: "bg-amber-50/70 dark:bg-amber-950/20",
  },
  discrepancia: {
    Icon: ShieldAlert,
    label: "Discrepancia",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-700/30 dark:border-red-500/30",
    bg: "bg-red-50/70 dark:bg-red-950/20",
  },
  validada: {
    Icon: CheckCircle2,
    label: "Validada",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-700/30 dark:border-emerald-500/30",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/20",
  },
  corregida: {
    Icon: Pencil,
    label: "Corregida",
    text: "text-stone-700 dark:text-stone-300",
    border: "border-stone-400/60 dark:border-stone-600/60",
    bg: "bg-stone-100/70 dark:bg-stone-900/40",
  },
  devuelta: {
    Icon: RotateCcw,
    label: "Devuelta",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-700/30 dark:border-red-500/30",
    bg: "bg-red-50/70 dark:bg-red-950/20",
  },
};

export default function EstadoBadge({ estado = "pendiente" }) {
  const cfg = STATES[estado] || STATES.pendiente;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${cfg.border} ${cfg.bg} ${cfg.text} px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] font-medium`}
    >
      <cfg.Icon size={12} strokeWidth={2.25} />
      {cfg.label}
    </span>
  );
}
