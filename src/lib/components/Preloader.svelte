<script lang="ts">
  import { onMount } from "svelte";
  import { sound } from "$lib/utils/audio";
  import { Cpu, Terminal, ShieldCheck, Zap, Activity, Code2, Globe } from "@lucide/svelte";

  // ── State ──────────────────────────────────────────────────
  let pct = $state(0);
  let hidden = $state(false);
  let loaded = $state(false);
  let matrixText = $state("SYS_INIT");

  const techStack = [
    "SVELTEKIT 5",
    "TYPESCRIPT",
    "NODE.JS",
    "POSTGRESQL",
    "BUN RUNTIME",
    "TAILWIND CSS",
    "DOCKER",
    "REST & GRAPHQL"
  ];

  const steps = [
    { code: "01/05", label: "INITIALIZING KERNEL & MEMORY" },
    { code: "02/05", label: "LOADING SVELTE 5 RUNES ENGINE" },
    { code: "03/05", label: "COMPOSING BENTO GRID LAYOUT" },
    { code: "04/05", label: "OPTIMIZING ASSET PIPELINE" },
    { code: "05/05", label: "DWI WAHYU FAUZAN — READY" }
  ];

  let currentStepIndex = $derived(
    pct < 25 ? 0 :
    pct < 50 ? 1 :
    pct < 75 ? 2 :
    pct < 98 ? 3 : 4
  );

  let lastQuarter = 0;

  // Matrix Scramble effect for high-tech feel
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&%";
  function scrambleText(target: string) {
    let iteration = 0;
    const interval = setInterval(() => {
      matrixText = target
        .split("")
        .map((char, index) => {
          if (index < iteration) return target[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      if (iteration >= target.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  }

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

    const duration = 2000; // 2 seconds high-end loading sequence
    const start = performance.now();
    let animationFrameId: number;

    function animate(time: number) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-in-out curve
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      pct = easeProgress * 100;

      // Audio milestone clicks
      const q = Math.floor(pct / 20);
      if (q > lastQuarter && q <= 5) {
        lastQuarter = q;
        sound.playClick(400 + q * 120, 0.035);
        if (steps[currentStepIndex]) {
          scrambleText(steps[currentStepIndex].code);
        }
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        pct = 100;
        sound.playPop();
        setTimeout(() => {
          loaded = true; // Trigger curtain aperture reveal
          setTimeout(() => {
            hidden = true;
            document.body.classList.remove("loading");
            document.documentElement.classList.remove("preloader-active");
          }, 1000);
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
  <div class="preloader-overlay" class:loaded={loaded} aria-hidden="true">
    <!-- ─── Aperture Split Curtain Panels ────────────────── -->
    <div class="curtain curtain-top"></div>
    <div class="curtain curtain-bottom"></div>
    <div class="curtain-line"></div>

    <!-- ─── HUD Terminal Grid Content ───────────────────── -->
    <div class="hud-container" class:fade-out={loaded}>

      <!-- Top Bar -->
      <div class="hud-top">
        <div class="hud-brand">
          <Cpu size={13} />
          <span>DWISYCOO // SYSTEM OS</span>
        </div>
        <div class="hud-matrix-chip">
          <Terminal size={11} />
          <span class="matrix-code">{matrixText}</span>
        </div>
        <div class="hud-time">
          <span class="pulse-dot"></span>
          <span class="hud-time-label">JKT UTC+7</span>
        </div>
      </div>

      <!-- Center: Desktop = 3 col, Mobile = stacked counter only -->
      <div class="hud-center">
        <!-- Left Visualizer (Desktop only) -->
        <div class="hud-side-widget desktop-only">
          <span class="widget-label">SPECTRUM</span>
          <div class="eq-bars">
            <div class="eq-bar" style="--h: 60%; --d: 0.1s;"></div>
            <div class="eq-bar" style="--h: 90%; --d: 0.3s;"></div>
            <div class="eq-bar" style="--h: 45%; --d: 0.2s;"></div>
            <div class="eq-bar" style="--h: 100%; --d: 0.4s;"></div>
            <div class="eq-bar" style="--h: 75%; --d: 0.15s;"></div>
          </div>
          <span class="widget-val">48.0 kHz</span>
        </div>

        <!-- Main Counter -->
        <div class="hud-main-counter">
          <div class="counter-num-wrap">
            <span class="counter-num">{String(Math.floor(pct)).padStart(3, "0")}</span>
            <span class="counter-unit">%</span>
          </div>
          <div class="step-badge">
            <Activity size={11} class="spin-icon" />
            <span class="step-label">{steps[currentStepIndex].label}</span>
          </div>
        </div>

        <!-- Right Visualizer (Desktop only) -->
        <div class="hud-side-widget desktop-only">
          <span class="widget-label">PROGRESS</span>
          <div class="ring-wrap">
            <svg viewBox="0 0 44 44" class="progress-ring">
              <circle cx="22" cy="22" r="18" class="ring-bg"></circle>
              <circle
                cx="22" cy="22" r="18"
                class="ring-fill"
                style="stroke-dashoffset: {113 - (113 * pct) / 100}"
              ></circle>
            </svg>
            <Zap size={11} class="ring-icon" />
          </div>
          <span class="widget-val">{Math.floor(pct)} / 100</span>
        </div>
      </div>

      <!-- Mobile Mini-Widgets Row (hidden on desktop) -->
      <div class="mobile-widgets">
        <div class="mini-widget">
          <span class="widget-label">SPECTRUM</span>
          <div class="eq-bars">
            <div class="eq-bar" style="--h: 60%; --d: 0.1s;"></div>
            <div class="eq-bar" style="--h: 90%; --d: 0.3s;"></div>
            <div class="eq-bar" style="--h: 45%; --d: 0.2s;"></div>
            <div class="eq-bar" style="--h: 100%; --d: 0.4s;"></div>
            <div class="eq-bar" style="--h: 75%; --d: 0.15s;"></div>
          </div>
        </div>
        <div class="mini-widget">
          <span class="widget-label">PROGRESS</span>
          <div class="ring-wrap">
            <svg viewBox="0 0 44 44" class="progress-ring">
              <circle cx="22" cy="22" r="18" class="ring-bg"></circle>
              <circle
                cx="22" cy="22" r="18"
                class="ring-fill"
                style="stroke-dashoffset: {113 - (113 * pct) / 100}"
              ></circle>
            </svg>
            <Zap size={10} class="ring-icon" />
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="hud-bottom">
        <div class="hud-progress-bar">
          <div class="progress-fill-glow" style="width: {pct}%;"></div>
        </div>
        <div class="hud-footer-row">
          <div class="stack-marquee">
            <div class="marquee-track">
              {#each techStack as tech}
                <span class="stack-chip"><Code2 size={10} /> {tech}</span>
              {/each}
              {#each techStack as tech}
                <span class="stack-chip"><Code2 size={10} /> {tech}</span>
              {/each}
            </div>
          </div>
          <div class="hud-copy desktop-only">
            <ShieldCheck size={12} />
            <span>FULLSTACK PORTFOLIO 2026</span>
          </div>
        </div>
      </div>

    </div>
  </div>
{/if}

<style>
  :global(body.loading) {
    overflow: hidden !important;
  }

  /* ══ OVERLAY ═════════════════════════════════════════════ */
  .preloader-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-head);
    overflow: hidden;
  }

  /* ── Aperture Split Curtains (Dynamic Dark & Light Theme Adaptive) ── */
  .curtain {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    background: var(--bg);
    /* High-tech blueprint grid background */
    background-size: 32px 32px;
    background-image:
      linear-gradient(to right, rgba(var(--ink-rgb), 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--ink-rgb), 0.04) 1px, transparent 1px);
    transition: transform 0.9s cubic-bezier(0.85, 0, 0.15, 1);
    will-change: transform;
    z-index: 1;
  }

  .curtain-top { top: 0; transform-origin: top center; border-bottom: 1px solid rgba(var(--ink-rgb), 0.1); }
  .curtain-bottom { bottom: 0; transform-origin: bottom center; border-top: 1px solid rgba(var(--ink-rgb), 0.1); }

  .curtain-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(var(--ink-rgb), 0.25);
    z-index: 2;
    transform: translateY(-50%) scaleX(1);
    transition: transform 0.5s var(--ease-out);
  }

  /* Curtain Exit Animation */
  .preloader-overlay.loaded .curtain-top { transform: translateY(-100%); }
  .preloader-overlay.loaded .curtain-bottom { transform: translateY(100%); }
  .preloader-overlay.loaded .curtain-line { transform: translateY(-50%) scaleX(0); }

  /* ══ HUD CONTAINER ══════════════════════════════════════ */
  .hud-container {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 40px 48px;
    box-sizing: border-box;
    transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
  }

  .hud-container.fade-out {
    opacity: 0;
    transform: scale(0.96);
  }

  /* ── HUD TOP BAR ── */
  .hud-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: rgba(var(--ink-rgb), 0.6);
  }

  .hud-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
  }

  .hud-matrix-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: rgba(var(--ink-rgb), 0.05);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--ink);
    box-shadow: 2px 2px 0 var(--ink);
  }

  .matrix-code {
    letter-spacing: 0.1em;
    min-width: 70px;
  }

  .hud-time {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
  }

  .pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ink);
    box-shadow: 0 0 10px rgba(var(--ink-rgb), 0.5);
    animation: live-pulse 1.8s infinite ease-in-out;
  }

  @keyframes live-pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.2); }
  }

  /* ── HUD CENTER ── */
  .hud-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Side Widgets */
  .hud-side-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px;
    background: var(--bg);
    border: 1.5px solid var(--ink);
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--ink);
    width: 130px;
    color: var(--ink);
  }

  .widget-label {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    opacity: 0.5;
  }

  .widget-val {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    opacity: 0.8;
  }

  /* Equalizer Bars */
  .eq-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 36px;
  }

  .eq-bar {
    width: 4px;
    height: var(--h);
    background: var(--ink);
    border-radius: 99px;
    animation: eq-bounce 1.2s infinite ease-in-out var(--d);
  }

  @keyframes eq-bounce {
    0%, 100% { transform: scaleY(0.3); }
    50%       { transform: scaleY(1); }
  }

  /* Circular Ring Progress */
  .ring-wrap {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .ring-bg {
    fill: none;
    stroke: rgba(var(--ink-rgb), 0.12);
    stroke-width: 3;
  }

  .ring-fill {
    fill: none;
    stroke: var(--ink);
    stroke-width: 3;
    stroke-dasharray: 113;
    transition: stroke-dashoffset 0.1s linear;
    stroke-linecap: round;
  }

  :global(.ring-icon) {
    position: absolute;
    color: var(--ink);
    opacity: 0.85;
  }

  /* Main Counter & Step Badge */
  .hud-main-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .counter-num-wrap {
    display: flex;
    align-items: flex-start;
    line-height: 0.82;
  }

  .counter-num {
    font-size: clamp(6rem, 20vw, 15rem);
    font-weight: 900;
    letter-spacing: -0.06em;
    font-variant-numeric: tabular-nums;
    color: var(--ink);
  }

  .counter-unit {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 800;
    opacity: 0.4;
    color: var(--ink);
    margin-left: 8px;
    margin-top: 12px;
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: var(--bg);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
  }

  :global(.spin-icon) {
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── HUD BOTTOM ── */
  .hud-bottom {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .hud-progress-bar {
    width: 100%;
    height: 3px;
    background: rgba(var(--ink-rgb), 0.1);
    border-radius: 99px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill-glow {
    height: 100%;
    background: var(--ink);
    box-shadow: 0 0 12px var(--ink);
    transition: width 0.05s linear;
  }

  .hud-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stack-marquee {
    overflow: hidden;
    white-space: nowrap;
    max-width: 70%;
    mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
  }

  .marquee-track {
    display: inline-flex;
    gap: 16px;
    animation: stack-scroll 25s linear infinite;
  }

  @keyframes stack-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .stack-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--ink);
    opacity: 0.6;
    letter-spacing: 0.1em;
  }

  .hud-copy {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: var(--ink);
    opacity: 0.5;
  }

  /* ══ RESPONSIVE ══════════════════════════════════════════ */

  /* Desktop: hide mobile-widgets row */
  .mobile-widgets { display: none; }

  /* ─── Tablet (≤ 900px) ─── */
  @media (max-width: 900px) {
    .desktop-only { display: none !important; }
    .hud-container { padding: 32px 20px; gap: 0; }
    .hud-top { font-size: 0.65rem; letter-spacing: 0.1em; }
    .hud-matrix-chip { padding: 3px 8px; font-size: 0.6rem; }
    .matrix-code { min-width: 50px; }
    .hud-center { justify-content: center; }
    .stack-marquee { max-width: 100%; }
    .hud-copy { display: none; }
  }

  /* ─── Mobile (≤ 600px) ─── */
  @media (max-width: 600px) {
    .desktop-only { display: none !important; }
    .hud-container { padding: 28px 20px 24px; }

    /* Top bar: stack brand alone, hide time on very small screens */
    .hud-top {
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.62rem;
      letter-spacing: 0.08em;
    }
    .hud-time-label { display: none; }
    .hud-matrix-chip { padding: 3px 8px; font-size: 0.58rem; box-shadow: 1px 1px 0 var(--ink); }
    .matrix-code { min-width: 44px; }

    /* Center: tighten the counter */
    .hud-center { justify-content: center; }
    .counter-num { font-size: clamp(5rem, 25vw, 7rem) !important; }
    .counter-unit { font-size: clamp(1.5rem, 7vw, 2.5rem) !important; margin-top: 8px; }

    /* Step badge: allow wrap, smaller text */
    .step-badge {
      padding: 6px 14px;
      font-size: 0.6rem;
      letter-spacing: 0.08em;
      box-shadow: 2px 2px 0 var(--ink);
      text-align: center;
    }
    .step-label {
      display: block;
      max-width: 200px;
      white-space: normal;
      text-align: center;
      line-height: 1.4;
    }

    /* Show mini-widgets row on mobile */
    .mobile-widgets {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
    }

    .mini-widget {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 14px 16px;
      background: var(--bg);
      border: 1.5px solid var(--ink);
      border-radius: 14px;
      box-shadow: 2px 2px 0 var(--ink);
      width: 100px;
    }

    /* Shrink eq bars on mini-widget */
    .mini-widget .eq-bars { height: 26px; }
    .mini-widget .eq-bar { width: 3px; }
    .mini-widget .ring-wrap { width: 36px; height: 36px; }

    /* Bottom bar: marquee full width */
    .stack-marquee { max-width: 100%; }
    .hud-footer-row { justify-content: center; }
    .hud-bottom { gap: 14px; }
    .hud-progress-bar { height: 2px; }
  }

  /* ─── Very small screens (≤ 380px) ─── */
  @media (max-width: 380px) {
    .hud-container { padding: 24px 16px 20px; }
    .counter-num { font-size: clamp(4rem, 26vw, 5.5rem) !important; }
    .step-badge { font-size: 0.55rem; padding: 5px 12px; }
    .mini-widget { width: 88px; padding: 10px 12px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .curtain { transition: opacity 0.4s ease !important; }
    .preloader-overlay.loaded .curtain-top,
    .preloader-overlay.loaded .curtain-bottom {
      transform: none !important;
      opacity: 0;
    }
    .eq-bar, :global(.spin-icon), .marquee-track { animation: none !important; }
  }
</style>
