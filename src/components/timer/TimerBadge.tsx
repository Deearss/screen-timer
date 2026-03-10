"use client";

import { Laptop, Eye, Coffee } from "lucide-react";
import type { TimerMode } from "@/types/timer";

const BADGE: Record<TimerMode, { style: string; pulse: string; label: string; Icon: React.ComponentType<{ size?: number }> }> = {
  kerja:     { style: "bg-accent/12 text-accent border-accent/35",  pulse: "animate-kerja-pulse", label: "Kerja",             Icon: Laptop  },
  mikro:     { style: "bg-rest/12 text-rest border-rest/35",         pulse: "animate-mikro-pulse", label: "Istirahat Mikro",   Icon: Eye     },
  istirahat: { style: "bg-warn/12 text-warn border-warn/35",         pulse: "",                   label: "Istirahat Panjang",  Icon: Coffee  },
};

interface Props {
  mode: TimerMode;
  running: boolean;
}

export default function TimerBadge({ mode, running }: Props) {
  const { style, pulse, label, Icon } = BADGE[mode];
  const pulseClass = running && pulse ? pulse : "";

  return (
    <span
      className={`self-start inline-flex items-center gap-1.5 px-[0.7rem] py-[0.28rem] rounded border
                  font-semibold uppercase tracking-widest ${style} ${pulseClass}`}
      style={{ fontSize: "0.66rem" }}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}
