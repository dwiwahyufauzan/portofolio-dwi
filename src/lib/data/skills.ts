export interface SkillCategory {
  title: string;
  desc: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    desc: "Perancangan antarmuka yang presisi, responsif, dan interaktif dengan teknologi web terkini.",
    iconName: "Layout",
    skills: [
      { name: "Svelte / SvelteKit", level: 92, highlight: true },
      { name: "TypeScript", level: 88, highlight: true },
      { name: "HTML5 / Modern CSS", level: 95 },
      { name: "TailwindCSS", level: 90 },
      { name: "React.js", level: 85 },
    ],
  },
  {
    title: "Backend & Systems",
    desc: "Arsitektur server, API berkecepatan tinggi, integrasi database, dan pengelolaan bisnis logika.",
    iconName: "Server",
    skills: [
      { name: "Node.js / Express", level: 90, highlight: true },
      { name: "PostgreSQL", level: 85, highlight: true },
      { name: "RESTful API / GraphQL", level: 92 },
      { name: "Redis Caching", level: 80 },
      { name: "MongoDB", level: 82 },
    ],
  },
  {
    title: "Tools & Ecosystem",
    desc: "Alat pengembang, kontrol versi, deployment cloud, dan workflow CI/CD modern.",
    iconName: "Wrench",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 78 },
      { name: "Vite / Bun / npm", level: 92 },
      { name: "Vercel / Cloudflare", level: 88 },
      { name: "Postman / Insomnia", level: 90 },
    ],
  },
];
