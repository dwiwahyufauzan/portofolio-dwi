# ⚡ Dwisycoo — Premium Interactive Portfolio

[![Svelte 5](https://img.shields.io/badge/Svelte-5.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/docs/kit)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-1.x-fbf0e9?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://dwiwahyufauzan.github.io/portofolio-dwi/)

Selamat datang di repository personal portfolio saya. Website ini dibangun dengan fokus pada performa kilat, animasi interaktif bernilai seni tinggi (*high-end animations*), serta elemen interaktif unik seperti simulator retro game arcade.

🚀 **Live Demo:** [https://dwiwahyufauzan.github.io/portofolio-dwi/](https://dwiwahyufauzan.github.io/portofolio-dwi/)

---

## 🎨 Fitur Utama & Keunggulan Desain

Website ini didesain menggunakan pendekatan **Neo-Agency & Wireframe Cyber** yang bersih, rapi, dan penuh dengan transisi dinamis:

### 🌟 1. Parallax Hero Header
- **Split-Text Staggered Entrance**: Animasi teks nama yang meluncur naik secara bertahap pada loading pertama.
- **Mouse-Tracking Parallax**: Elemen kartu di belakang bergerak mengikuti arah pergerakan kursor mouse secara interaktif.
- **Weightless Floating Drift**: Kartu polaroid melayang secara acak di udara menggunakan CSS keyframes untuk kesan 3D.

### 🍱 2. Bento Grid About & Skills
- **Bento Box Layout**: Layout modern yang membagi informasi ke dalam kotak bento dengan rasio seimbang.
- **Rainbow Border Sweep**: Efek border gradien dinamis warna-warni yang berputar tanpa henti pada status ketersediaan kerja.
- **Micro-interactions**: Hover chip keterampilan (*skills*) membal memantul (*spring bounce*) dan berputar sedikit secara acak.

### 📁 3. Dynamic Projects Showcase
Menampilkan daftar proyek nyata yang telah saya kerjakan dengan detail deskripsi, tantangan teknis, serta tautan repositori/demo:
* **Programmer Zaman Now (PZN)** — Online Course Frontend & Backend
* **Glamstitch POS** — Convection Point of Sale Frontend
* **DP2KBP3A** — Sistem Pelaporan Kegiatan Lapangan Dinas Pemerintah
* **Sahabat Anak** — Platform Advokasi & Edukasi Sosial
* *Filter dinamis* instan berbasis animasi `animate:flip` Svelte untuk transisi pemfilteran kartu proyek tanpa *lag*.

### 🎮 4. Retro Arcade Cabinet Game (Coffee Break)
Game klasik Ular (*Snake*) yang diintegrasikan ke dalam simulator layar tabung CRT fiktif:
* **Sintesis Suara (AudioContext)**: Efek suara *chiptune* retro (musik latar, suara makan, fanfare saat lampaui rekor, serta efek kalah) yang dihasilkan secara langsung oleh web audio API tanpa memuat file audio statis (.mp3/.wav).
* **Speedometer Engine Boost**: Indikator persentase peningkatan kecepatan dinamis yang reaktif menggunakan Svelte derived state.
* **Canvas Shake & Particle Burst**: Guncangan layar pada canvas saat ular makan atau mati, dikombinasikan dengan efek pecahan partikel warna-warni secara real-time.
* **Mute Control**: Tombol mute/unmute audio dengan status ikon yang reaktif.

### 🌗 5. Liquid Morphing Dark Mode
* **Smooth Cross-fade Gradients**: Transisi perpindahan warna latar belakang tombol yang menggunakan metode *opacity overlay opacity* untuk menghindari patahan visual.
* **Spinning Icons**: Ikon matahari dan bulan berputar 180 derajat dan membesar secara elastis saat diaktifkan.
* **Active Squish**: Tombol geser (*thumb*) yang memanjang secara fleksibel (efek elastis cair) saat ditekan lama.

---

## 🛠️ Tech Stack & Perkakas

* **Framework**: [SvelteKit](https://svelte.dev/docs/kit) (Static SPA adapter) & [Svelte 5](https://svelte.dev) (Runes: `$state`, `$derived`, `$effect`)
* **Styling**: Vanilla CSS, Tailwind CSS v4, Google Fonts (Outfit & Plus Jakarta Sans)
* **Icons**: [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte)
* **Runtime & PM**: [Bun](https://bun.sh)
* **Deployment**: GitHub Actions + GitHub Pages

---

## ⚡ Struktur Kode Utama

```
src/
├── lib/
│   ├── actions/        # Kustom Svelte actions (misal countUp)
│   └── components/     # Komponen portofolio reusable
│       ├── About.svelte        # Bio bento grid
│       ├── Contact.svelte      # Form kontak dengan Web3Forms
│       ├── Footer.svelte       # Footer + live timezone clock
│       ├── Game.svelte         # Mesin game retro arcade & AudioContext
│       ├── Hero.svelte         # Header parallax interaktif
│       ├── Navbar.svelte       # Floating navbar + morphing dark mode
│       ├── Projects.svelte     # Galeri projek dengan modal & flip filter
│       └── Skills.svelte       # Tech stack chips & animas stat
├── routes/
│   ├── +layout.svelte          # Entry layout utama website
│   ├── +layout.ts              # Konfigurasi static prerender
│   ├── +page.svelte            # Halaman landing page gabungan
│   └── layout.css              # Custom design token & global CSS
└── svelte.config.js            # Konfigurasi static adapter & base path
```

---

## ⚙️ Cara Instalasi & Menjalankan Lokal

### Prasyarat

- Pastikan Anda sudah menginstal [Bun](https://bun.sh/) di komputer Anda.

### 1. Kloning Projek
```sh
git clone https://github.com/dwiwahyufauzan/portofolio-dwi.git
cd portofolio-dwi
```

### 2. Install Dependensi
```sh
bun install
```

### 3. Jalankan Development Server
```sh
bun run dev
```
Buka browser Anda di: **http://localhost:5173**

### 4. Build & Preview Hasil Produksi
```sh
# Build untuk file statis
bun run build

# Uji coba preview build lokal
bun run preview
```

---

## 🚢 Deployment Otomatis ke GitHub Pages

Projek ini sudah dikonfigurasi menggunakan GitHub Actions (`.github/workflows/deploy.yml`). 
Setiap kali Anda melakukan `git push` ke branch `main`, workflow akan otomatis berjalan untuk:
1. Membaca repositori dan menginstal dependensi menggunakan Bun.
2. Melakukan build statis dengan set `BASE_PATH=/portofolio-dwi`.
3. Mempublikasikan hasilnya ke branch `gh-pages`.

Website Anda akan terupdate otomatis di: **https://dwiwahyufauzan.github.io/portofolio-dwi/**

---

## 📄 Lisensi

Hak Cipta © 2026 Dwi Wahyu Fauzan. Dibuat dengan penuh dedikasi menggunakan Svelte 5.
