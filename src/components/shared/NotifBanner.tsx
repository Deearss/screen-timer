"use client";

import { Bell } from "lucide-react";
import type { NotifPermission } from "@/hooks/useNotification";

interface Props {
  permission: NotifPermission;
  onRequest: () => void;
}

export default function NotifBanner({ permission, onRequest }: Props) {
  if (permission !== "default") return null;

  return (
    <button
      onClick={onRequest}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                 bg-surface border-t border-bdr text-muted
                 hover:text-content transition-colors duration-150"
      style={{ fontSize: "0.52rem" }}
    >
      <Bell size={11} />
      <span>Izinkan notifikasi untuk pengingat timer</span>
    </button>
  );
}
