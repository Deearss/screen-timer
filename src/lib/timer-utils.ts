import { CIRC } from "./constants";

/** Format detik ke "MM:SS" */
export function fmt(sec: number): string {
  return (
    String(Math.floor(sec / 60)).padStart(2, "0") +
    ":" +
    String(sec % 60).padStart(2, "0")
  );
}

/** Hitung stroke-dashoffset untuk SVG ring */
export function ringOffset(sisa: number, total: number): number {
  return CIRC * (1 - sisa / total);
}

/** Apakah timer dalam kondisi urgent (10 detik terakhir) */
export function isUrgent(sisa: number): boolean {
  return sisa <= 10 && sisa > 0;
}

/** Hitung total menit fokus saat ini (termasuk sesi yang sedang berjalan) */
export function calcFokusMenit(
  menitKerja: number,
  totalSesi: number,
  total: number,
  sisa: number,
  mode: string,
  running: boolean
): string {
  if (mode === "kerja" && running) {
    return menitKerja * totalSesi + Math.floor((total - sisa) / 60) + "m";
  }
  return menitKerja * totalSesi + "m";
}
