"use client";

import ProgressRing from "./ProgressRing";
import BreakInstructions from "./BreakInstructions";
import type { TimerMode, ModeInstruksi } from "@/types/timer";

const STRIP: Record<TimerMode, string> = {
  kerja:     "bg-accent",
  mikro:     "bg-rest",
  istirahat: "bg-warn",
};

const BORDER: Record<TimerMode, string> = {
  kerja: "border-border",
  mikro: "border-border",
  istirahat: "border-border",
};

interface Props {
  sisa: number;
  total: number;
  mode: TimerMode;
  instruksi: ModeInstruksi | null;
  ringSize: number;
}

export default function TimerCard({
  sisa,
  total,
  mode,
  instruksi,
  ringSize,
}: Props) {
  // Override bg-surface and border to match plain card style in HTML
  return (
    <div
      className={`relative overflow-hidden rounded-[6px] border bg-surface ${BORDER[mode]} flex flex-col items-center p-[1.4rem_1.2rem] sm:p-[1.8rem_1.6rem]`}
    >
      {/* Top color strip */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-colors duration-400 ${STRIP[mode]}`}
      />

      <ProgressRing sisa={sisa} total={total} mode={mode} size={ringSize} />
      {instruksi && <BreakInstructions instruksi={instruksi} />}
    </div>
  );
}
