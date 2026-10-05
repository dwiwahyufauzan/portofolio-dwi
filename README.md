# ⚡ Dwi Wahyu Fauzan — Premium Editorial Portfolio

[![Svelte 5](https://img.shields.io/badge/Svelte-5.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/docs/kit)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-1.x-fbf0e9?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://dwiwahyufauzan.github.io/portofolio-dwi/)

Selamat datang di repositori personal portfolio **Dwi Wahyu Fauzan** (Fullstack Software Engineer). Website ini dirancang dengan gaya **Editorial Neo-Agency** yang mengombinasikan tipografi kontras tinggi, palet monokromatik bersih, mikro-interaksi responsif, dan performa tinggi berkecepatan kilat.

🚀 **Live Website:** [https://dwiwahyufauzan.github.io/portofolio-dwi/](https://dwiwahyufauzan.github.io/portofolio-dwi/)

---

## 🎨 Fitur Utama & Pengalaman Pengguna

### 🌟 1. Cinematic Hero Header
* **Cinematic Visual**: Latar belakang bernuansa artistik gelap dengan tipografi tebal dan aksen miring (*Instrument Serif*).
* **3D Rotating Emblem**: Elemen emblem berputar 3D secara kontinu dengan keyframes presisi.
* **Smart Navbar**: Bilah navigasi transparan saat di hero section dan otomatis berubah menjadi *frosted glass* saat di-scroll.

### 🔍 2. About & Spotlight Lens Reveal
* **Interactive Mask Reveal**: Lapisan foto tersembunyi (*katana layer*) yang diungkap menggunakan *radial gradient mask* halus yang mengikuti kursor mouse secara *lerped* (smooth interpolation).
* **Direct CV Download**: Tautan instan untuk mengunduh resume PDF resmi (`CV-DwiWahyuFauzan.pdf`).
* **Core Technology Badges**: Lencana teknologi utama dengan logo resmi beresolusi tajam.

### ⚡ 3. Categorized Tech Stack Grid
* **Pengelompokan 4 Pilar**: Frontend, Backend, Database, serta Tools & DevOps.
* **Animated Progress Track**: Pengukur tingkat kemahiran dengan transisi *spring-reveal* saat memasuki viewport.
* **Single Source of Truth**: Struktur data terpusat dan ber-tipe ketat di [`src/lib/data/skills.ts`](src/lib/data/skills.ts).

### 📁 4. Selected Work Showcase & Interactive Physics
* **Proyek Nyata**:
  1. **Programmer Zaman Now (PZN)** — Platform kelas daring Frontend (SvelteKit 5, TypeScript).
  2. **Glamstitch POS** — Sistem Point of Sale konveksi (SvelteKit, Tailwind CSS).
  3. **DP2KBP3A System** — Backend pelaporan dinas pemerintah (Elysia Bun, Drizzle ORM, MySQL).
  4. **Sahabat Anak** — Perancangan UX dan antarmuka web edukasi sosial.
* **Interactive Drag & Throw Physics**: Ikon-ikon teknologi berjatuhan di latar belakang yang dapat di-klik, diseret (*drag*), dan dilempar (*throw*) dengan kalkulasi kecepatan (*velocity*), gravitasi, dan gesekan real-time.
* **Instant Category Filter**: Pemfilteran instan antar kategori (*Web App, Mobile, Backend, UI/UX*).

### 🗺️ 5. Project Roadmap (5-Stage Fluid Wave)
* **Fluid Wave Canvas**: Alur kerja berurutan dari *Requirement*, *Design*, *Development*, *Testing*, hingga *Deployment*.
* **Interactive Checkpoint Drawer**: Panel detail geser (*slide drawer*) yang menampilkan deliverable, estimasi durasi, dan perkakas teknis tiap fase kerja.

### 🌐 6. Circular Socials Network
* **Kinetic Windmill Network**: Diagram orbit melingkar yang berputar lembut dengan logo sosial yang melakukan *counter-rotation* agar selalu tegak lurus.
* **Aksesibilitas Penuh**: Dilengkapi perlindungan `prefers-reduced-motion` untuk kenyamanan pengguna sensitif gerakan.

### 📮 7. Direct Contact & Marquee Footer
* **Direct Reach**: Tautan langsung email dan sosial terverifikasi.
* **Infinite Editorial Marquee**: Teks *PORTFOLIO* raksasa monokromatik berputar tanpa henti dengan efek interaktif *ink-fill* saat disentuh/hover.

---

## 🛠️ Tech Stack & Perkakas

* **Framework**: [SvelteKit 2](https://svelte.dev/docs/kit) (Static SPA Adapter)
* **Reactivity Engine**: [Svelte 5](https://svelte.dev) Runes (`$state`, `$derived`, `$props`)
* **Styling**: Tailwind CSS v4 & Custom CSS Editorial Design Tokens
* **Typography**: Google Fonts (*Plus Jakarta Sans*, *Instrument Serif*, *JetBrains Mono*)
* **Icons**: [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte)
* **Runtime & Package Manager**: [Bun](https://bun.sh)
* **Testing**: [Vitest](https://vitest.dev)
* **Deployment**: GitHub Actions + GitHub Pages

---

## ⚡ Struktur Direktori

```
src/
├── lib/
│   ├── assets/         # Aset grafis, logo, dan wallpaper
│   ├── components/     # Komponen Svelte 5 modular
│   │   ├── About.svelte      # Bio, tech tags, & interactive spotlight mask
│   │   ├── Contact.svelte    # Saluran kontak langsung & media sosial
│   │   ├── Footer.svelte     # Footer hak cipta & marquee raksasa
│   │   ├── Hero.svelte       # Header sinematik & 3D rotating emblem
│   │   ├── Navbar.svelte     # Floating header & mobile drawer
│   │   ├── Projects.svelte   # Galeri proyek & interactive physics logos
│   │   ├── Roadmap.svelte    # Peta rute 5 tahap & detail drawer
│   │   ├── Skills.svelte     # Grid keahlian 4 kategori & progress bar
│   │   └── Socials.svelte    # Kinetic windmill orbit diagram
│   └── data/           # Single source of truth data
│       ├── projects.ts       # Data proyek terpilih & interface
│       ├── skills.ts         # Data keahlian teknis & kategori
│       └── data.spec.ts      # Unit test validasi data
├── routes/
│   ├── +layout.svelte        # Shell layout, metadata SEO & scroll bar
│   ├── +layout.ts            # Konfigurasi prerender statis
│   ├── +page.svelte          # Halaman utama (one-page portfolio)
│   └── layout.css            # Token desain global, typography & reset
└── static/
    ├── cv.pdf                # Berkas resume resmi yang siap diunduh
    ├── favicon.png           # Favicon branding
    └── robots.txt            # Konfigurasi crawler mesin pencari
```

---

## ⚙️ Menjalankan di Komputer Lokal

### 1. Kloning Repositori
```sh
git clone https://github.com/dwiwahyufauzan/portofolio-dwi.git
cd portofolio-dwi
```

### 2. Pasang Dependensi
```sh
bun install
```

### 3. Jalankan Mode Pengembangan
```sh
bun run dev
```
Akses di peramban Anda: `http://localhost:5173`

### 4. Uji Coba & Pengecekan Tipe
```sh
# Menjalankan pengujian unit
bun run test

# Menjalankan type-check Svelte
bun run check
```

### 5. Kompilasi Produksi (Static Build)
```sh
bun run build
bun run preview
```

---

## 📄 Lisensi

Hak Cipta © 2026 **Dwi Wahyu Fauzan**. Seluruh hak cipta dilindungi undang-undang.
