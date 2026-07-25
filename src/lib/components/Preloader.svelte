<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { sound } from "$lib/utils/audio";
  import {
    Cpu,
    Terminal,
    ShieldCheck,
    Zap,
    Activity,
    Code2,
    Globe,
  } from "@lucide/svelte";

  // ── State ──────────────────────────────────────────────────
  let pct = $state(0);
  let hidden = $state(false);
  let loaded = $state(false);

  const techStack = [
    "SVELTEKIT 5",
    "TYPESCRIPT",
    "NODE.JS",
    "POSTGRESQL",
    "BUN RUNTIME",
    "TAILWIND CSS",
    "DOCKER",
    "REST & GRAPHQL",
  ];

  const steps = [
    { code: "01", label: "INITIALIZING KERNEL & MEMORY" },
    { code: "02", label: "LOADING SVELTE 5 RUNES ENGINE" },
    { code: "03", label: "COMPOSING BENTO GRID LAYOUT" },
    { code: "04", label: "OPTIMIZING ASSET PIPELINE" },
    { code: "05", label: "DWI WAHYU FAUZAN — READY" },
  ];

  let currentStepIndex = $derived(
    pct < 25 ? 0 : pct < 50 ? 1 : pct < 75 ? 2 : pct < 98 ? 3 : 4,
  );

  let lastQuarter = 0;

  onMount(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      pct = 100;
      loaded = true;
      hidden = true;
      document.body.classList.remove("loading");
      document.documentElement.classList.remove("preloader-active");
      return;
    }

    document.body.classList.add("loading");
    sessionStorage.setItem("hasLoaded", "true");

    const duration = 2400; // Sedikit dipanjangkan agar animasinya terasa lebih premium
    const start = performance.now();
    let animationFrameId: number;

    function animate(time: number) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-in-out curve (Cubic Bezier style)
      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      pct = easeProgress * 100;

      // Audio milestone clicks
      const q = Math.floor(pct / 20);
      if (q > lastQuarter && q <= 5) {
        lastQuarter = q;
        sound.playClick(400 + q * 120, 0.035);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        pct = 100;
        sound.playPop();
        setTimeout(() => {
          loaded = true; // Memulai animasi transisi keluar (Exit Animation)
          setTimeout(() => {
            hidden = true;
            document.body.classList.remove("loading");
            document.documentElement.classList.remove("preloader-active");
          }, 800); // Waktu selesainya animasi exit
        }, 400);
      }
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("loading");
      document.documentElement.classList.remove("preloader-active");
    };
  });
</script>

{#if !hidden}
  <div class="modern-overlay" class:loaded aria-hidden="true">
    <!-- Bagian Atas: Logo & Status Ringkas -->
    <div class="top-bar">
      <div class="brand">
        <Cpu size={14} />
        <span>DWISYCOO OS</span>
      </div>
      <div class="status-badge">
        <span class="dot-pulse"></span>
        <span>SYSTEM BOOT</span>
      </div>
    </div>

    <!-- Bagian Tengah: Fokus Utama (Angka & Progress) -->
    <div class="center-content">
      <!-- Transisi halus untuk nomor step menggunakan blok {#key} Svelte -->
      <div class="step-indicator">
        {#key currentStepIndex}
          <div
            class="step-code"
            in:fly={{ y: 10, duration: 400, delay: 100 }}
            out:fade={{ duration: 200 }}
          >
            {steps[currentStepIndex].code}
          </div>
        {/key}
        <div class="step-line"></div>
        <span class="step-total">05</span>
      </div>

      <!-- Counter Utama -->
      <div class="counter-wrapper">
        <h1 class="counter-text">
          {String(Math.floor(pct)).padStart(3, "0")}
        </h1>
        <span class="counter-percent">%</span>
      </div>

      <!-- Progress Bar Minimalis -->
      <div class="progress-container">
        <div class="progress-track">
          <div class="progress-fill" style="width: {pct}%"></div>
          <!-- Titik bersinar di ujung progress bar -->
          <div class="progress-glow" style="left: {pct}%"></div>
        </div>
      </div>

      <!-- Label Step yang berganti dengan animasi Fly -->
      <div class="step-label-container">
        {#key currentStepIndex}
          <div
            class="step-label"
            in:fly={{ y: 10, duration: 400, delay: 150 }}
            out:fade={{ duration: 200 }}
          >
            {steps[currentStepIndex].label}
          </div>
        {/key}
      </div>
    </div>

    <!-- Bagian Bawah: Marquee Minimalis -->
    <div class="bottom-bar">
      <div class="stack-marquee">
        <div class="marquee-track">
          {#each techStack as tech}
            <span class="stack-chip"><Code2 size={12} /> {tech}</span>
          {/each}
          {#each techStack as tech}
            <span class="stack-chip"><Code2 size={12} /> {tech}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body.loading) {
    overflow: hidden !important;
  }

  /* ══ BUNGKUSAN UTAMA (OVERLAY) ════════════════════════════ */
  .modern-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-head);
    padding: 32px 40px;
    overflow: hidden;

    /* Animasi Keluar (Cinematic Slide Up) */
    transition:
      transform 0.8s cubic-bezier(0.76, 0, 0.24, 1),
      opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1),
      border-radius 0.8s ease;
    transform-origin: top center;
  }

  .modern-overlay.loaded {
    transform: translateY(-100%) scale(0.95);
    opacity: 0;
    border-radius: 0 0 40px 40px; /* Melengkung saat ditarik ke atas */
  }

  /* ── TOP BAR (Header Minimalis) ── */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    opacity: 0.6;
    transition: opacity 0.3s;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(var(--ink-rgb), 0.05);
    border-radius: 99px;
  }

  .dot-pulse {
    width: 6px;
    height: 6px;
    background-color: var(--ink);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--ink-rgb), 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--ink-rgb), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--ink-rgb), 0);
    }
  }

  /* ── CENTER CONTENT (Fokus Utama) ── */
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin: auto;
    width: 100%;
    max-width: 600px;
  }

  /* Indikator Step (01 / 05) */
  .step-indicator {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.5;
    position: relative;
    height: 20px;
  }

  .step-code {
    position: absolute;
    right: 100%;
    margin-right: 12px;
  }

  .step-line {
    width: 40px;
    height: 1px;
    background: var(--ink);
    opacity: 0.3;
  }

  .step-total {
    margin-left: 12px;
  }

  /* Counter Raksasa */
  .counter-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    line-height: 0.85;
  }

  .counter-text {
    font-size: clamp(6rem, 20vw, 12rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    margin: 0;
    background: linear-gradient(
      135deg,
      var(--ink) 20%,
      rgba(var(--ink-rgb), 0.3) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .counter-percent {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    opacity: 0.3;
    margin-top: 10px;
    margin-left: 8px;
  }

  /* Progress Bar Minimalis */
  .progress-container {
    width: 100%;
    padding: 0 20px;
  }

  .progress-track {
    position: relative;
    width: 100%;
    height: 2px;
    background: rgba(var(--ink-rgb), 0.1);
    border-radius: 99px;
  }

  .progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--ink);
    border-radius: 99px;
    transition: width 0.1s linear;
  }

  /* Cahaya kecil di ujung progress */
  .progress-glow {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background: var(--ink);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 15px 4px rgba(var(--ink-rgb), 0.4);
    transition: left 0.1s linear;
  }

  /* Label Step di Bawah Progress */
  .step-label-container {
    position: relative;
    height: 24px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .step-label {
    position: absolute;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--ink);
    opacity: 0.7;
    text-align: center;
  }

  /* ── BOTTOM BAR (Marquee) ── */
  .bottom-bar {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .stack-marquee {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    max-width: 800px;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
  }

  .marquee-track {
    display: inline-flex;
    gap: 32px;
    animation: stack-scroll 30s linear infinite;
  }

  @keyframes stack-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .stack-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--ink);
    opacity: 0.4;
    letter-spacing: 0.05em;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .modern-overlay {
      padding: 24px 20px;
    }

    .top-bar {
      font-size: 0.65rem;
    }

    .counter-text {
      font-size: clamp(5rem, 25vw, 8rem);
    }

    .step-label {
      font-size: 0.7rem;
      letter-spacing: 0.1em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modern-overlay {
      transition: opacity 0.5s ease !important;
    }
    .modern-overlay.loaded {
      transform: none !important;
      opacity: 0;
    }
    .marquee-track {
      animation: none !important;
    }
  }
</style>
