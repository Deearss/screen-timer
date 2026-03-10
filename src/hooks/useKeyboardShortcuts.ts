"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/stores/timerStore";

export function useKeyboardShortcuts() {
  const { running, mulai, jeda, reset } = useTimerStore();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Jangan trigger kalau user lagi focus di input/select
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if ((e.target as HTMLElement).isContentEditable) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (running) { jeda(); } else { mulai(); }
      } else if (e.key === "r" || e.key === "R") {
        reset();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, mulai, jeda, reset]);
}
