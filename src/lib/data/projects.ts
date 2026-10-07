export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
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
    subtitle: "Online Course Platform",
    description:
      "Aplikasi kelas online interaktif untuk platform PZN yang menghubungkan ribuan siswa dengan streaming video terproteksi, kuis, dan modul belajar terintegrasi.",
    image:
      "https://i.pinimg.com/1200x/bd/d2/9f/bdd29fa21e8785e25fcce834d0ae46c5.jpg",
    stack: ["SvelteKit 5", "Svelte 5", "TypeScript", "Bun"],
    github: "",
    demo: "https://kelas.programmerzamannow.com",
    size: "large",
  },
  {
    id: "glamstitch",
    num: "02",
    title: "Glamstitch POS",
    subtitle: "Convection Point of Sale",
    description:
      "Aplikasi POS komprehensif untuk manajemen industri konveksi — pencatatan pesanan khusus, inventaris bahan bertingkat, dan cetak invoice struk otomatis.",
    image:
      "https://i.pinimg.com/736x/21/e5/0e/21e50ebbf29bff9b6b0598455bf4afc2.jpg",
    stack: ["SvelteKit 5", "Tailwind CSS 4", "TypeScript"],
    github: "",
    demo: "https://www.bisnislancar.id",
    size: "small",
  }
];
