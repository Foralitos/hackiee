export default function ConfidenceIndicator({ value = 0, size = 8 }) {
  const v = typeof value === "number" ? value : 0;
  const color =
    v >= 0.85
      ? "bg-emerald-600 dark:bg-emerald-400"
      : v >= 0.7
        ? "bg-amber-600 dark:bg-amber-400"
        : "bg-red-600 dark:bg-red-400";
  const pct = Math.round(v * 100);

  return (
    <span
      title={`Confianza ${pct}%`}
      aria-label={`Confianza ${pct}%`}
      className={`inline-block rounded-full shrink-0 ${color}`}
      style={{ width: size, height: size }}
    />
  );
}
