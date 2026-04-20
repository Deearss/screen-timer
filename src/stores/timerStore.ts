import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_STATE, LS_KEY, MODE } from "@/lib/constants";
import { playBong } from "@/lib/sound";
import type { TimerMode, TimerState, ToastPayload } from "@/types/timer";

// ─── Store shape ─────────────────────────────────────────────────

interface TimerStore extends TimerState {
  running: boolean;

  // Internal tick state — NOT persisted
  _startTime: number | null;
  _startSisa: number | null;
  _tickHandle: ReturnType<typeof setInterval> | null;

  // Side-effect signals — consumed oleh TimerPage, lalu di-clear
  pendingToast: ToastPayload | null;
  didFinish: boolean;

  // Actions
  mulai: (isAuto?: boolean) => void;
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
      _tickHandle: null,

      // Side effects
      pendingToast: null,
      didFinish: false,

      // ── Actions ─────────────────────────────────────────────

      mulai(isAuto = false) {
        const { running, sisa, total, mode } = get();
        if (running) return;

        if (sisa === total && !isAuto) {
          playBong();
        }

        set({
          running: true,
          _startTime: Date.now(),
          _startSisa: sisa,
          ...(mode === "kerja" && { activeInstruksi: null }),
        });

        get()._tick(); // immediate update — no initial delay

        const handle = setInterval(() => get()._tick(), 250);
        set({ _tickHandle: handle });
      },

      jeda() {
        const { _tickHandle, _startTime, _startSisa } = get();
        if (_tickHandle) clearInterval(_tickHandle);

        let exactSisa = get().sisa;
        if (_startTime !== null && _startSisa !== null) {
          const elapsed = (Date.now() - _startTime) / 1000;
          exactSisa = Math.max(0, _startSisa - elapsed);
        }

        set({ running: false, _tickHandle: null, sisa: exactSisa });
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
          pendingToast: null,
          didFinish: false,
        });
      },

      gantiInterval(menit: number) {
        const { mode, running } = get();
        set({ menitKerja: menit });
        if (mode === "kerja" && !running) {
          get().setMode("kerja", menit === 0 ? 5 : menit * 60);
        }
      },

      setMode(mode: TimerMode, dur: number) {
        const { _tickHandle } = get();
        if (_tickHandle) clearInterval(_tickHandle);
        set({
          mode,
          total: dur,
          sisa: dur,
          activeInstruksi: MODE[mode]?.instruksi ?? null,
          running: false,
          _tickHandle: null,
          _startTime: null,
          _startSisa: null,
        });
      },

      clearSideEffects() {
        set({ pendingToast: null, didFinish: false });
      },

      // ── Internal ────────────────────────────────────────────

      _tick() {
        const { _startTime, _startSisa } = get();
        if (_startTime === null || _startSisa === null) return;

        const elapsed = (Date.now() - _startTime) / 1000;
        const newSisa = Math.max(0, _startSisa - elapsed);

        set({ sisa: newSisa });

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
            // Tidak menggunakan get().setMode("kerja", ...) untuk mempertahankan activeInstruksi dari istirahat
            const dur = get().menitKerja === 0 ? 5 : get().menitKerja * 60;
            const { _tickHandle } = get();
            if (_tickHandle) clearInterval(_tickHandle);
            set({
              mode: "kerja",
              total: dur,
              sisa: dur,
              activeInstruksi: MODE["istirahat"]?.instruksi ?? null,
              running: false,
              _tickHandle: null,
              _startTime: null,
              _startSisa: null,
            });
          } else {
            set({
              pendingToast: {
                title: "Istirahat mikro!",
                body: "1 menit — stretch, lihat sesuatu jauh. Jangan buka HP.",
                variant: "default",
              },
            });
            get().setMode("mikro", get().menitKerja === 0 ? 6 : 60);
            get()._autoMulai();
          }
        } else if (mode === "mikro") {
          set({
            pendingToast: {
              title: "Lanjut coding!",
              body: "Mata lo udah diistirahin. Gas balik kerja.",
              variant: "default",
            },
          });
          const { menitKerja } = get();
          get().setMode("kerja", menitKerja === 0 ? 5 : menitKerja * 60);
          get()._autoMulai();
        } else if (mode === "istirahat") {
          set({
            pendingToast: {
              title: "Siap lagi!",
              body: "15 menit habis. Mata lo harusnya udah recovery.",
              variant: "default",
            },
          });
          const { menitKerja } = get();
          get().setMode("kerja", menitKerja === 0 ? 5 : menitKerja * 60);
          get()._autoMulai();
        }
      },

      _autoMulai() {
        // Langsung start, as as auto
        get().mulai(true);
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
        activeInstruksi: state.activeInstruksi,
      }),
    },
  ),
);
