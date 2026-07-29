<script lang="ts">
  import { onMount } from "svelte";

  const categories = [
    {
      name: "Frontend",
      items: [
        { name: "SvelteKit 5", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS 4", level: 90 },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "React", level: 72 },
      ],
    },
    {
      name: "Backend",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Elysia (Bun)", level: 88 },
        { name: "Express.js", level: 80 },
        { name: "REST API Design", level: 90 },
        { name: "JWT / Auth", level: 85 },
      ],
    },
    {
      name: "Database",
      items: [
        { name: "MySQL 8+", level: 86 },
        { name: "PostgreSQL", level: 78 },
        { name: "Drizzle ORM", level: 88 },
        { name: "Prisma ORM", level: 75 },
        { name: "Redis", level: 65 },
      ],
    },
    {
      name: "Tools & DevOps",
      items: [
        { name: "Git & GitHub", level: 92 },
        { name: "Docker", level: 68 },
        { name: "Linux / Bash", level: 72 },
        { name: "Bun Runtime", level: 85 },
        { name: "Vite / Vitest", level: 80 },
      ],
    },
  ];

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll("#skills .reveal")
      .forEach((el) => io.observe(el));

    // Animate bars
    const barIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bar = e.target as HTMLElement;
            const level = bar.dataset.level || "0";
            bar.style.setProperty("--target-w", level + "%");
            bar.classList.add("bar-animate");
            barIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll(".skill-bar").forEach((el) => barIO.observe(el));

    return () => {
      io.disconnect();
      barIO.disconnect();
    };
  });
</script>

<section id="skills" class="skills section">
  <!-- Background Image Layer -->
  <div class="skills-bg-layer" aria-hidden="true">
    <img
      src="https://images2.alphacoders.com/977/thumb-1920-977483.jpg"
      alt=""
      class="skills-bg-img"
      draggable="false"
    />
    <div class="skills-dark-overlay"></div>
  </div>

  <div class="container skills-container">
    <!-- Eyebrow -->
    <p class="section-eyebrow skills-eyebrow reveal">02 — Skills</p>

    <!-- Header Row -->
    <div class="skills-header reveal">
      <h2 class="section-title skills-title">Tech Stack.</h2>
      <p class="section-subtitle skills-subtitle">
        Alat dan teknologi yang saya gunakan untuk membangun produk digital
        berkualitas tinggi.
      </p>
    </div>

    <!-- Categories Grid -->
    <div class="skills-grid">
      {#each categories as cat, ci}
        <div class="skill-category reveal" style="--delay:{ci * 0.08}s">
          <h3 class="cat-name">{cat.name}</h3>
          <div class="skill-list">
            {#each cat.items as item, ii}
              <div class="skill-row">
                <div class="skill-info">
                  <span class="skill-name">{item.name}</span>
                  <span class="skill-pct">{item.level}%</span>
                </div>
                <div class="skill-track">
                  <div
                    class="skill-bar"
                    data-level={item.level}
                    style="--target-w: 0%"
                    aria-label="{item.name}: {item.level}%"
                    role="progressbar"
                    aria-valuenow={item.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ─── Section ─────────────────────────────────────────────── */
  .skills {
    position: relative;
    background: #080808;
    color: #ffffff;
    overflow: hidden;
  }

  /* ─── Background Layer ────────────────────────────────────── */
  .skills-bg-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  .skills-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    user-select: none;
  }

  .skills-dark-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  .skills-container {
    position: relative;
    z-index: 1;
  }

  /* ─── Typography & White Colors ───────────────────────────── */
  .skills-eyebrow {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .skills-eyebrow::after {
    background: rgba(255, 255, 255, 0.3) !important;
  }

  .skills-title {
    color: #ffffff !important;
  }

  .skills-subtitle {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  /* ─── Header ──────────────────────────────────────────────── */
  .skills-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 72px;
    align-items: end;
  }

  /* ─── Grid ────────────────────────────────────────────────── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .skill-category {
    padding: 48px 40px 48px 0;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    transition-delay: var(--delay, 0s);
  }
  .skill-category:last-child {
    border-right: none;
  }
  .skill-category + .skill-category {
    padding-left: 40px;
  }

  /* ─── Category Title ──────────────────────────────────────── */
  .cat-name {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ffffff !important;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* ─── Skill List ──────────────────────────────────────────── */
  .skill-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .skill-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skill-info {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .skill-name {
    font-family: var(--font-head);
    font-size: 0.88rem;
    font-weight: 500;
    color: #ffffff !important;
  }

  .skill-pct {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    color: #ffffff !important;
    letter-spacing: 0.06em;
  }

  /* ─── Skill Bar ───────────────────────────────────────────── */
  .skill-track {
    height: 2px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 2px;
    overflow: hidden;
  }

  .skill-bar {
    height: 100%;
    width: var(--target-w, 0%);
    background: #ffffff !important;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0s;
  }

  .skill-bar.bar-animate {
    transform: scaleX(1);
    transition: transform 0.8s var(--ease) calc(var(--i, 0) * 0.06s);
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .skills-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .skill-category {
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .skill-category:nth-child(odd) {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    .skill-category + .skill-category {
      padding-left: 0;
    }
    .skill-category:nth-child(even) {
      padding-left: 40px;
    }
  }

  @media (max-width: 768px) {
    .skills-header {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .skills-grid {
      grid-template-columns: 1fr;
    }
    .skill-category:nth-child(odd) {
      border-right: none;
    }
    .skill-category:nth-child(even) {
      padding-left: 0;
    }
    .skill-category {
      padding: 32px 0;
    }
  }
</style>
