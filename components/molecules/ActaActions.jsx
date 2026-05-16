"use client";

import { CheckCircle2, Pencil, RotateCcw } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-foreground text-background hover:opacity-90 border-foreground",
  default:
    "bg-transparent text-foreground border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900",
  danger:
    "bg-transparent text-red-700 dark:text-red-400 border-red-700/30 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-950/30",
};

function ActionBtn({ icon: Icon, label, variant = "default", onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 h-11 border text-sm font-medium tracking-wide transition-colors disabled:opacity-50 ${VARIANTS[variant]}`}
    >
      <Icon size={16} strokeWidth={2.25} />
      {label}
    </button>
  );
}

export default function ActaActions({
  onValidar,
  onCorregir,
  onDevolver,
  disabled,
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
      <ActionBtn
        icon={RotateCcw}
        label="Devolver a casilla"
        variant="danger"
        onClick={onDevolver}
        disabled={disabled}
      />
      <ActionBtn
        icon={Pencil}
        label="Corregir"
        onClick={onCorregir}
        disabled={disabled}
      />
      <ActionBtn
        icon={CheckCircle2}
        label="Validar"
        variant="primary"
        onClick={onValidar}
        disabled={disabled}
      />
    </div>
  );
}
