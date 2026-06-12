<script lang="ts">
  import { Wrench } from "@lucide/svelte";
  import { countUp } from "$lib/actions/countUp";

  const techGroups = [
    {
      label: "Frontend",
      color: "var(--blue)",
      chips: [
        {
          name: "SvelteKit",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
        },
        {
          name: "React.js",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "TypeScript",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "Tailwind CSS",
          bg: "#F0FDFA",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "HTML",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "JavaScript",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
      ],
    },
    {
      label: "Backend",
      color: "var(--green)",
      chips: [
        {
          name: "Node.js",
          bg: "#F0FDF4",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express.js",
          bg: "#FFFDE0",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "NestJS",
          bg: "#FFF0F6",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
        },
        {
          name: "Laravel",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        },
        {
          name: "Bun",
          bg: "#FFF0F6",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
        },
      ],
    },
    {
      label: "Database",
      color: "var(--orange)",
      chips: [
        {
          name: "MySQL",
          bg: "#FFF0F6",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        },
        {
          name: "PostgreSQL",
          bg: "#EFF6FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          bg: "#F0FDF4",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Redis",
          bg: "#FFF0F6",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        },
        {
          name: "Prisma ORM",
          bg: "#FAF5FF",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
        },
      ],
    },
    {
      label: "DevOps & Tools",
      color: "var(--purple)",
      chips: [
        {
          name: "Docker",
          bg: "#F0FDFA",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Git / GitHub",
          bg: "#FFF7ED",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "Linux / VPS",
          bg: "#FFFDE0",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
        },
        {
          name: "Figma",
          bg: "#FFF0F6",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        },
      ],
    },
  ];

  const stats = [
    { num: "1+", label: "Tahun Exp", bg: "var(--yellow)", color: "var(--ink)" },
    { num: "10+", label: "Projects", bg: "var(--pink)", color: "#fff" },
    { num: "15+", label: "Tech Stack", bg: "var(--teal)", color: "#fff" },
    { num: "100%", label: "Remote Ready", bg: "var(--green)", color: "#fff" },
  ];
</script>

<!-- ═══ SKILLS SECTION ═══ -->
<section id="skills" class="section section-alt">
  <div class="container">
    <!-- Header -->
    <div
      class="reveal reveal-zoom-out"
      style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:48px;"
    >
      <div>
        <div class="section-label">
          <Wrench size={12} /> Tech Stack
        </div>
        <h2 class="section-title">Tools & Technologies</h2>
      </div>
      <!-- mini stat pills -->
      <div class="stats-row">
        {#each stats as s}
          <div class="mini-stat">
            <span class="mini-num" use:countUp={s.num}>{s.num}</span>
            <span class="mini-lbl">{s.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Tech groups grid -->
    <div class="tech-groups">
      {#each techGroups as group, i}
        <div
          class="cartoon-card group-card reveal reveal-slide-up reveal-d{i + 1}"
        >
          <div class="group-header">
            <div class="group-dot"></div>
            <h3 class="group-label">{group.label}</h3>
          </div>
          <div class="chips">
            {#each group.chips as chip}
              <div class="tech-chip">
                <img
                  src={chip.icon}
                  alt={chip.name}
                  class="chip-icon"
                  loading="lazy"
                />
                {chip.name}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Tambahkan ini di bagian bawah <style> Anda */

  .chip-icon {
    width: 25px; /* Ubah angka ini sesuai selera, misalnya 18px, 20px, atau 24px */
    height: 25px; /* Pastikan nilainya sama dengan width agar ikon tidak gepeng */
    object-fit: contain;
    display: inline-block;
  }
  .stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .mini-stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px;
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 0;
    text-align: left;
    background: transparent;
    color: var(--ink);
    min-width: 120px;
    transition:
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.4s,
      color 0.4s;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .mini-stat::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--ink);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }
  .mini-stat:hover::before {
    transform: scaleY(1);
  }
  .mini-stat:hover {
    border-color: var(--ink);
    color: var(--white);
    transform: translateY(-4px);
  }
  .mini-num {
    font-family: var(--font-head);
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 4px;
  }
  .mini-lbl {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
  }

  .tech-groups {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .group-card {
    padding: 32px;
    background: var(--white);
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 0;
    box-shadow: none;
    transition: border-color 0.3s;
  }
  .group-card:hover {
    border-color: var(--ink);
  }

  .group-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }
  .group-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ink);
    flex-shrink: 0;
  }
  .group-label {
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .tech-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: var(--radius);
    padding: 8px 16px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
    background: transparent;
    transition:
      transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      border-color 0.3s,
      background-color 0.3s,
      box-shadow 0.3s;
    cursor: default;
  }
  .tech-chip:hover {
    transform: translateY(-5px) scale(1.04) rotate(1deg);
    border-color: var(--ink);
    background-color: rgba(var(--ink-rgb), 0.03);
    box-shadow: 0 6px 12px rgba(var(--ink-rgb), 0.06);
  }

  @media (max-width: 768px) {
    .tech-groups {
      grid-template-columns: 1fr;
    }
  }
</style>
