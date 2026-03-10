import type { ModeConfig, TimerState } from "@/types/timer";

export const LS_KEY = "screentimer_state";
export const CIRC = 2 * Math.PI * 64; // SVG r=64 (viewBox 150x150)

export const PRESETS = [20, 25, 30, 45, 60, 120] as const;

export const MODE: Record<string, ModeConfig> = {
  kerja: {
    label: "Kerja",
    badge: "kerja",
    card: "kerja",
    ring: "kerja",
    instruksi: null,
  },
  mikro: {
    label: "Istirahat Mikro",
    badge: "mikro",
    card: "mikro",
    ring: "mikro",
    instruksi: {
      cls: "mikro",
      judul: "Istirahat mikro — 20 detik",
      isi: [
        { icon: "Eye",          teks: "Lihat sesuatu yang jauh (6m+)" },
        { icon: "DoorOpen",     teks: "Boleh keluar sebentar" },
        { icon: "BanIcon",      teks: "Jangan buka HP atau layar lain" },
      ],
    },
  },
  istirahat: {
    label: "Istirahat Panjang",
    badge: "istirahat",
    card: "istirahat",
    ring: "istirahat",
    instruksi: {
      cls: "istirahat",
      judul: "Istirahat panjang — 15 menit",
      isi: [
        { icon: "PersonStanding", teks: "Jalan kaki di luar, lihat jauh" },
        { icon: "Brain",          teks: "Boleh mikir coding, jangan lihat layar" },
        { icon: "Droplets",       teks: "Minum air, stretch punggung dan leher" },
      ],
    },
  },
};

export const DEFAULT_STATE: TimerState = {
  mode: "kerja",
  sisa: 30 * 60,
  total: 30 * 60,
  menitKerja: 30,
  sesiBlok: 0,
  totalSesi: 0,
  totalBreak: 0,
};
