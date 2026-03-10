"use client";

import { CIRC } from "@/lib/constants";
import { ringOffset, isUrgent } from "@/lib/timer-utils";
import { fmt } from "@/lib/timer-utils";
import type { TimerMode } from "@/types/timer";

interface Props {
  sisa: number;
  total: number;
  mode: TimerMode;
  /** px size — SVG scales via CSS width/height */
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

export default function ProgressRing({ sisa, total, mode, size = 150 }: Props) {
  const urgent = isUrgent(sisa);
  const ringClass = urgent ? RING_COLOR.urgent : RING_COLOR[mode];
  const timeClass = urgent ? TIME_COLOR.urgent : TIME_COLOR[mode];
  const offset = ringOffset(sisa, total);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* SVG ring — scales via CSS width/height, viewBox tetap 150x150 */}
      <svg
        width={size}
        height={size}
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
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-1"
        style={{ padding: size === 150 ? "28px" : "36px" }}
      >
        <span
          className={`font-bold leading-none text-center w-full whitespace-nowrap overflow-hidden
            ${timeClass}`}
          style={{ fontSize: size === 150 ? "1.82rem" : "2rem" }}
        >
          {fmt(sisa)}
        </span>
        <span
          className="text-muted uppercase tracking-widest"
          style={{ fontSize: "0.57rem" }}
        >
          tersisa
        </span>
      </div>
    </div>
  );
}
