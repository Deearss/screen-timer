"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useTimerStore } from "@/stores/timerStore";
import { useNotification } from "@/hooks/useNotification";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { playBong } from "@/lib/sound";
import { calcFokusMenit } from "@/lib/timer-utils";
import type { ToastPayload } from "@/types/timer";

import TimerHeader from "./TimerHeader";
import TimerBadge from "./TimerBadge";
import TimerCard from "./TimerCard";
import TimerControls from "./TimerControls";
import IntervalSelect from "./IntervalSelect";
import StatsRow from "./StatsRow";
import NotifBanner from "@/components/shared/NotifBanner";

export default function TimerPage() {
  const {
    mode,
    sisa,
    total,
    menitKerja,
    sesiBlok,
    totalSesi,
    totalBreak,
    running,
    pendingToast,
    didFinish,
    mulai,
    jeda,
    reset,
    gantiInterval,
    clearSideEffects,
    activeInstruksi,
  } = useTimerStore();

  const { permission, request, send } = useNotification();

  // Toast display state
  const [toast, setToast] = useState<(ToastPayload & { key: number }) | null>(
    null,
  );

  // Responsive ring size (150px mobile, 200px sm+)
  const [ringSize, setRingSize] = useState(150);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 601px)");
    const update = () => setRingSize(mq.matches ? 200 : 150);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Keyboard shortcuts (Space / R)
  useKeyboardShortcuts();

  // Handle timer completion: sound + notification + toast
  useEffect(() => {
    if (!didFinish) return;
    playBong();
    if (pendingToast) {
      send(pendingToast.title, pendingToast.body);
      setToast({ ...pendingToast, key: Date.now() });
    }
    clearSideEffects();
  }, [didFinish]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const instruksi = activeInstruksi;
  const fokusMenit = calcFokusMenit(
    menitKerja,
    totalSesi,
    total,
    sisa,
    mode,
    running,
  );

  return (
    <>
      <TimerHeader sesiBlok={sesiBlok} />
      {/* Badge + Interval — same row */}
      <div className="flex items-center justify-between">
        <TimerBadge mode={mode} running={running} />
        <IntervalSelect
          value={menitKerja}
          onChange={gantiInterval}
          disabled={running || mode !== "kerja"}
        />
      </div>

      <TimerCard
        sisa={sisa}
        total={total}
        mode={mode}
        instruksi={instruksi}
        ringSize={ringSize}
      />
      <TimerControls
        running={running}
        onMulai={mulai}
        onJeda={jeda}
        onReset={reset}
      />
      <StatsRow
        fokusMenit={fokusMenit}
        totalSesi={totalSesi}
        totalBreak={totalBreak}
      />

      {/* Footer */}
      <footer className="flex flex-col gap-[0.55rem] border-t border-bdr pt-[0.7rem] pb-8 text-[0.63rem] text-muted sm:text-[0.82rem]">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} screentimer</div>
          <div className="flex items-center gap-1.25 text-[0.59rem] opacity-55 sm:text-[0.78rem]">
            <Info size={10} />
            Sumber: AOA &amp; ScienceDirect
          </div>
        </div>
      </footer>

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.key}
          className={`fixed top-[1.2rem] right-[1.2rem] max-w-57.5 sm:max-w-65 p-[0.8rem_1rem] rounded-[5px] border z-999 leading-relaxed transition-all duration-250 ease-in-out ${
            toast.variant === "warning"
              ? "bg-warn-dim border-warn/40 text-warn"
              : "bg-surface border-accent-mid text-accent"
          }`}
          role="alert"
        >
          <div className="font-bold mb-0.5 text-[0.74rem] sm:text-[0.96rem]">
            {toast.title}
          </div>
          <div className="text-[0.74rem] sm:text-[0.96rem]">{toast.body}</div>
        </div>
      )}

      {/* Notification permission banner (sticky footer) */}
      <div className="fixed bottom-0 left-0 right-0">
        <NotifBanner permission={permission} onRequest={request} />
      </div>
    </>
  );
}
