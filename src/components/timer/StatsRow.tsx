"use client";

import { Hourglass, Coffee, Layers, Volume2, Zap } from "lucide-react";
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
  const isBoosted = volume > 1.0;
  const pct = Math.round(volume * 100);

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    onVolumeChange(parseFloat(e.target.value));
  }

  function handleVolumeCommit() {
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
      <div
        className={`flex items-center gap-2.5 px-[0.6rem] py-[0.55rem] bg-surface rounded-lg border border-solid transition-colors duration-300 ${
          isBoosted ? "border-warn/50" : ""
        }`}
      >
        {/* Icon: boost mode pakai Zap, normal pakai Volume2 */}
        {isBoosted ? (
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warn shrink-0 animate-urg-blink" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted shrink-0" />
        )}

        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1.5"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          onMouseUp={handleVolumeCommit}
          onTouchEnd={handleVolumeCommit}
          className={`flex-1 h-1 appearance-none rounded-full cursor-pointer transition-colors duration-300 ${
            isBoosted ? "accent-warn bg-warn/20" : "accent-accent bg-subtle"
          }`}
          aria-label="Volume suara notifikasi"
        />

        {/* Persentase + label BOOST */}
        <div className="flex items-center gap-1 shrink-0">
          <span
            className={`text-[0.6rem] sm:text-[0.75rem] w-8 text-right tabular-nums transition-colors duration-300 ${
              isBoosted ? "text-warn font-bold animate-urg-blink" : "text-muted"
            }`}
          >
            {pct}%
          </span>
          {isBoosted && (
            <span className="text-[0.5rem] sm:text-[0.6rem] font-bold tracking-wider uppercase text-warn/70 animate-urg-blink">
              boost
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
