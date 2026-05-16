"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/organisms/DashboardSidebar";
import DashboardTopbar from "@/components/organisms/DashboardTopbar";

export default function DashboardShell({ user, children }) {
  // Drawer mobile state. Closes are wired through `onNavigate={onClose}` on
  // every NavLink + the sidebar's logo link, so we don't need an effect that
  // listens to pathname.
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <DashboardTopbar onOpenMenu={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
