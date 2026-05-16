export default function NavSection({ title, children }) {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {title}
        </h3>
      )}
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}
