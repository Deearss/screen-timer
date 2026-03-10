"use client";

import { SlidersHorizontal } from "lucide-react";
import { PRESETS } from "@/lib/constants";

interface Props {
  value: number;
  onChange: (menit: number) => void;
  disabled: boolean;
}

export default function IntervalSelect({ value, onChange, disabled }: Props) {
  return (
    <div className="flex items-center gap-[0.4rem]">
      <label
        htmlFor="interval-select"
        className="text-muted flex items-center gap-1"
        style={{ fontSize: "0.66rem" }}
      >
        <SlidersHorizontal size={10} />
        interval kerja
      </label>
      <select
        id="interval-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="bg-surface border border-bdr rounded px-2 py-1 text-content
                   disabled:opacity-25 disabled:cursor-not-allowed
                   focus:outline-none focus:border-accent/60 cursor-pointer"
        style={{ fontSize: "0.69rem" }}
      >
        {PRESETS.map((p) => (
          <option key={p} value={p}>
            {p} menit
          </option>
        ))}
      </select>
    </div>
  );
}
