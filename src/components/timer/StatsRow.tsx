"use client";

import { Hourglass, Coffee, Layers, Volume2 } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { playBong } from "@/lib/sound";

interface StatCardProps {
  label: string;
  value: string;
  Icon: ComponentType<LucideProps>;
}

function StatCard({ label, value, Icon }: StatCardProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-[0.7rem_0.5rem] bg-surface rounded-lg border border-solid text-center">
      <div className="text-[1.43rem] sm:text-[1.9rem] font-bold text-content tracking-[-0.02em]">
        {value}
      </div>
      <div className="mt-0.75 flex items-center justify-center gap-1.5 text-[0.58rem] sm:text-[0.77rem] font-medium tracking-[0.08em] uppercase text-muted">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
        {label}
      </div>
    </div>
  );
}

interface Props {
  fokusMenit: string;
  totalSesi: number;
  totalBreak: number;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export default function StatsRow({ fokusMenit, totalSesi, totalBreak, volume, onVolumeChange }: Props) {
  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    onVolumeChange(v);
  }

  function handleVolumeCommit() {
    // Preview bong saat user selesai drag / klik slider
    playBong();
  }

  return (
    <div className="flex flex-col gap-[0.6rem]">
      <div className="flex gap-[0.6rem]">
        <StatCard label="Fokus" value={fokusMenit} Icon={Hourglass} />
        <StatCard label="Istirahat" value={String(totalBreak)} Icon={Coffee} />
        <StatCard label="Sesi" value={String(totalSesi)} Icon={Layers} />
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-2.5 px-[0.6rem] py-[0.55rem] bg-surface rounded-lg border border-solid">
        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted shrink-0" />
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          onMouseUp={handleVolumeCommit}
          onTouchEnd={handleVolumeCommit}
          className="flex-1 h-1 appearance-none rounded-full bg-subtle accent-accent cursor-pointer"
          aria-label="Volume suara notifikasi"
        />
        <span className="text-[0.6rem] sm:text-[0.75rem] text-muted w-7 text-right tabular-nums shrink-0">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}

