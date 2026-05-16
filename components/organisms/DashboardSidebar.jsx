"use client";

import Link from "next/link";
import { House, FileScan, Inbox, MapPin, Activity, X } from "lucide-react";
import config from "@/config";
import NavLink from "@/components/atoms/NavLink";
import IconButton from "@/components/atoms/IconButton";
import NavSection from "@/components/molecules/NavSection";
import SidebarUserMenu from "@/components/molecules/SidebarUserMenu";

const NAV = [
  {
    title: "Operación",
    items: [
      { href: "/dashboard", label: "Inicio", icon: House },
      { href: "/dashboard/actas/upload", label: "Procesar acta", icon: FileScan },
      { href: "/dashboard/actas", label: "Bandeja", icon: Inbox },
    ],
  },
  {
    title: "Supervisión",
    items: [
      { href: "/dashboard/supervisor", label: "Supervisor", icon: Activity },
    ],
  },
  {
    title: "Catálogos",
    items: [
      { href: "/dashboard/casillas", label: "Casillas", icon: MapPin },
    ],
  },
];

export default function DashboardSidebar({ user, open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky inset-y-0 left-0 z-40 w-[260px] shrink-0 bg-background border-r border-black/[.06] dark:border-white/[.08] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:h-screen lg:top-0`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-black/[.06] dark:border-white/[.08]">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-base font-semibold tracking-tight"
          >
            {config.appName}
          </Link>
          <IconButton
            icon={X}
            label="Cerrar menú"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-4">
          {NAV.map((section) => (
            <NavSection key={section.title} title={section.title}>
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  onNavigate={onClose}
                >
                  {item.label}
                </NavLink>
              ))}
            </NavSection>
          ))}
        </div>

        <div className="p-3 border-t border-black/[.06] dark:border-white/[.08]">
          <SidebarUserMenu user={user} />
        </div>
      </aside>
    </>
  );
}
