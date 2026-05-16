import { Inbox, AlertCircle } from "lucide-react";
import ActaListItem from "@/components/molecules/ActaListItem";
import ActaListSkeleton from "@/components/organisms/ActaListSkeleton";

export default function ActaList({ actas = [], loading, error, total }) {
  if (loading) return <ActaListSkeleton />;

  if (error) {
    return (
      <div className="flex items-start gap-3 p-4 border-l-2 border-red-700 dark:border-red-400 bg-red-50/60 dark:bg-red-950/20 text-sm">
        <AlertCircle
          size={18}
          strokeWidth={2.25}
          className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
        />
        <div>
          <div className="font-semibold text-red-700 dark:text-red-400">
            No se pudo cargar la bandeja
          </div>
          <div className="text-stone-700 dark:text-stone-300 mt-1 font-mono text-xs">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!actas.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Inbox size={32} strokeWidth={1.5} className="text-stone-400" />
        <div>
          <div className="text-sm font-medium text-foreground">
            No hay actas que coincidan con el filtro
          </div>
          <div className="text-xs text-stone-500 mt-1">
            Las actas decididas aparecerán aquí en cuanto un operador las
            valide, corrija o devuelva.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {typeof total === "number" && (
        <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500 pb-1">
          {total} {total === 1 ? "acta" : "actas"}
        </div>
      )}
      {actas.map((acta) => (
        <ActaListItem key={acta.id || acta._id} acta={acta} />
      ))}
    </div>
  );
}
