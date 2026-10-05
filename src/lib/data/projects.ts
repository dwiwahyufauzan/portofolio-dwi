export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: "Web App" | "Mobile" | "Backend" | "UI/UX";
  description: string;
  image: string;
  stack: string[];
  github: string;
  demo?: string;
  size?: "large" | "small";
}

export const projectsData: Project[] = [
  {
    id: "pzn",
    num: "01",
    title: "Programmer Zaman Now",
    subtitle: "Online Course Platform — Frontend",
    category: "Web App",
    description:
      "Aplikasi kelas online interaktif untuk platform PZN yang menghubungkan ribuan siswa dengan streaming video terproteksi, kuis, dan modul belajar terintegrasi.",
    image:
      "https://i.pinimg.com/1200x/bd/d2/9f/bdd29fa21e8785e25fcce834d0ae46c5.jpg",
    stack: ["SvelteKit 5", "Svelte 5", "TypeScript", "Bun"],
    github: "https://github.com/dwiwahyufauzan",
    demo: "https://web.kelas.programmerzamannow.com",
    size: "large",
  },
  {
    id: "glamstitch",
    num: "02",
    title: "Glamstitch POS",
    subtitle: "Convection Point of Sale",
    category: "Mobile",
    description:
      "Aplikasi POS komprehensif untuk manajemen industri konveksi — pencatatan pesanan khusus, inventaris bahan bertingkat, dan cetak invoice struk otomatis.",
    image:
      "https://i.pinimg.com/736x/21/e5/0e/21e50ebbf29bff9b6b0598455bf4afc2.jpg",
    stack: ["SvelteKit 5", "Tailwind CSS 4", "TypeScript"],
    github: "https://github.com/glamstitch/glamstitch.github.io",
    demo: "",
    size: "small",
  },
  {
    id: "dp2kbp3a",
    num: "03",
    title: "DP2KBP3A System",
    subtitle: "Field Activity Reporting",
    category: "Backend",
    description:
      "Sistem pelaporan kegiatan lapangan pemerintah dengan alur verifikasi bertingkat, integritas transaksi MySQL 8+, dan auth JWT terdistribusi.",
    image:
      "https://i.pinimg.com/736x/42/8f/b1/428fb1d0a30ed2ee1cd3d6957d06c3bf.jpg",
    stack: ["Elysia (Bun)", "Drizzle ORM", "MySQL 8+", "JWT"],
    github: "https://github.com/dwiwahyufauzan",
    demo: "",
    size: "small",
  },
  {
    id: "sahabat-anak",
    num: "04",
    title: "Sahabat Anak",
    subtitle: "Education & Charity Platform",
    category: "UI/UX",
    description:
      "Perancangan UX dan antarmuka web interaktif portal donasi dan advokasi edukasi sosial anak dengan pendekatan human-centered design.",
    image:
      "https://i.pinimg.com/736x/27/01/83/270183aaba377f63e529d91594d02a4e.jpg",
    stack: ["Figma", "SvelteKit", "Tailwind CSS"],
    github: "https://github.com/dwiwahyufauzan",
    demo: "",
    size: "large",
  },
];
