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
      { name: "JavaScript (ES6+)", level: 92, highlight: true },
      { name: "TypeScript", level: 88, highlight: true },
      { name: "Svelte / SvelteKit", level: 92, highlight: true },
      { name: "React.js", level: 80 },
      { name: "HTML5 / Modern CSS", level: 95 },
      { name: "TailwindCSS", level: 90 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "Backend & Systems",
    desc: "Arsitektur server, API berkecepatan tinggi, integrasi database, dan pengelolaan bisnis logika.",
    iconName: "Server",
    skills: [
      { name: "PHP", level: 86 },
      { name: "Laravel", level: 88, highlight: true },
      { name: "Node.js / Express", level: 90, highlight: true },
      { name: "RESTful API / GraphQL", level: 92 },
      { name: "PostgreSQL", level: 85, highlight: true },
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
      { name: "Docker", level: 84, highlight: true },
      { name: "Vite.js", level: 88 },
      { name: "Bun / npm", level: 92 },
      { name: "Vercel / Cloudflare", level: 88 },
      { name: "Postman / Insomnia", level: 90 },
    ],
  },
];
