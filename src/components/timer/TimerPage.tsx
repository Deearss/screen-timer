"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useTimerStore } from "@/stores/timerStore";
import { useNotification } from "@/hooks/useNotification";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { playDing } from "@/lib/sound";
import { calcFokusMenit } from "@/lib/timer-utils";
import { MODE } from "@/lib/constants";
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
    playDing();
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

  const instruksi = MODE[mode]?.instruksi ?? null;
  const fokusMenit = calcFokusMenit(
    menitKerja,
    totalSesi,
    total,
    sisa,
    mode,
    running,
  );

  return (
    <div className="w-full max-w-110 flex flex-col gap-4">
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
      <footer
        className="flex items-center justify-between border-t border-bdr pt-[0.7rem] gap-2"
        style={{ fontSize: "0.63rem" }}
      >
        <span className="text-muted">
          © {new Date().getFullYear()} screentimer
        </span>
        <span className="text-muted opacity-55 flex items-center gap-1" style={{ fontSize: "0.59rem" }}>
          <Info size={9} />
          Sumber: AOA &amp; ScienceDirect
        </span>
      </footer>

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.key}
          className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 pointer-events-none z-50"
          role="alert"
        >
          <div
            className={`rounded border p-3 shadow-2xl ${
              toast.variant === "warning"
                ? "bg-warn/10 border-warn/40 text-warn"
                : "bg-surface border-bdr text-content"
            }`}
          >
            <p className="font-semibold" style={{ fontSize: "0.74rem" }}>
              {toast.title}
            </p>
            <p className="text-muted mt-0.5" style={{ fontSize: "0.63rem" }}>
              {toast.body}
            </p>
          </div>
        </div>
      )}

      {/* Notification permission banner (sticky footer) */}
      <div className="fixed bottom-0 left-0 right-0">
        <NotifBanner permission={permission} onRequest={request} />
      </div>
    </div>
  );
}
