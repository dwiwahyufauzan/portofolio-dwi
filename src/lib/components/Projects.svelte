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

  const techLogos = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  ];

  interface FallingLogo {
    id: number;
    src: string;
    x: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
    variant: number;

    isDragging?: boolean;
    isThrown?: boolean;
    posX?: number;
    posY?: number;
    vx?: number;
    vy?: number;
    rotation?: number;
  }

  let containerEl = $state<HTMLDivElement | null>(null);

  let fallingLogos = $state<FallingLogo[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      src: techLogos[i % techLogos.length],
      x: Math.floor(((i * 41 + 13) % 88) + 5),
      delay: i * 1.25,
      duration: 15 + ((i * 2.3) % 9),
      size: 48 + ((i * 7) % 24),
      opacity: 0.92,
      variant: (i % 3) + 1,

      isDragging: false,
      isThrown: false,
      posX: 0,
      posY: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
    })),
  );

  let activeDragId = $state<number | null>(null);
  let lastPointerX = 0;
  let lastPointerY = 0;
  let physicsRaf = 0;

  function handlePointerDown(e: PointerEvent, logo: FallingLogo) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    const target = e.currentTarget as HTMLElement;
    const itemRect = target.getBoundingClientRect();

    logo.isDragging = true;
    logo.isThrown = false;
    logo.posX = itemRect.left - rect.left;
    logo.posY = itemRect.top - rect.top;
    logo.vx = 0;
    logo.vy = 0;

    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    activeDragId = logo.id;

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  }

  function handlePointerMove(e: PointerEvent) {
    if (activeDragId === null) return;
    const logo = fallingLogos.find((l) => l.id === activeDragId);
    if (!logo) return;

    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;

    logo.vx = (logo.vx || 0) * 0.35 + dx * 0.65;
    logo.vy = (logo.vy || 0) * 0.35 + dy * 0.65;

    logo.posX = (logo.posX || 0) + dx;
    logo.posY = (logo.posY || 0) + dy;
    logo.rotation = (logo.rotation || 0) + dx * 0.7;

    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
  }

  function handlePointerUp() {
    if (activeDragId === null) return;
    const logo = fallingLogos.find((l) => l.id === activeDragId);
    if (logo) {
      logo.isDragging = false;
      const speed = Math.hypot(logo.vx || 0, logo.vy || 0);
      if (speed > 1.2) {
        logo.isThrown = true;
      }
    }
    activeDragId = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointercancel", handlePointerUp);
  }

  function runPhysicsLoop() {
    if (containerEl) {
      const cWidth = containerEl.clientWidth;
      const cHeight = containerEl.clientHeight;

      for (const logo of fallingLogos) {
        if (logo.isThrown && !logo.isDragging) {
          logo.posX = (logo.posX || 0) + (logo.vx || 0);
          logo.posY = (logo.posY || 0) + (logo.vy || 0);

          logo.vy = (logo.vy || 0) + 0.38; // gravity
          logo.vx = (logo.vx || 0) * 0.97; // friction
          logo.rotation = (logo.rotation || 0) + (logo.vx || 0) * 0.6;

          // If thrown outside bounds, reset throw state so it rejoins fall animation
          if (
            (logo.posY || 0) > cHeight + 150 ||
            (logo.posX || 0) < -200 ||
            (logo.posX || 0) > cWidth + 200
          ) {
            logo.isThrown = false;
          }
        }
      }
    }
    physicsRaf = requestAnimationFrame(runPhysicsLoop);
  }

  let activeFilter = $state("All");
  const filters = ["All", "Web App", "Mobile", "Backend", "UI/UX"];

  const filtered = $derived(
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter),
  );

  onMount(() => {
    physicsRaf = requestAnimationFrame(runPhysicsLoop);

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

    return () => {
      io.disconnect();
      cancelAnimationFrame(physicsRaf);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  });
</script>

<section id="projects" class="projects section section-alt">
  <!-- Irregular Lines Background Pattern -->
  <div class="irregular-lines-bg" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="projects-irregular-lines"
          width="260"
          height="260"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="30"
            x2="260"
            y2="230"
            stroke="currentColor"
            stroke-width="1.1"
            opacity="0.08"
          />
          <line
            x1="50"
            y1="0"
            x2="210"
            y2="260"
            stroke="currentColor"
            stroke-width="0.7"
            opacity="0.06"
          />
          <line
            x1="0"
            y1="190"
            x2="260"
            y2="60"
            stroke="currentColor"
            stroke-width="1.3"
            opacity="0.07"
          />
          <line
            x1="120"
            y1="0"
            x2="20"
            y2="260"
            stroke="currentColor"
            stroke-width="0.8"
            opacity="0.05"
          />
          <line
            x1="200"
            y1="0"
            x2="240"
            y2="260"
            stroke="currentColor"
            stroke-width="0.9"
            opacity="0.09"
          />
          <line
            x1="0"
            y1="120"
            x2="260"
            y2="140"
            stroke="currentColor"
            stroke-width="0.5"
            opacity="0.05"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#projects-irregular-lines)" />
    </svg>
  </div>

  <!-- Interactive Drag & Throw Falling Tech Logos Background Animation -->
  <div
    bind:this={containerEl}
    class="falling-tech-container"
    aria-hidden="true"
  >
    {#each fallingLogos as logo (logo.id)}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        role="button"
        tabindex="-1"
        class="falling-logo-item kite-anim-{logo.variant}"
        class:is-dragging={logo.isDragging}
        class:is-thrown={logo.isThrown}
        onpointerdown={(e) => handlePointerDown(e, logo)}
        style="
          left: {logo.isDragging || logo.isThrown
          ? (logo.posX || 0) + 'px'
          : logo.x + '%'};
          top: {logo.isDragging || logo.isThrown
          ? (logo.posY || 0) + 'px'
          : ''};
          transform: {logo.isDragging || logo.isThrown
          ? `rotate(${logo.rotation || 0}deg)`
          : ''};
          animation-delay: {logo.delay}s;
          animation-duration: {logo.duration}s;
          width: {logo.size}px;
          height: {logo.size}px;
          opacity: {logo.opacity};
        "
      >
        <img src={logo.src} alt="" draggable="false" loading="lazy" />
      </div>
    {/each}
  </div>
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
  /* ─── Section Base ────────────────────────────────────────── */
  .projects {
    position: relative;
    background: var(--bg-alt);
    overflow: hidden;
  }

  .projects :global(.container) {
    position: relative;
    z-index: 3;
  }

  .irregular-lines-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    color: var(--ink);
    opacity: 0.85;
    mask-image: radial-gradient(
      ellipse 90% 90% at 50% 50%,
      black 40%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 90% 90% at 50% 50%,
      black 40%,
      transparent 100%
    );
  }

  /* ─── Falling Tech Logos Background Animation (Interactive Physics) ─── */
  .falling-tech-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .falling-logo-item {
    position: absolute;
    top: -120px;
    user-select: none;
    touch-action: none;
    pointer-events: auto;
    cursor: grab;
    will-change: top, left, transform;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.22));
    transition:
      filter 0.2s ease,
      transform 0.1s ease;
  }

  .falling-logo-item:hover {
    filter: drop-shadow(0 10px 24px rgba(255, 255, 255, 0.4)) scale(1.12);
  }

  .falling-logo-item.is-dragging {
    animation: none !important;
    cursor: grabbing !important;
    z-index: 100 !important;
    filter: drop-shadow(0 14px 32px rgba(255, 255, 255, 0.6)) scale(1.22) !important;
  }

  .falling-logo-item.is-thrown {
    animation: none !important;
    z-index: 90 !important;
    transition: none !important;
  }

  .falling-logo-item.kite-anim-1 {
    animation: kite-fall-top-1 linear infinite;
  }
  .falling-logo-item.kite-anim-2 {
    animation: kite-fall-top-2 linear infinite;
  }
  .falling-logo-item.kite-anim-3 {
    animation: kite-fall-top-3 linear infinite;
  }

  .falling-logo-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* Variant 1: Animates top from -120px (Skills border) to 100% + 120px (Contact border) */
  @keyframes kite-fall-top-1 {
    0% {
      top: -120px;
      transform: translateX(0px) rotate(0deg);
    }
    25% {
      top: 25%;
      transform: translateX(65px) rotate(55deg);
    }
    50% {
      top: 50%;
      transform: translateX(-50px) rotate(-40deg);
    }
    75% {
      top: 75%;
      transform: translateX(55px) rotate(80deg);
    }
    100% {
      top: calc(100% + 120px);
      transform: translateX(-20px) rotate(360deg);
    }
  }

  /* Variant 2 */
  @keyframes kite-fall-top-2 {
    0% {
      top: -120px;
      transform: translateX(0px) rotate(0deg);
    }
    25% {
      top: 25%;
      transform: translateX(-70px) rotate(-60deg);
    }
    50% {
      top: 50%;
      transform: translateX(60px) rotate(45deg);
    }
    75% {
      top: 75%;
      transform: translateX(-45px) rotate(-85deg);
    }
    100% {
      top: calc(100% + 120px);
      transform: translateX(35px) rotate(-360deg);
    }
  }

  /* Variant 3 */
  @keyframes kite-fall-top-3 {
    0% {
      top: -120px;
      transform: translateX(0px) rotate(0deg);
    }
    33% {
      top: 33%;
      transform: translateX(85px) rotate(110deg);
    }
    66% {
      top: 66%;
      transform: translateX(-65px) rotate(220deg);
    }
    100% {
      top: calc(100% + 120px);
      transform: translateX(45px) rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .falling-tech-container {
      display: none;
    }
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
