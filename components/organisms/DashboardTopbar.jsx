"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import IconButton from "@/components/atoms/IconButton";

const TITLES = {
  "/dashboard": "Inicio",
  "/dashboard/actas/upload": "Procesar acta",
};

function titleFor(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  // Fallback: longest matching prefix
  const match = Object.keys(TITLES)
    .filter((k) => pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? TITLES[match] : "Dashboard";
}

export default function DashboardTopbar({ onOpenMenu }) {
  const pathname = usePathname();
  const title = titleFor(pathname);

  return (
    <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur border-b border-black/[.06] dark:border-white/[.08]">
      <div className="h-full px-4 lg:px-8 flex items-center gap-3">
        <IconButton
          icon={Menu}
          label="Abrir menú"
          onClick={onOpenMenu}
          className="lg:hidden"
        />
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  );
}
