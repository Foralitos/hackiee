function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-stone-500">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground font-mono tabular-nums">
        {value || "—"}
      </span>
    </div>
  );
}

export default function ActaIdentificacion({ data = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
      <Field label="Entidad" value={data.entidad} />
      <Field label="Distrito" value={data.distrito} />
      <Field label="Sección" value={data.seccion} />
      <Field label="Casilla" value={data.casilla} />
      <div className="col-span-2 sm:col-span-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-stone-500">
            Tipo de elección
          </span>
          <span className="text-sm font-medium text-foreground">
            {data.tipoEleccion || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
