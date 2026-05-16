const VARIANTS = {
  bare: "",
  panel: "border border-stone-200/70 dark:border-stone-800/70",
  raised:
    "border border-stone-200/70 dark:border-stone-800/70 bg-stone-50/60 dark:bg-stone-900/40",
};

export default function Card({
  as: As = "section",
  variant = "bare",
  className = "",
  children,
  ...props
}) {
  return (
    <As className={`${VARIANTS[variant] || ""} ${className}`} {...props}>
      {children}
    </As>
  );
}
