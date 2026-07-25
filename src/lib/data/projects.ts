export interface Project {
  id: string;
  title: string;
  category: "Fullstack" | "Backend" | "Frontend" | "Mobile";
  desc: string;
  longDesc: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export const projectsData: Project[] = [
  {
    id: "dwisycoo-store",
    title: "Dwisycoo E-Commerce Platform",
    category: "Fullstack",
    desc: "Platform toko online modern berkecepatan tinggi dengan pembayaran otomatis, manajemen stok real-time, dan analitik dashboard.",
    longDesc: "Aplikasi e-commerce skala penuh yang dibangun menggunakan SvelteKit, PostgreSQL, dan Stripe/Midtrans integration. Dilengkapi fitur manajemen inventaris, sistem keranjang belanja interaktif, proteksi transaksi, serta dashboard analitik penjualan.",
    image: "https://images.unsplash.com/photo-1556742049-0a67568d0d9f?auto=format&fit=crop&w=1200&q=80",
    tags: ["SvelteKit", "TypeScript", "PostgreSQL", "TailwindCSS", "Stripe API"],
    demoUrl: "https://github.com/dwiwahyufauzan",
    githubUrl: "https://github.com/dwiwahyufauzan",
    featured: true,
    year: "2025",
  },
  {
    id: "taskflow-agile",
    title: "TaskFlow — Agile Project Manager",
    category: "Fullstack",
    desc: "Aplikasi manajemen tugas tim bergaya Kanban interaktif dengan drag-and-drop dan kolaborasi real-time.",
    longDesc: "Sistem manajemen proyek kolaboratif untuk tim pengembang software. Mendukung papan Kanban interaktif, kolaborasi websockets real-time, pengolahan dokumen markdown, serta statistik produktivitas anggota tim.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    demoUrl: "https://github.com/dwiwahyufauzan",
    githubUrl: "https://github.com/dwiwahyufauzan",
    featured: true,
    year: "2024",
  },
  {
    id: "nexus-api-gateway",
    title: "Nexus Microservice API Gateway",
    category: "Backend",
    desc: "Arsitektur API Gateway dengan autentikasi JWT, rate-limiting, Caching Redis, dan log monitoring terpusat.",
    longDesc: "High-performance API Gateway yang mampu menangani ribuan request per detik. Mengimplementasikan autentikasi JWT berkecepatan tinggi, rate limiting berbasis IP, caching Redis, dan tracing log terdistribusi.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "Express", "Redis", "Docker", "JWT"],
    demoUrl: "https://github.com/dwiwahyufauzan",
    githubUrl: "https://github.com/dwiwahyufauzan",
    featured: true,
    year: "2024",
  },
  {
    id: "zenith-ui-kit",
    title: "Zenith Design System & UI Kit",
    category: "Frontend",
    desc: "Kumpulan komponen UI Web ultra-ringan dengan aksesibilitas WCAG, animasi mikro, dan skema warna dinamis.",
    longDesc: "Sistem desain antarmuka berbasis web yang dibuat dengan pendekatan headless & modular. Menyediakan lebih dari 40+ komponen siap pakai dengan animasi ultra-smooth dan dukungan penuh aksesibilitas pembaca layar.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Svelte", "CSS Variables", "Storybook", "TypeScript"],
    demoUrl: "https://github.com/dwiwahyufauzan",
    githubUrl: "https://github.com/dwiwahyufauzan",
    featured: false,
    year: "2024",
  },
];
