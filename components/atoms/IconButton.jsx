export default function IconButton({
  icon: Icon,
  label,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-black/[.04] dark:hover:bg-white/[.06] hover:text-foreground transition-colors ${className}`}
      {...props}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );
}
