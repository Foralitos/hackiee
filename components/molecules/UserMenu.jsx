"use client";

import { signOut } from "next-auth/react";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

export default function UserMenu({ user }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Avatar src={user.image} name={user.name || user.email} />
        <span className="text-sm font-medium hidden sm:inline">
          {user.name || user.email}
        </span>
      </div>
      <Button
        variant="ghost"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </div>
  );
}
