import { ArrowRight } from "lucide-react";
import ColaBadge from "@/components/atoms/ColaBadge";

export default function ColaExplainer({ cola, titulo, descripcion, accion }) {
  return (
    <div className="flex flex-col gap-5">
      <ColaBadge cola={cola} />
      <h3 className="text-lg font-semibold tracking-tight text-foreground leading-snug">
        {titulo}
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        {descripcion}
      </p>
      <div className="mt-auto pt-4 flex items-start gap-2 border-t border-stone-200/70 dark:border-stone-800/70">
        <ArrowRight
          size={12}
          strokeWidth={2.25}
          className="text-slate-700 dark:text-slate-400 mt-1.5 shrink-0"
        />
        <p className="text-xs uppercase tracking-[0.18em] font-medium text-slate-700 dark:text-slate-400 leading-relaxed">
          {accion}
        </p>
      </div>
    </div>
  );
}
