"use client";

import { Hourglass, Coffee, Layers } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

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
      <div className="mt-0.75 flex items-center justify-center gap-1 text-[0.58rem] sm:text-[0.77rem] font-medium tracking-[0.08em] uppercase text-muted">
        <Icon className="w-[0.54rem] h-[0.54rem] sm:w-[0.68rem] sm:h-[0.68rem] opacity-70" />
        {label}
      </div>
    </div>
  );
}

interface Props {
  fokusMenit: string;
  totalSesi: number;
  totalBreak: number;
}

export default function StatsRow({ fokusMenit, totalSesi, totalBreak }: Props) {
  return (
    <div className="flex gap-[0.6rem]">
      <StatCard label="Fokus"     value={fokusMenit}          Icon={Hourglass} />
      <StatCard label="Istirahat" value={String(totalBreak)}  Icon={Coffee}    />
      <StatCard label="Sesi"      value={String(totalSesi)}   Icon={Layers}    />
    </div>
  );
}
