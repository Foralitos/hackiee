const variants = {
  primary:
    "bg-foreground text-background hover:opacity-90 border border-transparent",
  ghost:
    "bg-transparent text-foreground hover:bg-black/[.04] dark:hover:bg-white/[.06] border border-black/[.08] dark:border-white/[.145]",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
