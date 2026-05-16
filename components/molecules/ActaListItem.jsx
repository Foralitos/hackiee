import Link from "next/link";
import ColaBadge from "@/components/atoms/ColaBadge";
import EstadoBadge from "@/components/atoms/EstadoBadge";
import Avatar from "@/components/atoms/Avatar";

function formatRelative(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const diffMs = Date.now() - d.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "hace unos segundos";
  const min = Math.floor(sec / 60);
  if (min < 60) return `hace ${min} min`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `hace ${hr} h`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `hace ${day} d`;
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function lastDecision(acta) {
  const dec = acta?.decisiones || [];
  if (!dec.length) return null;
  return dec[dec.length - 1];
}

export default function ActaListItem({ acta }) {
  const id = acta.id || acta._id;
  const ident = acta.extraccion?.identificacion || {};
  const cola = acta.clasificacion?.cola || "amarilla";
  const decision = lastDecision(acta);
  const operador = decision?.operador;
  const operadorName =
    (operador && typeof operador === "object" && operador.name) || null;
  const operadorImage =
    (operador && typeof operador === "object" && operador.image) || null;
  const fechaRel = formatRelative(acta.updatedAt || acta.createdAt);

  const ubicacion = [
    ident.seccion && `Sección ${ident.seccion}`,
    ident.casilla && `Casilla ${ident.casilla}`,
    ident.tipoEleccion,
  ]
    .filter(Boolean)
    .join(" · ") || "Sin identificación";

  return (
    <Link
      href={`/dashboard/actas/${id}`}
      className="group block border border-stone-200/70 dark:border-stone-800/70 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
        <div className="shrink-0">
          <ColaBadge cola={cola} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {ubicacion}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-500">
            {fechaRel && <span>{fechaRel}</span>}
            {operadorName && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Avatar src={operadorImage} name={operadorName} size={14} />
                  <span>{operadorName}</span>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <EstadoBadge estado={acta.estado} />
        </div>
      </div>
    </Link>
  );
}
