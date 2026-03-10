"use client";

import { Eye } from "lucide-react";

interface Props {
  sesiBlok: number; // 0–3 completed in current block
}

export default function TimerHeader({ sesiBlok }: Props) {
  const sesiNum = Math.min(sesiBlok + 1, 4);

  return (
    <div className="flex items-start justify-between border-b border-bdr pb-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Eye size={15} className="text-accent" />
        <span className="font-bold" style={{ fontSize: "0.75rem" }}>
          <span className="text-accent">screen</span>
          <span className="text-muted font-normal">timer</span>
        </span>
      </div>

      {/* Session info — right side */}
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-muted" style={{ fontSize: "0.48rem", letterSpacing: "0.03em" }}>
          sesi <b className="text-accent font-bold">{sesiNum}</b> / 4 → istirahat panjang
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{ width: 7, height: 7, borderRadius: 2 }}
              className={`transition-colors duration-300 ${
                i < sesiBlok ? "bg-accent" : "bg-subtle"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
