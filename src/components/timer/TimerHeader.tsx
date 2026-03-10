"use client";

import { Eye } from "lucide-react";

interface Props {
  sesiBlok: number; // 0–3 completed in current block
}

export default function TimerHeader({ sesiBlok }: Props) {
  const sesiNum = Math.min(sesiBlok + 1, 4);

  return (
    <div className="flex items-start justify-between border-b border-bdr pb-[0.85rem]">
      {/* Logo */}
      <div className="flex items-center gap-1.75 text-[1.1rem] sm:text-[1.45rem] font-bold tracking-[-0.01em] text-accent">
        <Eye className="size-[1.4rem] sm:size-[1.7rem] opacity-85" />
        <span className="text-accent">
          screen<span className="text-muted font-normal">timer</span>
        </span>
      </div>

      {/* Session info */}
      <div className="flex flex-col items-end gap-1.25">
        <div className="text-[0.66rem] sm:text-[0.87rem] text-muted tracking-[0.03em]">
          sesi <b className="text-accent font-bold">{sesiNum}</b> / 4 &rarr;
          istirahat panjang
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.75 h-1.75 sm:w-2.25 sm:h-2.25 rounded-xs transition-colors duration-300 ${
                i < sesiBlok ? "bg-accent" : "bg-subtle"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
