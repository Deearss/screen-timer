"use client";

import { Laptop, Eye, Coffee } from "lucide-react";
import type { TimerMode } from "@/types/timer";

const BADGE: Record<
  TimerMode,
  {
    style: string;
    pulse: string;
    label: string;
    Icon: React.ComponentType<{ size?: number }>;
  }
> = {
  kerja: {
    style: "bg-accent/12 text-accent border-accent/35",
    pulse: "animate-kerja-pulse",
    label: "Kerja",
    Icon: Laptop,
  },
  mikro: {
    style: "bg-rest/12 text-rest border-rest/35",
    pulse: "animate-mikro-pulse",
    label: "Istirahat Mikro",
    Icon: Eye,
  },
  istirahat: {
    style: "bg-warn/12 text-warn border-warn/35",
    pulse: "",
    label: "Istirahat Panjang",
    Icon: Coffee,
  },
};

interface Props {
  mode: TimerMode;
  running: boolean;
}

export default function TimerBadge({ mode, running }: Props) {
  const { style, pulse, label, Icon } = BADGE[mode];
  const pulseClass = running && pulse ? pulse : "";

  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-1.75 text-[0.66rem] sm:text-[0.87rem] font-semibold tracking-widest uppercase px-[0.7rem] sm:px-[0.8rem] py-[0.28rem] sm:py-[0.32rem] rounded-[3px] border transition-all duration-300 ${style} ${pulseClass}`}
    >
      <div className="size-[0.9rem] sm:size-4.5 flex items-center justify-center relative top-[-1.2px] sm:top-[-1.5px]">
        <Icon size={22} />
      </div>
      <span>{label}</span>
    </div>
  );
}
