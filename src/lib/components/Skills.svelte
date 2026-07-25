<script lang="ts">
  import { Wrench, Code2, Server, Database, Settings2, Zap } from "@lucide/svelte";
  import { countUp } from "$lib/actions/countUp";

  const techGroups = [
    {
      id: "frontend",
      label: "Frontend",
      subtitle: "UI & Client-Side Systems",
      Icon: Code2,
      accent: "#2563eb",
      span: "wide", // 2 cols on desktop
      chips: [
        { name: "SvelteKit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" },
        { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      subtitle: "API & Server Runtime",
      Icon: Server,
      accent: "#10b981",
      span: "normal",
      chips: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
        { name: "Bun", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg" },
      ],
    },
    {
      id: "database",
      label: "Database",
      subtitle: "Data & Persistence",
      Icon: Database,
      accent: "#f59e0b",
      span: "normal",
      chips: [
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
      ],
    },
    {
      id: "devops",
      label: "DevOps & Tools",
      subtitle: "Deploy & Workflow",
      Icon: Settings2,
      accent: "#8b5cf6",
      span: "wide", // 2 cols on desktop
      chips: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Git / GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "Linux VPS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      ],
    },
  ];

  const stats = [
    { num: "1+", label: "Tahun Exp" },
    { num: "10+", label: "Projects" },
    { num: "15+", label: "Tech" },
    { num: "100%", label: "Remote" },
  ];
</script>

<section id="skills" class="section section-alt">
  <div class="container">
    <!-- Section Header -->
    <div class="skills-header reveal reveal-zoom-out">
      <div>
        <div class="section-label"><Wrench size={12} /> Stack & Ekosistem</div>
        <h2 class="section-title">Tools & Teknologi</h2>
        <p class="section-desc">Teknologi yang saya kuasai untuk membangun produk digital dari ujung ke ujung.</p>
      </div>
      <div class="stats-pill-row">
        {#each stats as s}
          <div class="stat-pill">
            <span class="stat-pill-num" use:countUp={s.num}>{s.num}</span>
            <span class="stat-pill-lbl">{s.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Asymmetric Bento Grid -->
    <div class="bento-grid animate-on-scroll anim-in">
      {#each techGroups as group}
        <div class="bento-card bento-{group.span}">

          <!-- Header -->
          <div class="bento-card-header">
            <div class="bento-icon-wrap">
              <svelte:component this={group.Icon} size={20} />
            </div>
            <div class="bento-header-text">
              <h3 class="bento-title">{group.label}</h3>
              <span class="bento-subtitle">{group.subtitle}</span>
            </div>
          </div>

          <!-- Tech Icon Grid -->
          <div class="bento-icons-row">
            {#each group.chips as chip}
              <div class="bento-tech-item" title={chip.name}>
                <div class="bento-tech-icon-wrap">
                  <img
                    src={chip.icon}
                    alt={chip.name}
                    class="bento-tech-icon"
                    loading="lazy"
                  />
                </div>
                <span class="bento-tech-name">{chip.name}</span>
              </div>
            {/each}
          </div>

          <!-- Bottom count badge -->
          <div class="bento-footer">
            <Zap size={11} />
            <span>{group.chips.length} technologies</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ─── HEADER ─────────────────────────────────────────────────── */
  .skills-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 48px;
  }

  .section-desc {
    font-size: 0.95rem;
    color: var(--ink);
    opacity: 0.6;
    margin-top: 6px;
    max-width: 460px;
    line-height: 1.6;
  }

  .stats-pill-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .stat-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--white);
    border: 1.5px solid var(--ink);
    padding: 10px 18px;
    border-radius: 14px;
    min-width: 64px;
    box-shadow: 3px 3px 0 var(--ink);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }

  .stat-pill:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--ink);
  }

  .stat-pill-num {
    font-family: var(--font-head);
    font-size: 1.25rem;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
  }

  .stat-pill-lbl {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--ink);
    opacity: 0.55;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 2px;
  }

  /* ─── BENTO GRID ─────────────────────────────────────────────── */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 20px;
  }

  /* Wide cards span 2 columns */
  .bento-wide {
    grid-column: span 2;
  }

  /* ─── BENTO CARD ─────────────────────────────────────────────── */
  .bento-card {
    position: relative;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 24px;
    padding: 28px;
    overflow: hidden;
    box-shadow: 4px 4px 0 var(--ink);
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
  }

  .bento-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--ink);
  }


  /* ─── CARD HEADER ────────────────────────────────────────────── */
  .bento-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 1;
  }

  .bento-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: var(--ink);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .bento-header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .bento-title {
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--ink);
    line-height: 1.2;
  }

  .bento-subtitle {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--ink);
    opacity: 0.55;
  }

  /* ─── TECH ICON GRID ─────────────────────────────────────────── */
  .bento-icons-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    z-index: 1;
    flex: 1;
  }

  .bento-tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: default;
  }

  .bento-tech-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(var(--ink-rgb), 0.04);
    border: 1px solid rgba(var(--ink-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s var(--ease-out), border-color 0.2s, background 0.2s;
  }

  .bento-tech-item:hover .bento-tech-icon-wrap {
    transform: translateY(-4px) scale(1.05);
    border-color: var(--ink);
    background: rgba(var(--ink-rgb), 0.08);
    box-shadow: 0 4px 10px rgba(var(--ink-rgb), 0.12);
  }

  .bento-tech-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .bento-tech-name {
    font-family: var(--font-head);
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--ink);
    opacity: 0.7;
    text-align: center;
    white-space: nowrap;
    max-width: 54px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ─── CARD FOOTER ────────────────────────────────────────────── */
  .bento-footer {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--ink);
    opacity: 0.35;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    position: relative;
    z-index: 1;
    padding-top: 6px;
    border-top: 1px solid rgba(var(--ink-rgb), 0.08);
  }

  /* ─── RESPONSIVE ─────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .bento-wide {
      grid-column: span 2;
    }
  }

  @media (max-width: 600px) {
    .bento-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .bento-wide {
      grid-column: span 1;
    }
    .bento-card {
      padding: 22px 20px;
    }
    .skills-header {
      margin-bottom: 32px;
    }
    .stat-pill {
      padding: 8px 14px;
    }
  }
</style>
