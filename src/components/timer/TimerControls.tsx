"use client";

import { Play, Pause, RotateCcw } from "lucide-react";

interface Props {
  running: boolean;
  onMulai: () => void;
  onJeda: () => void;
  onReset: () => void;
}

export default function TimerControls({ running, onMulai, onJeda, onReset }: Props) {
  return (
    <div className="grid grid-cols-2 gap-[0.6rem]">
      <button
        onClick={running ? onJeda : onMulai}
        className="flex items-center justify-center gap-1.75 rounded text-[0.77rem] sm:text-[1rem] p-[0.7rem_1rem] sm:p-[0.8rem_1rem] font-semibold tracking-[0.03em] font-sans bg-accent border border-accent text-white hover:opacity-85 hover:-translate-y-px transition-all duration-150"
      >
        {running ? (
          <Pause className="w-[0.7rem] h-[0.7rem] sm:w-[0.88rem] sm:h-[0.88rem]" />
        ) : (
          <Play className="w-[0.7rem] h-[0.7rem] sm:w-[0.88rem] sm:h-[0.88rem]" />
        )}
        {running ? "Jeda" : "Mulai"}
      </button>

      <button
        onClick={onReset}
        className="flex items-center justify-center gap-1.75 rounded text-[0.77rem] sm:text-[1rem] p-[0.7rem_1rem] sm:p-[0.8rem_1rem] font-semibold tracking-[0.03em] font-sans bg-transparent border border-bdr text-muted hover:border-muted hover:text-content transition-all duration-150"
      >
        <RotateCcw className="w-[0.7rem] h-[0.7rem] sm:w-[0.88rem] sm:h-[0.88rem]" />
        Reset
      </button>
    </div>
  );
}
