"use client";

import { Play, Pause, RotateCcw } from "lucide-react";

interface Props {
  running: boolean;
  onMulai: () => void;
  onJeda: () => void;
  onReset: () => void;
}

export default function TimerControls({
  running,
  onMulai,
  onJeda,
  onReset,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-[0.6rem]">
      <button
        onClick={running ? onJeda : onMulai}
        className="cursor-pointer flex items-center justify-center gap-1.75 rounded text-[0.77rem] sm:text-[1rem] p-[0.7rem_1rem] sm:p-[0.8rem_1rem] font-semibold tracking-[0.03em] font-sans bg-accent border border-accent text-white opacity-70 hover:opacity-100 hover:-translate-y-px transition-all duration-150"
      >
        {running ? (
          <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {running ? "Jeda" : "Mulai"}
      </button>

      <button
        onClick={onReset}
        className="cursor-pointer flex items-center justify-center gap-1.75 rounded text-[0.77rem] sm:text-[1rem] p-[0.7rem_1rem] sm:p-[0.8rem_1rem] font-semibold tracking-[0.03em] font-sans bg-transparent border border-muted/70 text-content/70 hover:border-muted hover:text-content transition-all duration-150"
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        Reset
      </button>
    </div>
  );
}
