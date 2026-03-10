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
        className="flex items-center justify-center gap-2 rounded py-[0.85rem] font-semibold
                   bg-accent text-bg hover:opacity-85 active:scale-95
                   transition-all duration-150"
        style={{ fontSize: "0.7rem" }}
      >
        {running ? <Pause size={13} /> : <Play size={13} />}
        {running ? "Jeda" : "Mulai"}
      </button>

      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 rounded py-[0.85rem] font-semibold
                   bg-transparent border border-bdr text-muted
                   hover:border-muted hover:text-content active:scale-95
                   transition-all duration-150"
        style={{ fontSize: "0.7rem" }}
      >
        <RotateCcw size={13} />
        Reset
      </button>
    </div>
  );
}
