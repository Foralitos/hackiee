"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, icon: Icon, children, onNavigate }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-black/[.06] dark:bg-white/[.08] text-foreground"
          : "text-zinc-600 dark:text-zinc-400 hover:bg-black/[.04] dark:hover:bg-white/[.04] hover:text-foreground"
      }`}
    >
      {Icon && <Icon size={18} strokeWidth={2} className="shrink-0" />}
      <span className="truncate">{children}</span>
    </Link>
  );
}
