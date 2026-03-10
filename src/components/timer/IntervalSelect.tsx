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
    <div className="flex items-center gap-1.75">
      <label
        htmlFor="interval-select"
        className="text-muted flex items-center gap-1.25 text-[0.66rem] sm:text-[0.87rem]"
      >
        <SlidersHorizontal className="w-[0.6rem] h-[0.6rem] sm:w-3 sm:h-3" />
        interval kerja
      </label>
      <select
        id="interval-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="bg-surface border border-bdr rounded-[3px] px-[0.45rem] sm:px-[0.55rem] py-[0.28rem] sm:py-[0.32rem] text-content text-[0.69rem] sm:text-[0.92rem] font-sans transition-colors duration-200 cursor-pointer outline-none focus:border-accent disabled:opacity-28 disabled:cursor-not-allowed"
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
