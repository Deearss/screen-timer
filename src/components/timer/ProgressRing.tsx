"use client";

import { CIRC } from "@/lib/constants";
import { ringOffset, isUrgent, fmt } from "@/lib/timer-utils";
import type { TimerMode } from "@/types/timer";

interface Props {
  sisa: number;
  total: number;
  mode: TimerMode;
  size?: number;
}

const RING_COLOR: Record<TimerMode | "urgent", string> = {
  kerja: "stroke-accent",
  mikro: "stroke-rest",
  istirahat: "stroke-warn",
  urgent: "stroke-danger",
};

const TIME_COLOR: Record<TimerMode | "urgent", string> = {
  kerja: "text-accent",
  mikro: "text-rest",
  istirahat: "text-warn",
  urgent: "text-danger animate-urg-blink",
};

export default function ProgressRing({ sisa, total, mode }: Props) {
  const urgent = isUrgent(sisa);
  const ringClass = urgent ? RING_COLOR.urgent : RING_COLOR[mode];
  const timeClass = urgent ? TIME_COLOR.urgent : TIME_COLOR[mode];
  const offset = ringOffset(sisa, total);

  return (
    <div className="relative shrink-0 w-37.5 h-37.5 sm:w-50 sm:h-50">
      {/* SVG ring */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 150 150"
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="75"
          cy="75"
          r="64"
          fill="none"
          strokeWidth="5"
          className="stroke-subtle"
        />
        {/* Fill */}
        <circle
          cx="75"
          cy="75"
          r="64"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          className={`${ringClass} transition-[stroke-dashoffset] duration-250 linear`}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-7 sm:p-9">
        <span
          className={`font-bold leading-none text-center w-full whitespace-nowrap overflow-hidden text-[1.82rem] sm:text-[2rem] tracking-[-0.03em] transition-colors duration-300 ${timeClass}`}
        >
          {fmt(sisa)}
        </span>
        <span className="text-muted tracking-widest text-[0.57rem] sm:text-[0.72rem] uppercase">
          tersisa
        </span>
      </div>
    </div>
  );
}
