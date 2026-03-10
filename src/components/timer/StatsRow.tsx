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
    <div className="flex-1 flex flex-col items-center gap-1 bg-surface rounded border border-bdr py-[0.7rem] px-2">
      <span className="text-content font-bold" style={{ fontSize: "1.43rem", letterSpacing: "-0.02em" }}>
        {value}
      </span>
      <span className="text-muted uppercase tracking-wider flex items-center gap-1" style={{ fontSize: "0.58rem" }}>
        <Icon size={9} style={{ opacity: 0.7 }} />
        {label}
      </span>
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
