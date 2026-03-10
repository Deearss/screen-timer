export type TimerMode = "kerja" | "mikro" | "istirahat";

export interface InstruksiItem {
  icon: string; // lucide icon name
  teks: string;
}

export interface ModeInstruksi {
  cls: TimerMode;
  judul: string;
  isi: InstruksiItem[];
}

export interface ModeConfig {
  label: string;
  badge: TimerMode;
  card: string;
  ring: string;
  instruksi: ModeInstruksi | null;
}

export interface TimerState {
  mode: TimerMode;
  sisa: number;   // detik tersisa
  total: number;  // total durasi mode ini (detik)
  menitKerja: number;
  sesiBlok: number;   // progress dalam 1 blok (0–3)
  totalSesi: number;
  totalBreak: number;
}

export interface ToastPayload {
  title: string;
  body: string;
  variant: "default" | "warning";
}
