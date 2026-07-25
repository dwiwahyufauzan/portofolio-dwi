<script lang="ts">
  import { onMount } from 'svelte';
  import { sound } from '$lib/utils/audio';

  let pct = $state(0);
  let hidden = $state(false);
  let loaded = $state(false);

  const words = [
    "INITIALIZING SYSTEM",
    "COMPOSING ARCHITECTURE",
    "BUILDING UI/UX ENGINE",
    "OPTIMIZING PERFORMANCE",
    "PREPARING EXPERIENCE",
    "DWISYCOO!"
  ];

  let activeIndex = $derived(
    pct < 20 ? 0 :
    pct < 40 ? 1 :
    pct < 60 ? 2 :
    pct < 80 ? 3 :
    pct < 100 ? 4 : 5
  );

  let lastMilestone = 0;

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

    // Lock scroll during preloader
    document.body.classList.add('loading');
    sessionStorage.setItem('hasLoaded', 'true');

    const duration = 1600; // 1.6s smooth preloader
    const start = performance.now();
    let animationFrameId: number;

    function animate(time: number) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // High-performance organic progress curve
      const easeProgress = Math.pow(progress, 0.72);
      pct = easeProgress * 100;

      // Audio feedback on every 25% milestone
      const currentQuarter = Math.floor(pct / 25);
      if (currentQuarter > lastMilestone && currentQuarter <= 4) {
        lastMilestone = currentQuarter;
        sound.playClick(500 + currentQuarter * 100, 0.03);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        pct = 100;
        sound.playPop();
        setTimeout(() => {
          loaded = true; // Trigger curtain slide reveal
          setTimeout(() => {
            hidden = true;
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('preloader-active');
          }, 900); // Curtain exit complete
        }, 350);
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
    <!-- Staggered vertical curtain panels with high-end grid backdrop -->
    <div class="preloader-panel pane-1"></div>
    <div class="preloader-panel pane-2"></div>
    <div class="preloader-panel pane-3"></div>
    <div class="preloader-panel pane-4"></div>

    <!-- Main preloader overlay content -->
    <div class="preloader-content" class:fade-out={loaded}>
      <!-- Top header bar -->
      <div class="preloader-header">
        <span class="brand-sub">PORTFOLIO '26</span>
        <span class="status-indicator">
          <span class="pulse-dot"></span> SYSTEM READY
        </span>
      </div>

      <!-- Center visual: Giant counter + Status roll -->
      <div class="preloader-center">
        <div class="preloader-pct">
          {String(Math.floor(pct)).padStart(3, '0')}
        </div>
        
        <div class="word-carousel">
          <div class="word-list" style="transform: translateY(-{activeIndex * 32}px);">
            {#each words as word}
              <div class="word-item">{word}</div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Bottom progress track -->
      <div class="progress-track-wrapper">
        <span class="progress-label">BOOT SEQUENCE</span>
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
    background-size: 36px 36px;
    background-image: 
      linear-gradient(to right, rgba(var(--ink-rgb), 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--ink-rgb), 0.03) 1px, transparent 1px);
    transition: transform 0.72s var(--ease-drawer);
    will-change: transform;
    z-index: 1;
    border-right: 1px solid rgba(var(--ink-rgb), 0.05);
  }

  .pane-1 { left: 0%; }
  .pane-2 { left: 25%; }
  .pane-3 { left: 50%; }
  .pane-4 { left: 75%; border-right: none; }

  /* Alternating slide exit for ultra-modern entrance */
  .preloader.loaded .pane-1 { transform: translateY(-100%); transition-delay: 0.0s; }
  .preloader.loaded .pane-2 { transform: translateY(100%); transition-delay: 0.04s; }
  .preloader.loaded .pane-3 { transform: translateY(-100%); transition-delay: 0.08s; }
  .preloader.loaded .pane-4 { transform: translateY(100%); transition-delay: 0.12s; }

  /* Content Overlay */
  .preloader-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 56px 40px;
    pointer-events: none;
    transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
  }

  .preloader-content.fade-out {
    opacity: 0;
    transform: translateY(-16px);
  }

  .preloader-header {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: rgba(var(--ink-rgb), 0.45);
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

  /* Center Visual */
  .preloader-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .preloader-pct {
    font-family: var(--font-head);
    font-size: clamp(5.5rem, 18vw, 13rem);
    font-weight: 900;
    color: var(--ink);
    line-height: 0.85;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
  }

  /* Vertical Word Carousel */
  .word-carousel {
    height: 32px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 16px;
  }

  .word-list {
    display: flex;
    flex-direction: column;
    transition: transform 0.4s var(--ease-out);
  }

  .word-item {
    height: 32px;
    line-height: 32px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: var(--ink);
    text-align: center;
  }

  /* Progress Track */
  .progress-track-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    width: min(380px, 84vw);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: rgba(var(--ink-rgb), 0.45);
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

  @media (prefers-reduced-motion: reduce) {
    .preloader-panel {
      transition: opacity 0.3s ease !important;
    }
    .preloader.loaded .pane-1,
    .preloader.loaded .pane-2,
    .preloader.loaded .pane-3,
    .preloader.loaded .pane-4 {
      transform: none !important;
      opacity: 0;
    }
  }
</style>
