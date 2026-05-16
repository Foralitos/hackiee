import Avatar from "@/components/atoms/Avatar";

export default function TopList({ items = [], emptyMessage = "Sin datos." }) {
  if (!items.length) {
    return (
      <p className="text-sm text-stone-500 italic">{emptyMessage}</p>
    );
  }
  return (
    <ul className="flex flex-col divide-y divide-stone-200/70 dark:divide-stone-800/70 -my-2">
      {items.map((item, i) => (
        <li
          key={item.id || item.label || i}
          className="flex items-center justify-between gap-3 py-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            {item.image !== undefined ? (
              <Avatar src={item.image} name={item.label} size={24} />
            ) : (
              <span className="font-mono tabular-nums text-[10px] text-stone-400 w-5 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className="text-sm font-medium truncate">{item.label}</span>
          </div>
          <span className="font-mono tabular-nums text-sm font-medium shrink-0">
            {item.count}
            {item.subCount != null && (
              <span className="text-red-700 dark:text-red-400 ml-2 text-xs">
                ({item.subCount} rojas)
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
