<script lang="ts">
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { Flame, FolderOpen, Eye, Wrench, ExternalLink, Sparkles } from "@lucide/svelte";

  const projects = [
    {
      id: "pzn",
      title: "Programmer Zaman Now — Online Course Frontend & Backend",
      category: "Web App",
      catColor: "var(--blue)",
      description:
        "Aplikasi frontend kelas online untuk platform Programmer Zaman Now (PZN), menghubungkan ribuan siswa secara interaktif untuk belajar coding dengan materi komprehensif.",
      challenge:
        "Mengintegrasikan state management berbasis Svelte 5 Runes dengan endpoint API eksternal yang melayani modul belajar, streaming video, kuis, serta integrasi build deploy otomatis ke GitHub Pages.",
      image:
        "https://i.pinimg.com/1200x/bd/d2/9f/bdd29fa21e8785e25fcce834d0ae46c5.jpg",
      stack: ["SvelteKit", "Svelte 5", "Tailwind CSS 4", "TypeScript", "Bun"],
      github: "https://github.com/dwiwahyufauzan",
      demo: "https://web.kelas.programmerzamannow.com",
    },
    {
      id: "glamstitch",
      title: "Glamstitch POS — Convection Point of Sale Frontend",
      category: "Mobile",
      catColor: "var(--purple)",
      description:
        "Aplikasi frontend Point of Sale (POS) untuk manajemen konveksi Glamstitch, mencakup pencatatan pesanan kasir, manajemen inventaris bahan, dan cetak struk invoice secara real-time.",
      challenge:
        "Mendesain antarmuka kasir yang responsif (tablet & mobile-first) dengan performa render kilat menggunakan Svelte 5 Runes untuk mempercepat transaksi operasional.",
      image:
        "https://i.pinimg.com/736x/21/e5/0e/21e50ebbf29bff9b6b0598455bf4afc2.jpg",
      stack: ["SvelteKit 5", "Svelte 5", "Tailwind CSS 4", "TypeScript", "Bun"],
      github: "https://github.com/glamstitch/glamstitch.github.io",
      demo: "#",
    },
    {
      id: "dp2kbp3a",
      title: "DP2KBP3A — Sistem Pelaporan Kegiatan Lapangan",
      category: "Backend",
      catColor: "var(--green)",
      description:
        "Sistem informasi manajemen pelaporan kegiatan lapangan untuk Dinas Pengendalian Penduduk, Keluarga Berencana, Pemberdayaan Perempuan dan Perlindungan Anak (DP2KBP3A) untuk memantau, memverifikasi, dan merekap seluruh aktivitas operasional di lapangan.",
      challenge:
        "Merancang alur verifikasi laporan bertingkat (petugas, kepala bidang, pimpinan) dan rekapitulasi data demografis interaktif serta upload dokumentasi multi-format secara aman.",
      image:
        "https://i.pinimg.com/736x/42/8f/b1/428fb1d0a30ed2ee1cd3d6957d06c3bf.jpg",
      stack: ["SvelteKit 5", "Elysia (Bun)", "Drizzle ORM", "MySQL 8+", "JWT"],
      github: "https://github.com/dwiwahyufauzan",
      demo: "",
    },
    {
      id: "sahabat-anak",
      title: "Sahabat Anak — UI/UX & Platform Edukasi",
      category: "UI/UX",
      catColor: "var(--pink)",
      description:
        "Perancangan user experience dan antarmuka web interaktif portal Sahabat Anak untuk kegiatan sosial, donasi, dan advokasi anak jalanan.",
      challenge:
        "Membuat alur navigasi donasi yang sesimpel mungkin (3-click donation flow) untuk meningkatkan konversi donatur.",
      image:
        "https://i.pinimg.com/736x/ef/09/ff/ef09ffb049325a6151dd2f4d3204e482.jpg",
      stack: ["Figma", "UI Design", "User Flow", "Design System"],
      github: "https://github.com/dwiwahyufauzan",
      demo: "",
    },
  ];

  const filters = ["All", "Web App", "Backend", "UI/UX", "Mobile"];
  let activeFilter = $state("All");
  let modalOpen = $state(false);
  let modalData: (typeof projects)[0] | null = $state(null);

  // 3D Tilt Card state
  let cardRotations = $state<Record<string, { rx: number; ry: number }>>({});

  function handleCardMouseMove(e: MouseEvent, id: string) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -8; // Max 8 deg
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    cardRotations = { ...cardRotations, [id]: { rx, ry } };
  }

  function handleCardMouseLeave(id: string) {
    cardRotations = { ...cardRotations, [id]: { rx: 0, ry: 0 } };
  }

  function filtered() {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }

  import { sound } from "$lib/utils/audio";

  function setFilter(f: string) {
    sound.playClick();
    activeFilter = f;
  }

  function openModal(p: (typeof projects)[0]) {
    sound.playPop();
    modalData = p;
    modalOpen = true;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    sound.playClick();
    modalOpen = false;
    document.body.style.overflow = "";
  }

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });
</script>

<!-- ═══ PROJECTS SECTION ═══ -->
<section id="projects" class="section section-alt">
  <div class="container">
    <!-- Header -->
    <div
      class="reveal reveal-zoom-out"
      style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:32px;"
    >
      <div>
        <div class="section-label">
          Featured Showcase <Flame size={12} />
        </div>
        <h2 class="section-title">Karya & Portfolio Project</h2>
      </div>
      <a
        href="https://github.com/dwiwahyufauzan"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-secondary"
        style="padding: 8px 18px; font-size: 0.75rem; text-transform: uppercase; font-family: var(--font-head); letter-spacing: 0.05em;"
      >
        All GitHub Projects <FolderOpen size={14} style="margin-left: 6px; display: inline-block; vertical-align: middle;" />
      </a>
    </div>

    <!-- Filter bar -->
    <div class="filter-bar reveal reveal-slide-left">
      {#each filters as f}
        <button
          class="filter-btn"
          class:active={activeFilter === f}
          onclick={() => setFilter(f)}
          type="button"
        >
          {f}
        </button>
      {/each}
    </div>

    <!-- Project Grid with 3D Tilt -->
    <div class="proj-grid">
      {#each filtered() as p, i (p.title)}
        {@const rot = cardRotations[p.id] || { rx: 0, ry: 0 }}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          animate:flip={{ duration: 400 }}
          transition:scale={{ duration: 300, start: 0.95 }}
          class="proj-card animate-on-scroll anim-zoom"
          class:featured={i === 0}
          role="button"
          tabindex="0"
          onclick={() => openModal(p)}
          onmousemove={(e) => handleCardMouseMove(e, p.id)}
          onmouseleave={() => handleCardMouseLeave(p.id)}
          style="transform: perspective(1000px) rotateX({rot.rx}deg) rotateY({rot.ry}deg);"
        >
          <div class="proj-img-wrap">
            <div class="light-beam-sweep"></div>
            <img src={p.image} alt={p.title} loading="lazy" />
            <span class="proj-cat-badge" style="--cat-color: {p.catColor};">
              <Sparkles size={12} style="display:inline-block; vertical-align:middle; margin-right:4px;" />
              {p.category}
            </span>
            <div class="proj-overlay">
              <button class="proj-view-btn" type="button">
                Lihat Detail <Eye size={14} style="margin-left: 6px; display: inline-block; vertical-align: middle;" />
              </button>
              <div class="proj-info">
                <div class="proj-info-title">{p.title.split(" — ")[0]}</div>
                <div class="proj-info-cat">{p.category}</div>
              </div>
            </div>
          </div>

          <div class="proj-body">
            <h3 class="proj-title">{p.title}</h3>
            <p class="proj-desc">{p.description}</p>
            <div class="proj-chips">
              {#each p.stack as t}
                <span class="proj-chip">{t}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ LIGHTBOX MODAL ═══ -->
{#if modalOpen && modalData}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="modal-overlay"
    onclick={(e) => e.target === e.currentTarget && closeModal()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="modal-box">
      <button class="modal-close" onclick={closeModal} aria-label="Close" type="button">✕</button>
      <img class="modal-img" src={modalData.image} alt={modalData.title} />
      <div class="modal-body">
        <span class="modal-cat">{modalData.category}</span>
        <h2 class="modal-title">{modalData.title}</h2>
        <p class="modal-desc">{modalData.description}</p>
        <div class="modal-challenge">
          <div class="challenge-label" style="display: flex; align-items: center; gap: 6px;">
            <Wrench size={14} /> Tantangan & Solusi Teknikal
          </div>
          <p>{modalData.challenge}</p>
        </div>
        <div class="modal-chips">
          {#each modalData.stack as t}
            <span class="proj-chip">{t}</span>
          {/each}
        </div>
        <div class="modal-actions">
          {#if modalData.demo && modalData.demo !== "#"}
            <a
              href={modalData.demo}
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              Live Demo <ExternalLink size={16} style="margin-left: 6px; display: inline-block; vertical-align: middle;" />
            </a>
          {/if}
          <a
            href={modalData.github}
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            Source Code <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 6px; display: inline-block; vertical-align: middle;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── FILTER BAR ── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 36px;
  }

  .filter-btn {
    border: 1.5px solid var(--ink);
    border-radius: 10px;
    padding: 8px 20px;
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ink);
    background: transparent;
    cursor: pointer;
    box-shadow: 3px 3px 0 var(--ink);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }
  .filter-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--ink);
  }
  .filter-btn.active {
    background: var(--ink);
    color: var(--white);
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 rgba(var(--ink-rgb), 0.35);
  }

  /* ── PROJECT GRID ── */
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .proj-card {
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
    box-shadow: 4px 4px 0 var(--ink);
    display: flex;
    flex-direction: column;
  }

  .proj-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--ink);
  }



  /* Image Wrap & Light Beam */
  .proj-img-wrap {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: var(--bg);
  }

  .proj-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease-out);
  }
  .proj-card:hover .proj-img-wrap img {
    transform: scale(1.06);
  }

  /* Light-Beam Sweep Overlay */
  .light-beam-sweep {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    transform: skewX(-25deg);
    transition: left 0.8s var(--ease-out);
    z-index: 3;
    pointer-events: none;
  }
  .proj-card:hover .light-beam-sweep {
    left: 140%;
  }

  .proj-cat-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(var(--white-rgb, 255, 255, 255), 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--ink);
    padding: 4px 12px;
    border-radius: 99px;
    font-family: var(--font-head);
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink);
    z-index: 4;
  }

  .proj-overlay {
    position: absolute;
    inset: 0;
    background: rgba(var(--ink-rgb), 0.75);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    transition: opacity 0.3s var(--ease-out);
    z-index: 5;
  }
  .proj-card:hover .proj-overlay {
    opacity: 1;
  }

  .proj-view-btn {
    background: var(--white);
    color: var(--ink);
    border: 1px solid var(--ink);
    border-radius: 99px;
    padding: 10px 22px;
    font-family: var(--font-head);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s var(--ease-out);
  }
  .proj-view-btn:hover {
    transform: scale(1.05);
  }

  .proj-info {
    text-align: center;
    color: var(--white);
    padding: 0 16px;
  }
  .proj-info-title {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 800;
    margin-bottom: 2px;
  }
  .proj-info-cat {
    font-size: 0.75rem;
    opacity: 0.75;
  }

  /* Body */
  .proj-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .proj-title {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 8px;
    line-height: 1.35;
  }
  .proj-desc {
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--ink);
    opacity: 0.75;
    margin-bottom: 20px;
    flex: 1;
  }

  .proj-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .proj-chip {
    background: rgba(var(--ink-rgb), 0.04);
    border: 1px solid rgba(var(--ink-rgb), 0.1);
    padding: 4px 10px;
    border-radius: 99px;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--ink);
  }

  /* ── MODAL LIGHTBOX ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(var(--ink-rgb), 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal-box {
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 28px;
    max-width: 680px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 8px 8px 0 var(--ink);
    animation: modal-pop 0.3s var(--ease-drawer);
  }
  @keyframes modal-pop {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--white);
    border: 1.5px solid var(--ink);
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s var(--ease-out);
  }
  .modal-close:hover {
    transform: scale(1.1);
  }

  .modal-img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-bottom: 1.5px solid var(--ink);
  }

  .modal-body {
    padding: 28px;
  }
  .modal-cat {
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink);
    opacity: 0.5;
    margin-bottom: 6px;
    display: block;
  }
  .modal-title {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--ink);
    margin-bottom: 12px;
    line-height: 1.3;
  }
  .modal-desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
    opacity: 0.85;
    margin-bottom: 20px;
  }

  .modal-challenge {
    background: rgba(var(--ink-rgb), 0.03);
    border: 1px solid rgba(var(--ink-rgb), 0.12);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }
  .challenge-label {
    font-family: var(--font-head);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .modal-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  .modal-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  /* Responsive Media Queries */
  @media (max-width: 1024px) {
    .proj-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 640px) {
    .proj-grid {
      grid-template-columns: 1fr;
    }
    .modal-actions {
      flex-direction: column;
      width: 100%;
    }
    .modal-actions a {
      width: 100%;
      justify-content: center;
    }
  }
</style>
