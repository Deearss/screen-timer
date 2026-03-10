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
    <div className={`w-full rounded-lg border p-3 ${border}`}>
      <p
        className="text-muted uppercase tracking-wider mb-2"
        style={{ fontSize: "0.63rem" }}
      >
        {judul}
      </p>
      <ul className="flex flex-col gap-1.5">
        {isi.map((item, i) => {
          const IconComp = (
            LucideIcons as unknown as Record<
              string,
              React.ComponentType<LucideProps>
            >
          )[item.icon];
          return (
            <li
              key={i}
              className="flex items-start gap-2 text-content"
              style={{ fontSize: "0.75rem" }}
            >
              {IconComp && (
                <IconComp size={11} className={`shrink-0 mt-0.5 ${icon}`} />
              )}
              <span>{item.teks}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
