"use client";

import { PRESETS } from "@/lib/constants";

interface Props {
  value: number;
  onChange: (menit: number) => void;
  disabled: boolean;
}

export default function IntervalSelect({ value, onChange, disabled }: Props) {
  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor="interval-select"
        className="text-muted uppercase tracking-wider"
        style={{ fontSize: "0.5rem" }}
      >
        Interval kerja
      </label>
      <select
        id="interval-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="bg-surface border border-bdr rounded px-2 py-1 text-content
                   disabled:opacity-25 disabled:cursor-not-allowed
                   focus:outline-none focus:border-accent/60 cursor-pointer"
        style={{ fontSize: "0.6rem" }}
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
