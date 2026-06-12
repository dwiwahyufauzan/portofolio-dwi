<script lang="ts">
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { Flame, FolderOpen, Eye, Wrench, ExternalLink } from "@lucide/svelte";

  const projects = [
    {
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

  function filtered() {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }

  function openModal(p: (typeof projects)[0]) {
    modalData = p;
    modalOpen = true;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
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
          Featured Work <Flame size={12} />
        </div>
        <h2 class="section-title">My Projects</h2>
      </div>
      <a
        href="https://github.com/dwiwahyufauzan"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-secondary"
        style="padding: 8px 18px; font-size: 0.75rem; text-transform: uppercase; font-family: var(--font-head); letter-spacing: 0.05em;"
      >
        All GitHub <FolderOpen
          size={14}
          style="margin-left: 6px; display: inline-block; vertical-align: middle;"
        />
      </a>
    </div>

    <!-- Filter bar -->
    <div class="filter-bar reveal reveal-slide-left">
      {#each filters as f}
        <button
          class="filter-btn"
          class:active={activeFilter === f}
          onclick={() => (activeFilter = f)}
        >
          {f}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="proj-grid">
      {#each filtered() as p, i (p.title)}
        <div
          animate:flip={{ duration: 400 }}
          transition:scale={{ duration: 300, start: 0.95 }}
          class="proj-card reveal reveal-zoom-in"
          class:featured={i === 0}
          role="button"
          tabindex="0"
          onclick={() => openModal(p)}
          onkeydown={(e) => e.key === "Enter" && openModal(p)}
        >
          <div class="proj-img-wrap">
            <img src={p.image} alt={p.title} loading="lazy" />
            <span class="proj-cat-badge">{p.category}</span>
            <div class="proj-overlay">
              <button class="proj-view-btn">
                View Project <Eye
                  size={14}
                  style="margin-left: 6px; display: inline-block; vertical-align: middle;"
                />
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

<!-- ═══ MODAL ═══ -->
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
      <button class="modal-close" onclick={closeModal} aria-label="Close"
        >✕</button
      >
      <img class="modal-img" src={modalData.image} alt={modalData.title} />
      <div class="modal-body">
        <span class="modal-cat">{modalData.category}</span>
        <h2 class="modal-title">{modalData.title}</h2>
        <p class="modal-desc">{modalData.description}</p>
        <div class="modal-challenge">
          <div
            class="challenge-label"
            style="display: flex; align-items: center; gap: 6px;"
          >
            <Wrench size={14} /> Challenge Solved
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
              Live Demo <ExternalLink
                size={16}
                style="margin-left: 6px; display: inline-block; vertical-align: middle;"
              />
            </a>
          {/if}
          <a
            href={modalData.github}
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            Source Code <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              style="margin-left: 6px; display: inline-block; vertical-align: middle;"
              ><path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
              /></svg
            >
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Filter bar */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }
  .filter-btn {
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 99px;
    padding: 8px 20px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ink);
    background: transparent;
    cursor: pointer;
    box-shadow: none;
    transition:
      background 0.3s var(--ease),
      color 0.3s var(--ease),
      border-color 0.3s;
  }
  .filter-btn:hover {
    border-color: var(--ink);
    background: rgba(var(--ink-rgb), 0.05);
  }
  .filter-btn.active {
    background: var(--ink);
    color: var(--white);
    border-color: var(--ink);
  }

  /* Grid */
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  /* Card */
  .proj-card {
    background: var(--white);
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 0;
    overflow: hidden;
    box-shadow: none;
    cursor: pointer;
    transition:
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.4s,
      box-shadow 0.4s;
    display: flex;
    flex-direction: column;
  }
  .proj-card:hover {
    transform: scale(1.02) translateY(-4px);
    border-color: var(--ink);
    box-shadow: 0 12px 24px rgba(var(--ink-rgb), 0.08);
  }
  .proj-card.featured {
    grid-column: span 2;
  }

  /* Image */
  .proj-img-wrap {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: var(--bg-alt);
  }
  .proj-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease);
  }
  .proj-card:hover .proj-img-wrap img {
    transform: scale(1.05);
  }

  .proj-cat-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--ink) !important;
    color: var(--white);
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid var(--ink);
    border-radius: 99px;
    padding: 4px 12px;
    box-shadow: none;
    z-index: 2;
  }

  .proj-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: background 0.35s var(--ease);
    z-index: 1;
  }
  .proj-card:hover .proj-overlay {
    background: rgba(22, 21, 19, 0.85); /* Premium dark mask in both modes */
  }

  .proj-view-btn {
    background: #ffffff; /* White background */
    border: 1px solid #ffffff;
    border-radius: 99px;
    padding: 10px 24px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #000000; /* Black text */
    box-shadow: none;
    cursor: pointer;
    opacity: 0;
    transform: translateY(16px) scale(0.95);
    transition:
      opacity 0.3s var(--ease),
      transform 0.3s var(--ease),
      background-color 0.3s var(--ease),
      color 0.3s var(--ease);
  }
  .proj-view-btn:hover {
    background: transparent;
    color: #ffffff;
  }
  .proj-card:hover .proj-view-btn {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .proj-info {
    text-align: center;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.3s 0.05s var(--ease),
      transform 0.3s 0.05s var(--ease);
  }
  .proj-card:hover .proj-info {
    opacity: 1;
    transform: translateY(0);
  }
  .proj-info-title {
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff; /* Keep white text in both modes */
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }
  .proj-info-cat {
    font-size: 0.75rem;
    color: rgba(
      255,
      255,
      255,
      0.7
    ); /* Keep white translucent text in both modes */
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Body */
  .proj-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .proj-title {
    font-family: var(--font-head);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    position: relative;
    width: fit-content;
  }
  .proj-title::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .proj-card:hover .proj-title::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .proj-desc {
    font-size: 0.9rem;
    color: var(--ink);
    line-height: 1.6;
    font-weight: 500;
    margin-bottom: 20px;
    flex: 1;
  }
  .proj-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
  }
  .proj-chip {
    background: transparent;
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 99px;
    padding: 4px 12px;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
    box-shadow: none;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(22, 21, 19, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fade-in 0.25s ease;
  }
  .modal-box {
    background: var(--white);
    border: 1px solid var(--ink);
    border-radius: 0;
    box-shadow: none;
    max-width: 820px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modal-spring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  @keyframes modal-spring {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    65% {
      transform: scale(1.02) translateY(-4px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    background: var(--white);
    color: var(--ink);
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: none;
    transition: transform 0.3s var(--ease);
    z-index: 10;
  }
  .modal-close:hover {
    transform: rotate(90deg) scale(1.05);
  }
  .modal-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-bottom: 1px solid var(--ink);
    border-radius: 0;
  }
  .modal-body {
    padding: 32px;
  }
  .modal-cat {
    display: inline-block;
    background: var(--ink) !important;
    color: var(--white);
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid var(--ink);
    border-radius: 99px;
    padding: 4px 12px;
    box-shadow: none;
    margin-bottom: 16px;
  }
  .modal-title {
    font-family: var(--font-head);
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 16px;
  }
  .modal-desc {
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.6;
    margin-bottom: 24px;
    font-weight: 500;
  }
  .modal-challenge {
    background: rgba(var(--ink-rgb), 0.03);
    border: 1px solid rgba(var(--ink-rgb), 0.1);
    border-left: 4px solid var(--ink);
    border-radius: 0;
    padding: 16px 20px;
    margin-bottom: 24px;
  }
  .challenge-label {
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--ink);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }
  .modal-challenge p {
    font-size: 0.875rem;
    color: var(--ink);
    line-height: 1.6;
    font-weight: 500;
  }
  .modal-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }
  .modal-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .modal-actions :global(.btn-primary),
  .modal-actions :global(.btn-secondary) {
    font-family: var(--font-head);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  @media (max-width: 1024px) {
    .proj-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .proj-card.featured {
      grid-column: span 2;
    }
  }
  @media (max-width: 640px) {
    .proj-grid {
      grid-template-columns: 1fr;
    }
    .proj-card.featured {
      grid-column: span 1;
    }
    .modal-body {
      padding: 24px;
    }
  }
</style>
