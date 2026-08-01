<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import logoImg from "$lib/assets/logo.png";
  import roadmapBg from "$lib/assets/wallpaperflare.com_wallpaper.jpg";
  import {
    FileText,
    Palette,
    Code2,
    ShieldCheck,
    Rocket,
    CheckCircle2,
    MapPin,
    X,
  } from "@lucide/svelte";

  // Track active step index (null initially — opens ONLY on click).
  let activeStep = $state<number | null>(null);

  const steps = [
    {
      number: "01",
      station: "Checkpoint 01",
      title: "Requirement & Discovery",
      subtitle: "Analisis & Pendefinisian Kebutuhan",
      icon: FileText,
      tag: "Fase 1 — Perencanaan",
      duration: "1 - 2 Hari",
      image:
        "https://i.pinimg.com/736x/24/b5/ae/24b5ae20b8e1f14320e0d5572504a7a2.jpg",
      desc: "Titik awal proyek: Memahami visi proyek, kriteria bisnis, target pengguna, serta penentuan spesifikasi teknis dan ruang lingkup pengembangan secara presisi.",
      deliverables: [
        "Diskusi kriteria & tujuan bisnis",
        "Penyusunan PRD (Product Requirement Document)",
        "Pemilihan Tech Stack & Arsitektur Sistem",
        "Estimasi timeline & Scope of Work",
      ],
      tools: ["Brainstorming", "Technical Specs", "Architecture Plan"],
      pctX: 6,
      posY: 140,
      mobileX: 20,
      mobileY: 60,
    },
    {
      number: "02",
      station: "Checkpoint 02",
      title: "UI/UX Wireframing & Design",
      subtitle: "Perancangan Visual & Prototipe",
      icon: Palette,
      tag: "Fase 2 — Desain",
      duration: "2 - 4 Hari",
      image:
        "https://i.pinimg.com/1200x/74/e4/d0/74e4d059465158183b1625a8bc43964c.jpg",
      desc: "Menerjemahkan ide ke dalam wireframe intuitif, sistem desain (design system) yang konsisten, dan prototipe antarmuka interaktif berestetika tinggi.",
      deliverables: [
        "Wireframe struktur halaman & UX Flow",
        "Design System (Tipografi, Warna, Komponen)",
        "Prototipe antarmuka interaktif High-Fidelity",
        "Review & penyesuaian umpan balik",
      ],
      tools: ["Figma", "Design System", "Interactive Prototype"],
      pctX: 28,
      posY: 40,
      mobileX: 80,
      mobileY: 190,
    },
    {
      number: "03",
      station: "Checkpoint 03",
      title: "Engineering & Development",
      subtitle: "Pengembangan Frontend & Backend",
      icon: Code2,
      tag: "Fase 3 — Eksekusi",
      duration: "1 - 3 Minggu",
      image:
        "https://i.pinimg.com/1200x/7e/ca/65/7eca654f1944318335c1a995bafd28fe.jpg",
      desc: "Penulisan kode berskala produksi dengan clean architecture, integrasi API, pengolahan database, serta penerapan logika bisnis secara tepat.",
      deliverables: [
        "Pengembangan komponen UI modular & responsif",
        "Integrasi logika bisnis & database API",
        "Implementasi state management & sistem keamanan",
        "Review kode berkala & pembaruan progres",
      ],
      tools: ["SvelteKit / React", "TypeScript", "Node.js / Laravel"],
      pctX: 50,
      posY: 140,
      mobileX: 20,
      mobileY: 320,
    },
    {
      number: "04",
      station: "Checkpoint 04",
      title: "Testing & Quality Assurance",
      subtitle: "Pengujian & Kontrol Kualitas",
      icon: ShieldCheck,
      tag: "Fase 4 — Validasi",
      duration: "2 - 4 Hari",
      image:
        "https://i.pinimg.com/736x/95/24/ad/9524adaab46cd8939bd55f608bdb4e11.jpg",
      desc: "Pengujian menyeluruh pada berbagai perangkat dan peramban untuk memastikan aplikasi bebas bug, cepat, aman, dan berkinerja tinggi.",
      deliverables: [
        "Pengujian lintas perangkat & peramban (Cross-Browser)",
        "Audit performa & aksesibilitas (Lighthouse 95+)",
        "Uji beban & penanganan kelemahan sekuritas",
        "Penyempurnaan responsivitas & mikro-interaksi",
      ],
      tools: ["Lighthouse", "Cross-Browser QA", "Security Check"],
      pctX: 72,
      posY: 240,
      mobileX: 80,
      mobileY: 450,
    },
    {
      number: "05",
      station: "Final Destination",
      title: "Deployment & Maintenance",
      subtitle: "Peluncuran & Pemeliharaan",
      icon: Rocket,
      tag: "Fase 5 — Peluncuran",
      duration: "Berkelanjutan",
      image:
        "https://i.pinimg.com/1200x/0d/9b/1d/0d9b1d1e94852acbe29c3a9094e17c39.jpg",
      desc: "Publikasi aplikasi ke lingkungan produksi (Live Production), optimasi SEO metadata, konfigurasi CI/CD, dan pemeliharaan berkala.",
      deliverables: [
        "Deployment ke Vercel / VPS / Cloud Server",
        "Konfigurasi Custom Domain, SSL, & DNS",
        "Optimasi SEO Metadata & Open Graph",
        "Dokumentasi proyek & bantuan teknis pasca-rilis",
      ],
      tools: ["Vercel / VPS", "CI/CD Pipeline", "SEO & Analytics"],
      pctX: 94,
      posY: 140,
      mobileX: 50,
      mobileY: 570,
    },
  ];

  function handleSelect(i: number) {
    if (activeStep === i) {
      activeStep = null;
    } else {
      activeStep = i;
      setTimeout(() => {
        const detailEl = document.querySelector(".dropdown-detail-panel");
        if (detailEl) {
          detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 120);
    }
  }

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("#roadmap .reveal")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<section
  id="roadmap"
  class="roadmap section section-alt"
  aria-label="Work Roadmap Wave Map"
>
  <!-- Natural Background Image Layer -->
  <div class="roadmap-bg-layer" aria-hidden="true">
    <img src={roadmapBg} alt="" class="roadmap-bg-img" draggable="false" />
    <div class="roadmap-bg-overlay"></div>
  </div>

  <!-- Subtle Grid Background Overlay -->
  <div class="roadmap-grid-bg" aria-hidden="true"></div>

  <div class="container">
    <!-- Header -->
    <div class="roadmap-top reveal">
      <p class="section-eyebrow">04 — Work Roadmap</p>
      <div class="roadmap-head-row">
        <h2 class="section-title">
          <span class="hl-block">Project</span>
          <span class="hl-block hl-italic">Roadmap.</span>
        </h2>
        <p class="section-subtitle">
          Peta rute kerja berurutan 5 tahap dari analisis kebutuhan hingga rilis
          produksi. Klik logo pada gelombang di bawah ini untuk melihat detail.
        </p>
      </div>
    </div>

    <!-- Fluid Wave Roadmap Stage -->
    <div class="wave-roadmap-stage reveal reveal-delay-1">
      <div class="wave-scroll-container">
        <!-- Desktop Horizontal Wave Canvas -->
        <div class="wave-canvas desktop-wave">
          <svg
            class="wave-svg-line"
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <!-- Soft Ambient Base Line -->
            <path
              d="M 60,140 C 170,40 210,40 280,40 C 350,40 390,140 500,140 C 610,240 650,240 720,240 C 790,240 830,140 940,140"
              fill="none"
              stroke="rgba(17, 17, 17, 0.06)"
              stroke-width="8"
              stroke-linecap="round"
            />

            <!-- Base Thin Dashed Track -->
            <path
              d="M 60,140 C 170,40 210,40 280,40 C 350,40 390,140 500,140 C 610,240 650,240 720,240 C 790,240 830,140 940,140"
              fill="none"
              stroke="rgba(17, 17, 17, 0.2)"
              stroke-width="1.8"
              stroke-dasharray="6 8"
              stroke-linecap="round"
            />

            <!-- Smooth Animated Dark Wave Line -->
            <path
              d="M 60,140 C 170,40 210,40 280,40 C 350,40 390,140 500,140 C 610,240 650,240 720,240 C 790,240 830,140 940,140"
              fill="none"
              stroke="#111111"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-dasharray="16 12"
              class="active-wave-path"
            />
          </svg>

          <!-- 5 Desktop Logo Nodes Positioned EXACTLY on the Wave -->
          <div class="wave-logo-nodes">
            {#each steps as step, i}
              {@const isActive = activeStep === i}
              <button
                class="logo-node-btn"
                class:active={isActive}
                style="left: {step.pctX}%; top: {step.posY}px;"
                onclick={() => handleSelect(i)}
                type="button"
                aria-label={`Click to open step ${step.number}: ${step.title}`}
              >
                <span class="node-num-badge">{step.number}</span>
                <div class="node-logo-wrapper">
                  <img
                    src={logoImg}
                    alt={`Step ${step.number} Logo`}
                    class="node-logo-img"
                  />
                </div>

                <!-- Hover / Touch Title Tooltip -->
                <div class="node-hover-tooltip">
                  <span class="tooltip-num">0{i + 1}</span>
                  <span class="tooltip-title">{step.title}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Mobile Vertical S-Curve Wave Canvas -->
        <div class="wave-canvas mobile-wave">
          <svg
            class="wave-svg-line-mobile"
            viewBox="0 0 300 640"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <!-- Ambient Line Mobile -->
            <path
              d="M 60,60 C 180,60 240,120 240,190 C 240,260 60,250 60,320 C 60,390 240,380 240,450 C 240,510 150,510 150,570"
              fill="none"
              stroke="rgba(17, 17, 17, 0.06)"
              stroke-width="8"
              stroke-linecap="round"
            />
            <!-- Dashed Line Mobile -->
            <path
              d="M 60,60 C 180,60 240,120 240,190 C 240,260 60,250 60,320 C 60,390 240,380 240,450 C 240,510 150,510 150,570"
              fill="none"
              stroke="rgba(17, 17, 17, 0.2)"
              stroke-width="1.8"
              stroke-dasharray="6 8"
              stroke-linecap="round"
            />
            <!-- Animated Dark Wave Line Mobile -->
            <path
              d="M 60,60 C 180,60 240,120 240,190 C 240,260 60,250 60,320 C 60,390 240,380 240,450 C 240,510 150,510 150,570"
              fill="none"
              stroke="#111111"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-dasharray="16 12"
              class="active-wave-path"
            />
          </svg>

          <!-- 5 Mobile Logo Nodes Positioned Along the Vertical S-Curve -->
          <div class="wave-logo-nodes">
            {#each steps as step, i}
              {@const isActive = activeStep === i}
              <button
                class="logo-node-btn"
                class:active={isActive}
                style="left: {step.mobileX}%; top: {step.mobileY}px;"
                onclick={() => handleSelect(i)}
                type="button"
                aria-label={`Click to open step ${step.number}: ${step.title}`}
              >
                <span class="node-num-badge">{step.number}</span>
                <div class="node-logo-wrapper">
                  <img
                    src={logoImg}
                    alt={`Step ${step.number} Logo`}
                    class="node-logo-img"
                  />
                </div>

                <!-- Hover / Touch Title Tooltip Mobile -->
                <div class="node-hover-tooltip">
                  <span class="tooltip-num">0{i + 1}</span>
                  <span class="tooltip-title">{step.title}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Dropdown Detail Panel (Shown ONLY when clicked) -->
      {#if activeStep !== null}
        {@const current = steps[activeStep]}
        {@const IconComponent = current.icon}
        <div class="dropdown-detail-panel" transition:slide={{ duration: 300 }}>
          <div class="detail-card">
            <div class="detail-card-grid">
              <!-- Left Column: Full Bleed Edge-to-Edge Vertical Image -->
              <div class="detail-image-column">
                <img
                  src={current.image}
                  alt={current.title}
                  class="detail-stage-img"
                  loading="lazy"
                />
                <div class="image-overlay-badge">
                  <span>STAGE {current.number}</span>
                </div>
              </div>

              <!-- Right Column: Content Body & Header -->
              <div class="detail-content-column">
                <!-- Card Header -->
                <div class="detail-card-head">
                  <div class="head-badge-group">
                    <span class="detail-station">
                      <MapPin size={14} />
                      {current.station}
                    </span>
                    <span class="detail-tag">{current.tag}</span>
                    <span class="detail-duration">{current.duration}</span>
                  </div>
                  <button
                    class="close-detail-btn"
                    onclick={() => (activeStep = null)}
                    type="button"
                    aria-label="Close detail panel"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div class="detail-main-row">
                  <div class="detail-icon-box">
                    <IconComponent size={28} strokeWidth={1.8} />
                  </div>
                  <div class="detail-titles">
                    <span class="detail-step-num">Tahap {current.number}</span>
                    <h3 class="detail-h3">{current.title}</h3>
                    <p class="detail-sub">{current.subtitle}</p>
                  </div>
                </div>

                <p class="detail-desc">{current.desc}</p>

                <!-- Deliverables Output Checklist -->
                <div class="detail-deliverables">
                  <p class="deliverables-heading">Output & Key Deliverables:</p>
                  <ul class="deliverables-list">
                    {#each current.deliverables as item}
                      <li class="deliverable-item">
                        <CheckCircle2 size={16} class="chk-icon" />
                        <span>{item}</span>
                      </li>
                    {/each}
                  </ul>
                </div>

                <!-- Tools & Tech Pills -->
                <div class="detail-footer-tools">
                  <span class="tools-label">Metode & Alat:</span>
                  <div class="tools-pills">
                    {#each current.tools as tool}
                      <span class="tool-pill">{tool}</span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .roadmap {
    position: relative;
    background-color: var(--bg-alt, #f5f4f0);
    color: var(--ink, #111111);
    overflow: hidden;
  }

  /* Natural Background Image Layer */
  .roadmap-bg-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .roadmap-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.85;
    filter: none;
    display: block;
    user-select: none;
  }

  .roadmap-grid-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      var(--border, #e2e2e2) 1px,
      transparent 1px
    );
    background-size: 36px 36px;
    opacity: 0.45;
    pointer-events: none;
  }

  .roadmap :global(.container) {
    position: relative;
    z-index: 2;
  }

  /* ─── Header ──────────────────────────────────────────────── */
  .roadmap-top {
    margin-bottom: 56px;
  }

  .roadmap-head-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
  }

  .roadmap-top .section-title {
    margin: 8px 0 0;
    color: var(--ink, #111111);
  }

  .roadmap-top .section-subtitle {
    max-width: 520px;
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--ink-2, #444444);
  }

  /* ─── Horizontal Wave Stage ───────────────────────────────── */
  .wave-roadmap-stage {
    position: relative;
    margin-bottom: 32px;
  }

  .wave-scroll-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 30px 0 60px;
  }
  .wave-scroll-container::-webkit-scrollbar {
    display: none;
  }

  /* Desktop Wave Canvas */
  .wave-canvas.desktop-wave {
    position: relative;
    min-width: 1080px;
    height: 310px;
    margin: 0 auto;
    display: block;
  }

  /* Mobile Vertical S-Curve Wave Canvas */
  .wave-canvas.mobile-wave {
    position: relative;
    width: 100%;
    height: 640px;
    margin: 0 auto;
    display: none;
  }

  /* Horizontal SVG Wave Line */
  .wave-svg-line {
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    height: 280px;
    overflow: visible;
  }

  .wave-svg-line-mobile {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .active-wave-path {
    animation: wave-flow 24s linear infinite;
  }

  @keyframes wave-flow {
    from {
      stroke-dashoffset: 360;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  /* Logo Nodes Anchored Along the Wave */
  .wave-logo-nodes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .logo-node-btn {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
    outline: none;
  }



  /* Step Number Badge */
  .node-num-badge {
    position: absolute;
    top: -14px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
    background: var(--ink, #111111);
    color: var(--bg, #ffffff);
    padding: 3px 10px;
    border-radius: var(--radius-full, 9999px);
    z-index: 3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  /* Large Prominent Logo Core Button */
  .node-logo-wrapper {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    background: var(--bg, #ffffff);
    border: 2px solid var(--ink, #111111);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition:
      border-color 0.3s var(--ease),
      transform 0.3s var(--ease),
      box-shadow 0.3s var(--ease);
  }

  .node-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .logo-node-btn:hover .node-logo-wrapper {
    transform: scale(1.08);
    border-color: var(--ink, #111111);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  }

  .logo-node-btn.active .node-logo-wrapper {
    transform: scale(1.15);
    border-color: var(--ink, #111111);
    background: var(--bg, #ffffff);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
    outline: 2px solid var(--ink, #111111);
  }

  /* ─── Hover / Touch Title Tooltip ──────────────────────────── */
  .node-hover-tooltip {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    background: var(--ink, #111111);
    color: var(--bg, #ffffff);
    padding: 6px 14px;
    border-radius: var(--radius-sm, 6px);
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    transition:
      opacity 0.25s var(--ease),
      transform 0.25s var(--ease);
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .node-hover-tooltip::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--ink, #111111);
  }

  .tooltip-num {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 800;
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 3px;
  }

  .tooltip-title {
    letter-spacing: -0.01em;
  }

  .logo-node-btn:hover .node-hover-tooltip,
  .logo-node-btn:focus-visible .node-hover-tooltip,
  .logo-node-btn.active .node-hover-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* ─── Dropdown Detail Panel ────────────────────────────────── */
  .dropdown-detail-panel {
    max-width: 1020px;
    margin: 20px auto 0;
  }

  .detail-card {
    background: var(--bg, #ffffff);
    border: 1px solid var(--border);
    padding: 0;
    overflow: hidden;
    box-shadow: var(--shadow-lg, 0 12px 36px rgba(0, 0, 0, 0.08));
    position: relative;
    color: var(--ink, #111111);
  }

  /* ─── Detail Grid Layout (Full Bleed Image Column + Content) ── */
  .detail-card-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    align-items: stretch;
    min-height: 480px;
  }

  /* Full Bleed Image Column (Flush to outer card border) */
  .detail-image-column {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    border-right: 1px solid var(--border);
    background: var(--bg-alt, #f5f4f0);
  }

  .detail-stage-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s var(--ease);
  }

  .detail-image-column:hover .detail-stage-img {
    transform: scale(1.05);
  }

  .image-overlay-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: var(--ink, #111111);
    color: var(--bg, #ffffff);
    padding: 5px 12px;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  /* Content Column (Padded) */
  .detail-content-column {
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
  }

  .detail-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .head-badge-group {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .detail-station {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink, #111111);
  }

  .detail-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    background: var(--ink, #111111);
    color: var(--bg, #ffffff);
    padding: 4px 11px;
  }

  .detail-duration {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--ink-3, #888888);
  }

  .close-detail-btn {
    background: transparent;
    border: none;
    color: var(--ink-3, #888888);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s var(--ease);
  }
  .close-detail-btn:hover {
    color: var(--ink, #111111);
  }

  .detail-main-row {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 14px;
  }

  .detail-icon-box {
    width: 52px;
    height: 52px;
    background: var(--bg-alt);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink);
    flex-shrink: 0;
  }

  .detail-step-num {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink-3, #888888);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .detail-h3 {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--ink, #111111);
    letter-spacing: -0.02em;
    margin: 2px 0 0;
  }

  .detail-sub {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink-3, #888888);
    margin-top: 2px;
  }

  .detail-desc {
    font-size: 0.95rem;
    line-height: 1.68;
    color: var(--ink-2, #444444);
    margin-bottom: 24px;
  }

  /* Deliverables */
  .detail-deliverables {
    background: var(--bg-alt, #f5f4f0);
    padding: 22px 26px;
    border: 1px solid var(--border);
    margin-bottom: 24px;
  }

  .deliverables-heading {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink, #111111);
    margin-bottom: 14px;
  }

  .deliverables-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .deliverable-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.88rem;
    color: var(--ink-2, #444444);
    line-height: 1.4;
  }

  .deliverable-item :global(.chk-icon) {
    color: var(--ink, #111111);
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Tools Row */
  .detail-footer-tools {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    padding-top: 14px;
    border-top: 1px dashed var(--border);
    margin-top: auto;
  }

  .tools-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--ink-3, #888888);
  }

  .tools-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tool-pill {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    background: var(--bg, #ffffff);
    border: 1px solid var(--border);
    padding: 5px 12px;
    color: var(--ink-2, #444444);
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 900px) {
    .detail-card-grid {
      grid-template-columns: 1fr;
    }
    .detail-image-column {
      height: 220px;
      min-height: 220px;
      max-height: 220px;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
    .detail-content-column {
      padding: 24px;
    }
  }

  @media (max-width: 768px) {
    .wave-scroll-container {
      padding: 10px 0 20px;
    }
    .wave-canvas.desktop-wave {
      display: none;
    }
    .wave-canvas.mobile-wave {
      display: block;
    }
    .node-logo-wrapper {
      width: 75px;
      height: 75px;
      padding: 10px;
    }
    .dropdown-detail-panel {
      margin-top: 12px;
    }
    .detail-image-column {
      height: 180px;
      min-height: 180px;
      max-height: 180px;
    }
    .detail-content-column {
      padding: 18px 16px;
    }
    .detail-card-head {
      margin-bottom: 16px;
      padding-bottom: 12px;
    }
    .head-badge-group {
      gap: 8px;
    }
    .detail-main-row {
      flex-direction: row;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .detail-icon-box {
      width: 42px;
      height: 42px;
    }
    .detail-h3 {
      font-size: 1.18rem;
    }
    .detail-sub {
      font-size: 0.75rem;
    }
    .detail-desc {
      font-size: 0.85rem;
      line-height: 1.55;
      margin-bottom: 16px;
    }
    .detail-deliverables {
      padding: 14px 16px;
      margin-bottom: 16px;
    }
    .deliverables-heading {
      font-size: 0.7rem;
      margin-bottom: 10px;
    }
    .deliverables-list {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .deliverable-item {
      font-size: 0.8rem;
    }
    .detail-footer-tools {
      padding-top: 10px;
      gap: 8px;
    }
    .tool-pill {
      font-size: 0.65rem;
      padding: 4px 9px;
    }
  }
</style>
