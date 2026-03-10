"use client";

import type { TimerMode } from "@/types/timer";

const BADGE: Record<TimerMode, { style: string; pulse: string; label: string }> = {
  kerja:     { style: "bg-accent/15 text-accent border-accent/30",  pulse: "animate-kerja-pulse", label: "Kerja" },
  mikro:     { style: "bg-rest/15 text-rest border-rest/30",         pulse: "animate-mikro-pulse", label: "Istirahat Mikro" },
  istirahat: { style: "bg-warn/15 text-warn border-warn/30",         pulse: "",                   label: "Istirahat Panjang" },
};

interface Props {
  mode: TimerMode;
  running: boolean;
}

export default function TimerBadge({ mode, running }: Props) {
  const { style, pulse, label } = BADGE[mode];
  const pulseClass = running && pulse ? pulse : "";

  return (
    <span
      className={`self-start inline-flex items-center px-3 py-1 rounded border
                  text-xs font-semibold uppercase tracking-wider ${style} ${pulseClass}`}
    >
      {label}
    </span>
  );
}
