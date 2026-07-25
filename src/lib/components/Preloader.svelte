<script lang="ts">
  import { onMount } from 'svelte';

  let pct = $state(0);
  let hidden = $state(false);
  let loaded = $state(false);

  const words = [
    "MEMULAI DATA",
    "MERANCANG STRUKTUR",
    "MENYUSUN KODE",
    "OPTIMISASI SISTEM",
    "MENYIAPKAN HALAMAN",
    "DWF!"
  ];

  let activeIndex = $derived(
    pct < 20 ? 0 :
    pct < 40 ? 1 :
    pct < 60 ? 2 :
    pct < 80 ? 3 :
    pct < 100 ? 4 : 5
  );

  onMount(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      pct = 100;
      loaded = true;
      hidden = true;
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('preloader-active');
      return;
    }

    // Prevent scrolling during load
    document.body.classList.add('loading');
    sessionStorage.setItem('hasLoaded', 'true');

    const duration = 1800; // 1.8 seconds loading
    const start = performance.now();

    let animationFrameId: number;

    function animate(time: number) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Organic progress curve
      const easeProgress = Math.pow(progress, 0.7);
      pct = easeProgress * 100;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        pct = 100;
        setTimeout(() => {
          loaded = true; // Trigger panel curtain slide-up
          setTimeout(() => {
            hidden = true;
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('preloader-active');
          }, 1100); // Allow curtain animation to finish
        }, 500);
      }
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('preloader-active');
    };
  });
</script>

{#if !hidden}
  <div class="preloader" class:loaded={loaded} aria-hidden="true">
    <!-- Vertical curtain panels for staggered agency entrance with integrated grid backdrop -->
    <div class="preloader-panel pane-1"></div>
    <div class="preloader-panel pane-2"></div>
    <div class="preloader-panel pane-3"></div>
    <div class="preloader-panel pane-4"></div>

    <!-- Preloader content overlaying the curtains -->
    <div class="preloader-content" class:fade-out={loaded}>
      <!-- Top Section Info -->
      <div class="preloader-header">
        <span class="brand-sub">PORTFOLIO '26</span>
        <span class="status-indicator">
          <span class="pulse-dot"></span> SYSTEM ACTIVE
        </span>
      </div>

      <!-- Main Center Visual (Gigantic Percentage + Rolling Word) -->
      <div class="preloader-center">
        <div class="preloader-pct">
          {String(Math.floor(pct)).padStart(3, '0')}
        </div>
        
        <div class="word-carousel">
          <div class="word-list" style="transform: translateY(-{activeIndex * 30}px);">
            {#each words as word}
              <div class="word-item">{word}</div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Clean minimal progress line at bottom -->
      <div class="progress-track-wrapper">
        <span class="progress-label">BOOTING SEQUENCE</span>
        <div class="progress-track">
          <div class="progress-fill" style="width: {pct}%"></div>
          <div class="progress-glow" style="left: {pct}%"></div>
        </div>
        <span class="progress-num">{Math.floor(pct)}%</span>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body.loading) {
    overflow: hidden !important;
  }

  .preloader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Curtain Panels */
  .preloader-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 25%;
    background: var(--bg);
    /* Grid lines blueprint background drawn directly on panels so they slide together */
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(var(--ink-rgb), 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--ink-rgb), 0.02) 1px, transparent 1px);
    transition: transform 0.65s var(--ease-drawer);
    will-change: transform;
    z-index: 1;
    border-right: 1px solid rgba(var(--ink-rgb), 0.04);
  }

  .pane-1 { left: 0%; }
  .pane-2 { left: 25%; }
  .pane-3 { left: 50%; }
  .pane-4 { left: 75%; border-right: none; }

  /* Alternating slide directions for ultra-modern entrance */
  .preloader.loaded .pane-1 { transform: translateY(-100%); transition-delay: 0.0s; }
  .preloader.loaded .pane-2 { transform: translateY(100%); transition-delay: 0.05s; }
  .preloader.loaded .pane-3 { transform: translateY(-100%); transition-delay: 0.1s; }
  .preloader.loaded .pane-4 { transform: translateY(100%); transition-delay: 0.15s; }

  /* Content Container overlay */
  .preloader-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 60px 40px;
    pointer-events: none;
    transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
  }

  .preloader-content.fade-out {
    opacity: 0;
    transform: translateY(-20px);
  }

  .preloader-header {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(var(--ink-rgb), 0.4);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .pulse-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--ink);
    border-radius: 50%;
    margin-right: 6px;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  /* Giant numeric loading percentage */
  .preloader-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .preloader-pct {
    font-family: var(--font-head);
    font-size: clamp(5.5rem, 18vw, 12rem);
    font-weight: 800;
    color: var(--ink);
    line-height: 0.85;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 40px rgba(var(--ink-rgb), 0.05);
  }

  /* Vertical Rolling Word Carousel */
  .word-carousel {
    height: 30px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 20px;
  }

  .word-list {
    display: flex;
    flex-direction: column;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .word-item {
    height: 30px;
    line-height: 30px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--ink);
    text-align: center;
  }

  /* Sleek modern loading progress track at bottom */
  .progress-track-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    width: min(360px, 80vw);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: rgba(var(--ink-rgb), 0.4);
    letter-spacing: 0.05em;
  }
  .progress-label {
    text-transform: uppercase;
    white-space: nowrap;
  }
  .progress-track {
    flex: 1;
    height: 2px;
    background: rgba(var(--ink-rgb), 0.08);
    position: relative;
    overflow: visible;
  }
  .progress-fill {
    height: 100%;
    background: var(--ink);
    transition: width 0.05s linear;
  }
  .progress-glow {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: var(--ink);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--ink);
    transition: left 0.05s linear;
  }
  .progress-num {
    font-variant-numeric: tabular-nums;
    width: 32px;
    text-align: right;
  }
</style>
