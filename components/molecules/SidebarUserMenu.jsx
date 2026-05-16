"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Avatar from "@/components/atoms/Avatar";
import IconButton from "@/components/atoms/IconButton";

export default function SidebarUserMenu({ user }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-lg border border-black/[.06] dark:border-white/[.08]">
      <Avatar src={user.image} name={user.name || user.email} size={36} />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium truncate">
          {user.name || user.email}
        </span>
        {user.name && user.email && (
          <span className="text-xs text-zinc-500 truncate">{user.email}</span>
        )}
      </div>
      <IconButton
        icon={LogOut}
        label="Cerrar sesión"
        onClick={() => signOut({ callbackUrl: "/" })}
      />
    </div>
  );
}
