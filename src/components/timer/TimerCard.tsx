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
  kerja:     "border-accent/20",
  mikro:     "border-rest/20",
  istirahat: "border-warn/20",
};

interface Props {
  sisa: number;
  total: number;
  mode: TimerMode;
  instruksi: ModeInstruksi | null;
  ringSize: number;
}

export default function TimerCard({ sisa, total, mode, instruksi, ringSize }: Props) {
  return (
    <div className={`overflow-hidden rounded-md border bg-surface ${BORDER[mode]}`}>
      {/* Top color strip */}
      <div className={`h-0.5 w-full ${STRIP[mode]}`} />

      <div className="flex flex-col items-center gap-4 px-[1.2rem] py-[1.4rem]">
        <ProgressRing sisa={sisa} total={total} mode={mode} size={ringSize} />
        {instruksi && <BreakInstructions instruksi={instruksi} />}
      </div>
    </div>
  );
}
