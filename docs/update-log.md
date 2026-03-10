# Log Pembaruan Screen Timer

Dokumen ini berisi daftar pembaruan fitur, perbaikan bug, dan penyesuaian UI yang telah diselesaikan pada proyek Screen Timer.

## 🎨 Penyesuaian Styling UI

- **Penyelarasan Desain:** Styling Next.js telah dirombak penuh agar sesuai secara piksel dan presisi dengan referensi (`referensi.html`).
- **Tema & Warna Global:** Penyesuaian variabel CSS dari file referensi telah diintegrasikan ke dalam `globals.css` untuk akurasi tema warna komponen.
- **Komponen & Layout:** Gaya tata letak (layout) dan elemen-elemen seperti `TimerHeader`, `TimerBadge`, `IntervalSelect`, kotak timer (`TimerCard`), `ProgressRing`, baris statistik (`StatsRow`), hingga instruksi istirahat (`BreakInstructions`) sudah dipertajam dan dipoles sesuai _mockup_.
- **Perbaikan Linter:** Peringatan linter Tailwind CSS (`warning`) di seluruh proyek telah diatasi.
- **Perbesaran Ikon:** Ukuran seluruh ikon SVG interaktif pada tombol kontrol, baris statistik, dan instruksi istirahat telah diperbarui dan diperbesar (_scaled-up_) agar proporsional dan lebih mudah dibaca/diklik.

## ✨ Fitur Tambahan & Penyesuaian Timer

- **Interval Testing:** Menambahkan _preset_ interval "Testing" yang memiliki waktu Kerja 5 detik dan Istirahat 2 detik, untuk keperluan uji coba (_debugging_) siklus timer dengan cepat tanpa perlu menunggu hitungan puluhan menit.
- **Default Interval:** Konfigurasi durasi waktu "Kerja" pada awal pemuatan aplikasi _default_ telah diubah dari 30 menit menjadi **20 menit**.
- **Efek Suara Real-time:** Menambahkan pemutaran _sound effect_ (`bong.mp3`) pada saat:
  1. Pengguna menekan tombol "Mulai" untuk pertama kalinya.
  2. Hitung mundur waktu Kerja maupun Istirahat telah selesai dan berpindah sesi.
- **Auto-Start Sesi Kerja:** Mengaktifkan mekanisme _autoplay_ di mana aplikasi akan langsung berpindah dan menghitung mundur interval "Kerja" secara otomatis tepat setelah interval Istirahat Mikro maupun Istirahat Panjang selesai (tanpa mengharuskan pengguna menekan Play lagi).
- **Auto-Stop saat Istirahat Panjang:** Saat siklus timer memasuki hitungan sesi ke-4 (Istirahat Panjang), auto-start dinonaktifkan sehingga hitungan tidak memaksa jalan ke waktu "Kerja" secara otomatis. Pengguna diberikan kendali penuh untuk memulai siklus kerja baru.
- **UX Reset Istirahat Panjang:** Setelah Istirahat Panjang habis durasinya, state _mode_ timer akan di-reset kembali secara _background_ ke mode "Kerja" Sesi 1. Meskipun disetel ke mode kerja, sistem akan tetap mempertahankan eksistensi elemen tampilan teks panduan Istirahat Panjang agar pengguna tetap dapat melihat instruksi rileks (hingga mereka dengan sengaja menekan Mulai).

## 🐛 Bugfix

- **Presisi Pause Timer:** Memperbaiki cacat/anomali penghitungan `sisa` interval waktu di mana timer terkadang melompat kembali / dibulatkan ke bawah jika dijeda (pause) pada waktu presisi _floating_ (misal: detik ke-1.5). Kini `Date.now()` dicatat dan dilacak dengan bilangan desimal akurat sehingga _resume_ akan selalu melanjutkan detik terakhir secara sempurna.
- **Pemulihan Rendering Instruksi:** Menuntaskan bug di mana teks _guidance_ istirahat menghilang secara mendadak saat logika _auto-reset_ disetel ke mode Kerja. Saat ini sistem memisahkan state `activeInstruksi` agar UI dapat ditahan sesuai jadwalnya.
