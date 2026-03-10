"use client";

import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ModeInstruksi } from "@/types/timer";

const CLS_STYLE: Record<string, { border: string; icon: string }> = {
  mikro: { border: "border-rest/30 bg-rest/5", icon: "text-rest" },
  istirahat: { border: "border-warn/30 bg-warn/5", icon: "text-warn" },
};

interface Props {
  instruksi: ModeInstruksi;
}

export default function BreakInstructions({ instruksi }: Props) {
  const { cls, judul, isi } = instruksi;
  const { border, icon } = CLS_STYLE[cls] ?? {
    border: "border-bdr",
    icon: "text-muted",
  };

  return (
    <div className={`w-full rounded-lg border border-solid p-[0.75rem_0.9rem] sm:p-[0.9rem_1.1rem] mt-[0.9rem] sm:mt-[1.1rem] text-[0.75rem] sm:text-[1rem] leading-[1.75] ${border} ${icon}`}>
      <div className="flex items-center gap-1.5 text-[0.63rem] sm:text-[0.82rem] font-semibold tracking-widest uppercase opacity-65 mb-1.5">
        {judul}
      </div>
      <div>
        {isi.map((item, i) => {
          const IconComp = (
            LucideIcons as unknown as Record<
              string,
              React.ComponentType<LucideProps>
            >
          )[item.icon];
          return (
            <div
              key={i}
              className="flex items-center gap-2 py-px"
            >
              {IconComp && (
                <div className="shrink-0 w-3.25 sm:w-4 flex items-center justify-center opacity-80 text-[0.7rem] sm:text-[0.88rem]">
                  <IconComp size={14} className="opacity-80" />
                </div>
              )}
              <span>{item.teks}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
