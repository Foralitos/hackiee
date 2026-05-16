export default function Avatar({ src, name, size = 32 }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  const style = { width: size, height: size };

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="rounded-full object-cover shrink-0"
        style={style}
      />
    );
  }

  return (
    <span
      className="rounded-full bg-black/[.08] dark:bg-white/[.12] flex items-center justify-center text-xs font-medium shrink-0"
      style={style}
    >
      {initial}
    </span>
  );
}
