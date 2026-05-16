import { Eye } from "lucide-react";
import ColaBadge from "@/components/atoms/ColaBadge";
import ActaIdentificacion from "@/components/molecules/ActaIdentificacion";
import BoletasGrid from "@/components/molecules/BoletasGrid";
import VotosTable from "@/components/molecules/VotosTable";
import TotalesPanel from "@/components/molecules/TotalesPanel";
import ValidacionesList from "@/components/molecules/ValidacionesList";
import ActaActions from "@/components/molecules/ActaActions";
import DecisionBanner from "@/components/molecules/DecisionBanner";

const FINAL_STATES = new Set(["validada", "corregida", "devuelta"]);

function SectionHeading({ number, title }) {
  return (
    <header className="flex items-baseline gap-3 mb-5">
      <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-400 dark:text-stone-600">
        {number}
      </span>
      <h2 className="text-base font-semibold text-foreground tracking-tight">
        {title}
      </h2>
    </header>
  );
}

function Divider() {
  return (
    <hr className="border-0 border-t border-stone-200/70 dark:border-stone-800/70" />
  );
}

export default function ActaResultView({
  acta,
  onActaUpdated,
  readOnly = false,
}) {
  if (!acta) return null;

  const cola = acta.clasificacion?.cola || "amarilla";
  const motivo = acta.clasificacion?.motivo;
  const confianza =
    acta.clasificacion?.confianzaGeneral ??
    acta.extraccion?.confianzaGeneral;
  const sumaCheck =
    (acta.validacion?.checks || []).find((c) => c.regla === "suma_votos") ||
    null;
  const decidida = FINAL_STATES.has(acta.estado);

  return (
    <article
      className="flex flex-col gap-10"
      style={{ animation: "fade-in-up 400ms ease-out both" }}
    >
      {/* HEADER */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-b border-stone-300 dark:border-stone-700 pb-6">
        <div className="flex flex-col gap-3">
          <ColaBadge cola={cola} size="lg" />
          {motivo && (
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              {motivo}
            </p>
          )}
        </div>

        {typeof confianza === "number" && (
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-stone-500">
              Confianza general
            </span>
            <span className="font-mono tabular-nums text-3xl font-medium tracking-tight text-foreground">
              {Math.round(confianza * 100)}
              <span className="text-base text-stone-500 ml-0.5 font-normal">
                %
              </span>
            </span>
          </div>
        )}
      </header>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        {/* LEFT — imagen */}
        <aside className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-20 lg:self-start order-2 lg:order-1">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-stone-500">
            Imagen original
          </span>
          {acta.imagen?.secureUrl ? (
            <a
              href={acta.imagen.secureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 overflow-hidden"
            >
              {/* Using <img> not <Image>: Cloudinary URLs are arbitrary, no remotePatterns config. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={acta.imagen.secureUrl}
                alt="Acta de escrutinio y cómputo"
                className="w-full h-auto block"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[.04] transition-colors flex items-end justify-end p-3 opacity-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background border border-stone-300 dark:border-stone-700 text-xs font-medium">
                  <Eye size={12} strokeWidth={2.25} />
                  Abrir en grande
                </span>
              </div>
            </a>
          ) : (
            <div className="aspect-[3/4] bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-500 text-sm italic">
              Sin imagen
            </div>
          )}
        </aside>

        {/* RIGHT — secciones */}
        <div className="lg:col-span-7 flex flex-col gap-10 order-1 lg:order-2">
          <section>
            <SectionHeading number="01" title="Identificación" />
            <ActaIdentificacion data={acta.extraccion?.identificacion} />
          </section>

          <Divider />

          <section>
            <SectionHeading number="02" title="Boletas" />
            <BoletasGrid boletas={acta.extraccion?.boletas} />
          </section>

          <Divider />

          <section>
            <SectionHeading number="03" title="Votos por partido" />
            <VotosTable votos={acta.extraccion?.votosPorPartido} />
          </section>

          <Divider />

          <section>
            <SectionHeading number="04" title="Totales" />
            <TotalesPanel
              extraccion={acta.extraccion}
              sumaCheck={sumaCheck}
            />
          </section>

          <Divider />

          <section>
            <SectionHeading number="05" title="Validaciones aritméticas" />
            <ValidacionesList checks={acta.validacion?.checks} />
          </section>
        </div>
      </div>

      {/* ACTIONS o BANNER de decisión */}
      <div className="border-t border-stone-300 dark:border-stone-700 pt-6">
        {decidida ? (
          <DecisionBanner acta={acta} />
        ) : readOnly ? (
          <p className="text-sm text-stone-500 italic">
            Acta pendiente de decisión.
          </p>
        ) : (
          <ActaActions
            actaId={acta.id || acta._id}
            estado={acta.estado}
            onDecided={onActaUpdated}
          />
        )}
      </div>
    </article>
  );
}
