import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_STATE, LS_KEY } from "@/lib/constants";
import type { TimerMode, TimerState, ToastPayload } from "@/types/timer";

// ─── Store shape ─────────────────────────────────────────────────

interface TimerStore extends TimerState {
  running: boolean;

  // Internal tick state — NOT persisted
  _startTime: number | null;
  _startSisa: number | null;
  _lastSisa: number | null;
  _tickHandle: ReturnType<typeof setInterval> | null;

  // Side-effect signals — consumed oleh TimerPage, lalu di-clear
  pendingToast: ToastPayload | null;
  didFinish: boolean;

  // Actions
  mulai: () => void;
  jeda: () => void;
  reset: () => void;
  gantiInterval: (menit: number) => void;
  setMode: (mode: TimerMode, dur: number) => void;
  clearSideEffects: () => void;

  // Internal
  _tick: () => void;
  _selesai: () => void;
  _autoMulai: () => void;
}

// ─── Store ───────────────────────────────────────────────────────

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      // State
      ...DEFAULT_STATE,
      running: false,

      // Internal
      _startTime: null,
      _startSisa: null,
      _lastSisa: null,
      _tickHandle: null,

      // Side effects
      pendingToast: null,
      didFinish: false,

      // ── Actions ─────────────────────────────────────────────

      mulai() {
        const { running, sisa } = get();
        if (running) return;

        set({
          running: true,
          _startTime: Date.now(),
          _startSisa: sisa,
          _lastSisa: sisa + 1, // force first tick to process
        });

        get()._tick(); // immediate update — no initial delay

        const handle = setInterval(() => get()._tick(), 250);
        set({ _tickHandle: handle });
      },

      jeda() {
        const { _tickHandle } = get();
        if (_tickHandle) clearInterval(_tickHandle);
        set({ running: false, _tickHandle: null });
      },

      reset() {
        const { _tickHandle } = get();
        if (_tickHandle) clearInterval(_tickHandle);
        set({
          ...DEFAULT_STATE,
          running: false,
          _tickHandle: null,
          _startTime: null,
          _startSisa: null,
          _lastSisa: null,
          pendingToast: null,
          didFinish: false,
        });
      },

      gantiInterval(menit: number) {
        const { mode, running } = get();
        set({ menitKerja: menit });
        if (mode === "kerja" && !running) {
          get().setMode("kerja", menit * 60);
        }
      },

      setMode(mode: TimerMode, dur: number) {
        const { _tickHandle } = get();
        if (_tickHandle) clearInterval(_tickHandle);
        set({
          mode,
          total: dur,
          sisa: dur,
          running: false,
          _tickHandle: null,
          _startTime: null,
          _startSisa: null,
          _lastSisa: null,
        });
      },

      clearSideEffects() {
        set({ pendingToast: null, didFinish: false });
      },

      // ── Internal ────────────────────────────────────────────

      _tick() {
        const { _startTime, _startSisa, _lastSisa } = get();
        if (_startTime === null || _startSisa === null) return;

        const elapsed = Math.floor((Date.now() - _startTime) / 1000);
        const newSisa = Math.max(0, _startSisa - elapsed);

        // Skip if nothing changed
        if (newSisa === _lastSisa && newSisa > 0) return;
        set({ sisa: newSisa, _lastSisa: newSisa });

        if (newSisa <= 0) {
          const { _tickHandle } = get();
          if (_tickHandle) clearInterval(_tickHandle);
          set({ running: false, _tickHandle: null });
          get()._selesai();
        }
      },

      _selesai() {
        const { mode, sesiBlok, totalSesi, totalBreak } = get();
        set({ didFinish: true });

        if (mode === "kerja") {
          const newBlok = sesiBlok + 1;
          set({
            sesiBlok: newBlok,
            totalSesi: totalSesi + 1,
            totalBreak: totalBreak + 1,
          });

          if (newBlok >= 4) {
            set({
              sesiBlok: 0,
              pendingToast: {
                title: "Istirahat 15 menit!",
                body: "Udah 2 jam coding. Gas keluar, lihat jauh.",
                variant: "warning",
              },
            });
            get().setMode("istirahat", 15 * 60);
          } else {
            set({
              pendingToast: {
                title: "Istirahat mikro!",
                body: "20 detik — lihat sesuatu jauh. Jangan buka HP.",
                variant: "default",
              },
            });
            get().setMode("mikro", 20);
          }
          get()._autoMulai();

        } else if (mode === "mikro") {
          set({
            pendingToast: {
              title: "Lanjut coding!",
              body: "Mata lo udah diistirahin. Gas balik kerja.",
              variant: "default",
            },
          });
          const { menitKerja } = get();
          get().setMode("kerja", menitKerja * 60);

        } else if (mode === "istirahat") {
          set({
            pendingToast: {
              title: "Siap lagi!",
              body: "15 menit habis. Mata lo harusnya udah recovery.",
              variant: "default",
            },
          });
          const { menitKerja } = get();
          get().setMode("kerja", menitKerja * 60);
        }
      },

      _autoMulai() {
        // Langsung start, tidak ada delay
        get().mulai();
      },
    }),

    {
      name: LS_KEY,
      // Hanya persist data timer — jangan persist internal tick state
      partialize: (state) => ({
        mode: state.mode,
        sisa: state.sisa,
        total: state.total,
        menitKerja: state.menitKerja,
        sesiBlok: state.sesiBlok,
        totalSesi: state.totalSesi,
        totalBreak: state.totalBreak,
      }),
    }
  )
);
