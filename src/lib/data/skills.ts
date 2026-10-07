export interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  name: string;
  desc: string;
  items: SkillItem[];
}

const dev = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
const si = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`;

export const skillsCategories: SkillCategory[] = [
  {
    name: "Frontend",
    desc: "Antarmuka & pengalaman pengguna",
    items: [
      { name: "JavaScript (ES6+)", level: 92, icon: dev("javascript") },
      { name: "TypeScript", level: 88, icon: dev("typescript") },
      { name: "SvelteKit 5", level: 92, icon: dev("svelte") },
      { name: "React.js", level: 80, icon: dev("react") },
      { name: "HTML5 / CSS3", level: 95, icon: dev("html5") },
      { name: "Tailwind CSS", level: 90, icon: dev("tailwindcss") },
      { name: "Bootstrap", level: 85, icon: dev("bootstrap") },
    ],
  },
  {
    name: "Backend",
    desc: "Server, API & autentikasi",
    items: [
      { name: "PHP", level: 86, icon: dev("php") },
      { name: "Laravel", level: 88, icon: dev("laravel") },
      { name: "Node.js", level: 90, icon: dev("nodejs") },
      { name: "Express.js", level: 82, icon: dev("express") },
      { name: "Elysia (Bun)", level: 85, icon: si("elysia") },
      { name: "Spring Boot", level: 85, icon: dev("spring") },
      {
        name: "REST API & GraphQL",
        level: 90,
        icon: dev("graphql", "plain"),
      },
      { name: "JWT / Auth", level: 85, icon: si("jsonwebtokens") },
    ],
  },
  {
    name: "Database",
    desc: "Penyimpanan & manajemen data",
    items: [
      { name: "MySQL", level: 86, icon: dev("mysql") },
      { name: "PostgreSQL", level: 82, icon: dev("postgresql") },
      { name: "Redis", level: 75, icon: dev("redis") },
      { name: "Drizzle ORM", level: 88, icon: si("drizzle") },
      { name: "Prisma ORM", level: 78, icon: dev("prisma") },
    ],
  },
  {
    name: "Tools & DevOps",
    desc: "Workflow, build & deployment",
    items: [
      { name: "Git & GitHub", level: 92, icon: dev("git") },
      { name: "Docker", level: 84, icon: dev("docker") },
      { name: "Vite.js", level: 88, icon: dev("vitejs") },
      { name: "Jenkins", level: 85, icon: dev("jenkins") },
    ],
  },
];
