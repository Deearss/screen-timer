"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { PRESETS } from "@/lib/constants";

interface Props {
  value: number;
  onChange: (menit: number) => void;
  disabled: boolean;
}

const LABEL = (p: number) => (p === 0 ? "Testing" : `${p} menit`);

export default function IntervalSelect({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  function handleSelect(p: number) {
    onChange(p);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-1.75">
      <label
        htmlFor="interval-trigger"
        className="text-muted flex items-center gap-1.25 text-[0.66rem] sm:text-[0.87rem] cursor-default select-none"
      >
        <SlidersHorizontal className="w-[0.6rem] h-[0.6rem] sm:w-3 sm:h-3" />
        interval kerja
      </label>

      {/* Dropdown root */}
      <div ref={rootRef} className="relative">
        {/* Trigger */}
        <button
          id="interval-trigger"
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`cursor-pointer flex items-center gap-3 rounded-[5px] border border-bdr bg-surface px-[0.65rem] py-[0.3rem] sm:py-[0.35rem] text-content text-[0.69rem] sm:text-[0.92rem] font-sans whitespace-nowrap select-none transition-all duration-150 outline-none
            focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30
            hover:border-muted hover:bg-subtle
            disabled:opacity-30 disabled:cursor-not-allowed
            ${open ? "border-accent ring-2 ring-accent/20" : ""}`}
        >
          {LABEL(value)}
          <ChevronDown
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Popover */}
        {open && (
          <div
            role="listbox"
            aria-label="Pilih interval kerja"
            className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-36 overflow-hidden rounded-[7px] border border-bdr bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.45)] animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-100"
          >
            <div className="p-1 flex flex-col gap-1">
              {PRESETS.map((p) => {
                const selected = p === value;
                return (
                  <button
                    key={p}
                    role="option"
                    type="button"
                    aria-selected={selected}
                    onClick={() => handleSelect(p)}
                    className={`cursor-pointer flex w-full items-center gap-2 rounded-sm px-2 py-[0.35rem] sm:py-[0.4rem] text-left text-[0.69rem] sm:text-[0.88rem] transition-colors duration-100 outline-none
                      ${
                        selected
                          ? "bg-accent/15 text-accent font-medium"
                          : "text-content hover:bg-subtle"
                      }`}
                  >
                    <Check
                      className={`w-3 h-3 shrink-0 transition-opacity duration-100 ${selected ? "opacity-100 text-accent" : "opacity-0"}`}
                    />
                    {LABEL(p)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
