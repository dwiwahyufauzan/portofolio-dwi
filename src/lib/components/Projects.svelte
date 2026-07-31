<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowRight, ExternalLink } from "@lucide/svelte";

  const projects = [
    {
      id: "pzn",
      num: "01",
      title: "Programmer Zaman Now",
      subtitle: "Online Course Platform — Frontend",
      category: "Web App",
      description:
        "Aplikasi kelas online interaktif untuk platform PZN menghubungkan ribuan siswa dengan streaming video, kuis, dan modul belajar terintegrasi.",
      image:
        "https://i.pinimg.com/1200x/bd/d2/9f/bdd29fa21e8785e25fcce834d0ae46c5.jpg",
      stack: ["SvelteKit", "Svelte 5", "TypeScript", "Bun"],
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
        "Aplikasi POS untuk manajemen konveksi — pencatatan pesanan, inventaris bahan, dan cetak struk invoice secara real-time.",
      image:
        "https://i.pinimg.com/736x/21/e5/0e/21e50ebbf29bff9b6b0598455bf4afc2.jpg",
      stack: ["SvelteKit 5", "Tailwind CSS 4", "TypeScript"],
      github: "https://github.com/glamstitch/glamstitch.github.io",
      demo: "#",
      size: "small",
    },
    {
      id: "dp2kbp3a",
      num: "03",
      title: "DP2KBP3A System",
      subtitle: "Field Activity Reporting",
      category: "Backend",
      description:
        "Sistem pelaporan kegiatan lapangan dengan alur verifikasi bertingkat dan rekapitulasi data demografis interaktif.",
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
        "Perancangan UX dan antarmuka web interaktif portal donasi dan advokasi anak jalanan dengan pendekatan human-centered design.",
      image:
        "https://i.pinimg.com/736x/27/01/83/270183aaba377f63e529d91594d02a4e.jpg",
      stack: ["Figma", "SvelteKit", "Tailwind CSS"],
      github: "https://github.com/dwiwahyufauzan",
      demo: "",
      size: "large",
    },
  ];

  let activeFilter = $state("All");
  const filters = ["All", "Web App", "Mobile", "Backend", "UI/UX"];

  const filtered = $derived(
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter),
  );

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll("#projects .reveal")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<section id="projects" class="projects section section-alt">
  <div class="container">
    <!-- Eyebrow -->
    <p class="section-eyebrow reveal">03 — Projects</p>

    <!-- Header -->
    <div class="projects-header reveal">
      <h2 class="section-title">
        <span class="hl-block">Selected</span>
        <span class="hl-block hl-italic">Work.</span>
      </h2>
      <div class="projects-header-right">
        <p class="section-subtitle">
          Proyek-proyek terpilih yang mencerminkan kemampuan teknis dan
          pendekatan desain saya.
        </p>
        <a
          href="https://github.com/dwiwahyufauzan"
          target="_blank"
          rel="noopener noreferrer"
          class="see-all-link"
        >
          All Projects on GitHub
          <ArrowRight size={13} />
        </a>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar reveal">
      {#each filters as f}
        <button
          class="filter-btn"
          class:active={activeFilter === f}
          onclick={() => (activeFilter = f)}
          type="button"
        >
          {f}
        </button>
      {/each}
    </div>

    <!-- Project Grid -->
    <div class="projects-grid">
      {#each filtered as project, i (project.id)}
        <article class="project-card reveal" style="--delay:{i * 0.06}s">
          <!-- Image -->
          <div class="project-img-wrap">
            <img
              src={project.image}
              alt={project.title}
              class="project-img"
              loading="lazy"
            />
            <!-- Hover overlay -->
            <div class="project-hover-overlay" aria-hidden="true">
              <div class="project-hover-links">
                {#if project.demo && project.demo !== "#"}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link-btn"
                    onclick={(e) => e.stopPropagation()}
                  >
                    Live Demo <ExternalLink size={12} />
                  </a>
                {/if}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link-btn project-link-ghost"
                  onclick={(e) => e.stopPropagation()}
                >
                  GitHub <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="project-footer">
            <div class="project-info">
              <span class="project-num">{project.num}</span>
              <div>
                <h3 class="project-title">{project.title}</h3>
                <p class="project-subtitle">{project.subtitle}</p>
              </div>
            </div>
            <div class="project-stack">
              {#each project.stack.slice(0, 3) as tech}
                <span class="stack-tag">{tech}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ─── Section ─────────────────────────────────────────────── */
  .projects {
    background: var(--bg-alt);
  }

  /* ─── Header ──────────────────────────────────────────────── */
  .projects-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
    align-items: end;
  }

  .projects-header-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-self: end;
  }

  .see-all-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-2);
    text-decoration: none;
    transition:
      color 0.2s var(--ease),
      gap 0.2s var(--ease);
  }
  .see-all-link:hover {
    color: var(--ink);
    gap: 12px;
  }

  /* ─── Filter Bar ──────────────────────────────────────────── */
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
    flex-wrap: wrap;
  }

  .filter-btn {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 7px 18px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    color: var(--ink-2);
    background: transparent;
    cursor: pointer;
    transition:
      background 0.2s var(--ease),
      color 0.2s var(--ease),
      border-color 0.2s var(--ease);
  }

  .filter-btn:hover {
    border-color: var(--ink);
    color: var(--ink);
  }
  .filter-btn.active {
    background: var(--ink);
    color: var(--bg);
    border-color: var(--ink);
  }

  /* ─── Project Grid ────────────────────────────────────────── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }

  /* ─── Project Card ────────────────────────────────────────── */
  .project-card {
    background: var(--bg);
    overflow: hidden;
    cursor: pointer;
    transition-delay: var(--delay, 0s);
  }

  .project-card:hover .project-img {
    transform: scale(1.04);
  }
  .project-card:hover .project-hover-overlay {
    opacity: 1;
  }

  /* Image */
  .project-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: var(--bg-muted);
  }

  .project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s var(--ease);
  }

  /* Hover overlay */
  .project-hover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.55);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: flex-end;
    padding: 24px;
    opacity: 0;
    transition: opacity 0.3s var(--ease);
  }

  .project-hover-links {
    display: flex;
    gap: 10px;
  }

  .project-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 18px;
    border-radius: var(--radius-full);
    background: #fff;
    color: #111;
    border: none;
    transition:
      background 0.2s var(--ease),
      transform 0.2s var(--ease);
  }

  .project-link-btn:hover {
    transform: scale(1.04);
  }

  .project-link-ghost {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(6px);
  }
  .project-link-ghost:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  /* Card Footer */
  .project-footer {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    border-top: 1px solid var(--border);
  }

  .project-info {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .project-num {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: var(--ink-3);
    padding-top: 4px;
    flex-shrink: 0;
  }

  .project-title {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 3px;
  }

  .project-subtitle {
    font-size: 0.78rem;
    color: var(--ink-3);
    line-height: 1.4;
  }

  .project-stack {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .stack-tag {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--ink-3);
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .projects-header {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .project-footer {
      flex-direction: column;
      gap: 12px;
    }
    .project-stack {
      justify-content: flex-start;
    }
  }
</style>
