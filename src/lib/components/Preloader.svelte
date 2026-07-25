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
      <!-- Top Bar: Coordinates & System Status -->
      <div class="hud-top">
        <div class="hud-brand">
          <Cpu size={14} />
          <span>DWISYCOO // SYSTEM OS</span>
        </div>
        
        <div class="hud-matrix-chip">
          <Terminal size={12} />
          <span class="matrix-code">{matrixText}</span>
        </div>

        <div class="hud-time">
          <span class="pulse-green"></span>
          <span>JAKARTA, ID (UTC+7)</span>
        </div>
      </div>

      <!-- Center Bento HUD: Main Counter & Visualizers -->
      <div class="hud-center">
        <!-- Left Visualizer: Equalizer Waveform -->
        <div class="hud-side-widget left-widget">
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

        <!-- Center: Giant Counter & Step Title -->
        <div class="hud-main-counter">
          <div class="counter-num-wrap">
            <span class="counter-num">{String(Math.floor(pct)).padStart(3, "0")}</span>
            <span class="counter-unit">%</span>
          </div>

          <div class="step-badge">
            <Activity size={12} class="spin-icon" />
            <span>{steps[currentStepIndex].label}</span>
          </div>
        </div>

        <!-- Right Visualizer: Circular Progress Ring -->
        <div class="hud-side-widget right-widget">
          <span class="widget-label">PROGRESS</span>
          <div class="ring-wrap">
            <svg viewBox="0 0 44 44" class="progress-ring">
              <circle cx="22" cy="22" r="18" class="ring-bg"></circle>
              <circle
                cx="22"
                cy="22"
                r="18"
                class="ring-fill"
                style="stroke-dashoffset: {113 - (113 * pct) / 100}"
              ></circle>
            </svg>
            <Zap size={12} class="ring-icon" />
          </div>
          <span class="widget-val">{Math.floor(pct)} / 100</span>
        </div>
      </div>

      <!-- Bottom Bar: Tech Stack Marquee & Progress Track -->
      <div class="hud-bottom">
        <div class="hud-progress-bar">
          <div class="progress-fill-glow" style="width: {pct}%;"></div>
        </div>

        <div class="hud-footer-row">
          <div class="stack-marquee">
            <div class="marquee-track">
              {#each techStack as tech}
                <span class="stack-chip">
                  <Code2 size={11} /> {tech}
                </span>
              {/each}
              {#each techStack as tech}
                <span class="stack-chip">
                  <Code2 size={11} /> {tech}
                </span>
              {/each}
            </div>
          </div>

          <div class="hud-copy">
            <ShieldCheck size={13} />
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
    background: #000000;
    color: #ffffff;
    font-family: var(--font-head);
    overflow: hidden;
  }

  /* ── Aperture Split Curtains ── */
  .curtain {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    background: #000000;
    /* High-tech blueprint grid background */
    background-size: 32px 32px;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    transition: transform 0.9s cubic-bezier(0.85, 0, 0.15, 1);
    will-change: transform;
    z-index: 1;
  }

  .curtain-top { top: 0; transform-origin: top center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
  .curtain-bottom { bottom: 0; transform-origin: bottom center; border-top: 1px solid rgba(255, 255, 255, 0.1); }

  .curtain-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.25);
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
    color: rgba(255, 255, 255, 0.6);
  }

  .hud-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
  }

  .hud-matrix-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 99px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: #ffffff;
  }

  .matrix-code {
    letter-spacing: 0.1em;
    min-width: 70px;
  }

  .hud-time {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pulse-green {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 10px #ffffff;
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    width: 130px;
  }

  .widget-label {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    opacity: 0.4;
  }

  .widget-val {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    opacity: 0.7;
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
    background: #ffffff;
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
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 3;
  }

  .ring-fill {
    fill: none;
    stroke: #ffffff;
    stroke-width: 3;
    stroke-dasharray: 113;
    transition: stroke-dashoffset 0.1s linear;
    stroke-linecap: round;
  }

  :global(.ring-icon) {
    position: absolute;
    color: #ffffff;
    opacity: 0.8;
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
    color: #ffffff;
    text-shadow: 0 0 60px rgba(255, 255, 255, 0.15);
  }

  .counter-unit {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 800;
    opacity: 0.4;
    margin-left: 8px;
    margin-top: 12px;
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: 99px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
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
    background: rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill-glow {
    height: 100%;
    background: #ffffff;
    box-shadow: 0 0 16px #ffffff;
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
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.1em;
  }

  .hud-copy {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ══ RESPONSIVE ══════════════════════════════════════════ */
  @media (max-width: 900px) {
    .hud-side-widget { display: none; }
    .hud-container { padding: 32px 24px; }
    .stack-marquee { max-width: 100%; }
    .hud-copy { display: none; }
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
