# screentimer — Project Context

## Deskripsi Singkat

**screentimer** adalah web app timer berbasis riset ilmiah yang dirancang khusus untuk programmer/coder agar mata tidak kelelahan akibat terlalu lama menatap layar. App ini mengatur siklus kerja dan istirahat secara otomatis.

**URL target:** `screentimer.netlify.app`

---

## Latar Belakang & Riset

Berdasarkan riset dari **AOA (American Optometric Association)** dan **ScienceDirect**:

- Risiko digital eye strain mulai muncul setelah **2+ jam menatap layar tanpa break**
- **66–69%** pengguna komputer reguler mengalami Computer Vision Syndrome (CVS)
- Skema break yang paling efektif berdasarkan studi: **30 menit kerja / 5 menit rest**
- Istirahat micro (20 detik) efektif untuk merelaksasi otot fokus mata (_accommodative muscle_)
- Recovery penuh setelah seharian coding membutuhkan **1–3 jam off-screen**

### Kenapa "Lihat Jauh" Saat Break?

Mata capek bukan semata karena cahaya, tapi karena **otot fokus (ciliary muscle) terus berkontraksi** untuk membaca teks jarak dekat. Istirahat yang benar = jauhkan fokus ke objek 6m+ agar otot balik ke posisi natural (relaksasi ke infinity). Scroll HP atau nonton YouTube **tidak dihitung** sebagai istirahat mata.

---

## Fitur

| Fitur              | Detail                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Timer kerja        | Bisa diatur: 20 / 25 / 30 / 45 / 60 / 120 menit                                            |
| Istirahat mikro    | Otomatis 20 detik setiap sesi kerja selesai                                                |
| Istirahat panjang  | Otomatis 15 menit setelah 4 sesi (≈ 2 jam kerja)                                           |
| Progress ring      | Visualisasi sisa waktu berbentuk ring SVG                                                  |
| Session dots       | 4 titik indikator progres menuju istirahat panjang                                         |
| Statistik          | Total menit fokus, jumlah istirahat, jumlah sesi                                           |
| Instruksi break    | Muncul otomatis saat mode istirahat aktif                                                  |
| Notifikasi browser | Minta permission, kirim notif saat timer selesai                                           |
| localStorage       | State disimpan otomatis, aman kalau tab ditutup dadakan                                    |
| Badge status       | Berubah sesuai mode: Kerja / Istirahat Mikro / Istirahat Panjang / Istirahat (saat paused) |
| Combobox lock      | Interval kerja tidak bisa diubah saat timer sedang berjalan                                |

---

## Alur Timer

```
[Kerja N menit]
      ↓ selesai
  sesiBlok < 4?
    ├── YA  → [Istirahat Mikro 20 detik] → [Kerja lagi]
    └── TIDAK → [Istirahat Panjang 15 menit] → [Kerja lagi, sesiBlok reset ke 0]
```

- 1 "blok" = 4 sesi kerja
- Setelah 4 sesi → istirahat panjang 15 menit
- Auto-mulai saat transisi antar mode (delay 700ms)

---

## State Management

State disimpan di `localStorage` dengan key `screentimer_state`.

```javascript
{
  mode: 'kerja' | 'mikro' | 'istirahat',
  sisa: Number,        // detik tersisa
  total: Number,       // total durasi mode ini (detik)
  menitKerja: Number,  // interval kerja yang dipilih user
  sesiBlok: Number,    // sesi dalam blok (0–3)
  totalSesi: Number,   // akumulasi total sesi sejak awal
  totalBreak: Number,  // akumulasi total break
}
```

Auto-save setiap 10 detik saat timer jalan + saat jeda/selesai.

---

## Struktur File

```
screentimer/
└── index.html    ← single file app (HTML + CSS + JS)
```

Single file, zero dependency, zero build step. Deploy langsung via Netlify Drop.

---

## Stack

### Versi Saat Ini (v1 — Single File)

- **HTML/CSS/JS** murni — tanpa framework
- **SVG** untuk progress ring
- **localStorage** untuk persistensi state
- **Notification API** untuk browser notification
- **Netlify** untuk hosting (drag & drop)

### Versi Berikutnya (v2 — Next.js)

| Kategori         | Teknologi                                            | Versi                  | Install                          |
| ---------------- | ---------------------------------------------------- | ---------------------- | -------------------------------- |
| Framework        | **Next.js**                                          | `16.1` (latest stable) | `npx create-next-app@latest`     |
| UI Components    | **ShadCN UI**                                        | latest                 | `npx shadcn@latest init`         |
| Styling          | **Tailwind CSS**                                     | `v4` (bukan v3)        | `npm install tailwindcss@latest` |
| State Management | **Zustand**                                          | `5.0.11`               | `npm install zustand`            |
| Icon             | **lucide-react** / **react-icons** / **FontAwesome** | latest                 | `npm install lucide-react`       |

> ⚠️ **Penting:** Pastikan install **Tailwind v4**, bukan v3. Keduanya beda cara setup-nya. Di v4 tidak ada `tailwind.config.js` — konfigurasi dilakukan langsung di CSS via `@theme`.

#### Setup Tailwind v4 di Next.js 16

```bash
npm install tailwindcss @tailwindcss/postcss
```

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #1c1b16;
  --color-surface: #242318;
  --color-accent: #d97757;
  --color-text: #e8e4d8;
  --color-muted: #6b6756;
}
```

#### Catatan Migrasi

- **Zustand** menggantikan state `S` yang saat ini dikelola manual di plain JS
- **localStorage** tetap dipakai untuk persistensi, diintegrasikan via Zustand middleware `persist`
- **ShadCN UI** untuk komponen Select, Button, Badge — di-override ke palet Claude via `@theme`
- **Notification API** tetap dipakai langsung, tidak perlu library tambahan

---

## Desain

Mengikuti `design-guide.md` (tema website Dier):

| Properti       | Nilai                                 |
| -------------- | ------------------------------------- |
| Font           | Inter (Google Fonts)                  |
| Background     | `#1C1B16` (warm dark brownish Claude) |
| Surface/card   | `#242318`                             |
| Accent/primary | `#D97757` (orange terracotta Claude)  |
| Teks utama     | `#e8e4d8` (warm white Claude)         |
| Teks muted     | `#6b6756`                             |
| Tema           | Dark mode only                        |
| Bahasa         | Indonesia                             |

### Ukuran Font

```css
/* Desktop: +50% dari standar browser → 24px */
html {
  font-size: 24px;
}

/* Mobile: +30% dari standar → 20.8px */
@media (max-width: 600px) {
  html {
    font-size: 20.8px;
  }
}
```

Semua ukuran teks dalam CSS **wajib pakai `rem`**, bukan `px`, agar ikut skala ini secara otomatis.

### Responsivitas

Website wajib responsive. Breakpoint standar:

```
Mobile  : ≤ 600px
Tablet  : 601–860px
Desktop : > 860px
```

### Warna per Mode

| Mode                       | Warna                           |
| -------------------------- | ------------------------------- |
| Kerja                      | Orange `#D97757`                |
| Istirahat Mikro            | Biru `#74b9ff`                  |
| Istirahat Panjang          | Kuning `#f0a04b`                |
| Urgent (10 detik terakhir) | Merah `#e05c5c` + animasi blink |

---

## To-Do / Ide Pengembangan

### Sudah Ada (v1)

- [ ] Suara notifikasi (ding) saat timer habis
- [ ] PWA (bisa diinstall di desktop/HP)
- [ ] Shortcut keyboard (Space = pause/resume, R = reset)

### Target v2 (Next.js)

#### 1. Timer Istirahat Otomatis

Saat ini hanya timer kerja yang punya countdown visual. Di v2, istirahat mikro (20 detik) dan istirahat panjang (15 menit) juga punya timer aktif yang berjalan otomatis, lalu otomatis balik ke timer kerja saat habis — loop terus sampai 4 sesi selesai.

Alur lengkap:

```
[Timer Kerja] → habis → [Timer Istirahat] → habis → [Timer Kerja] → ... → 4 sesi → [Timer Istirahat Panjang]
```

#### 2. Hapus Durasi Custom, Gunakan Preset Saja

Pilihan durasi kerja dan istirahat cukup dari combobox preset yang sudah tersedia — tidak ada input custom. Alasannya: durasi yang direkomendasikan sudah berbasis riset AOA, membiarkan user atur sendiri justru menghilangkan tujuan utama app ini.

#### 3. Statistik Harian dengan Supabase

Upgrade dari localStorage ke database cloud:

- **Auth**: Login via Google (Supabase Auth)
- **Database**: Supabase — menyimpan data statistik screen timer per user per hari
- **Data yang disimpan**: total menit fokus, jumlah sesi, jumlah break, tanggal

#### 4. Fitur Monitoring Screen Timer

Dashboard monitoring personal yang menampilkan histori dan tren penggunaan. Fitur ini hanya aktif setelah user login via Google — data dikaitkan ke akun user masing-masing.

---

## Sumber Riset

- AOA (American Optometric Association) — Digital Eye Strain guidelines
- ScienceDirect — "The impact of break schedules on digital eye strain symptoms" (2025)
- Healthline — 20-20-20 Rule research review
