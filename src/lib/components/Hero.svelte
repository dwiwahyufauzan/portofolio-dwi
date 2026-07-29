<script lang="ts">
  import { onMount } from "svelte";
  import heroBg from "$lib/assets/guts-black-3840x2160-21420.png";

  let visible = $state(false);

  onMount(() => {
    if (!document.body.classList.contains("loading")) {
      visible = true;
      return;
    }
    const obs = new MutationObserver(() => {
      if (!document.body.classList.contains("loading")) {
        visible = true;
        obs.disconnect();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const t = setTimeout(() => { visible = true; obs.disconnect(); }, 5000);
    return () => { obs.disconnect(); clearTimeout(t); };
  });
</script>

<!-- ══ HERO — Cinematic Editorial Header ═════════════════════ -->
<section id="hero" class="hero" aria-label="Hero — Dwi Wahyu Fauzan">

  <!-- Background image — Full quality Guts Berserk figure -->
  <div class="hero-bg" aria-hidden="true">
    <img src={heroBg} alt="" class="hero-bg-img" draggable="false" />
  </div>

  <!-- Vignette Overlay for Text Contrast -->
  <div class="hero-overlay" aria-hidden="true"></div>

  <!-- Text block — bottom right corner -->
  <div class="hero-card" class:visible aria-label="Dwi Wahyu Fauzan — Fullstack Software Engineer">
    <p class="hero-label">Fullstack Software Engineer</p>
    <h1 class="hero-name">Dwi Wahyu<br />Fauzan.</h1>
    <div class="hero-links">
      <a href="#projects" class="hero-link">View Work</a>
      <span class="hero-link-sep" aria-hidden="true">/</span>
      <a href="#contact" class="hero-link">Contact</a>
    </div>
  </div>

  <!-- Bottom-left badge -->
  <div class="hero-avail" aria-hidden="true">
    <span class="avail-dot"></span>
    Available for work
  </div>

  <!-- Scroll indicator — bottom center -->
  <a href="#about" class="hero-scroll" aria-label="Scroll down">
    <span class="scroll-line"></span>
  </a>

</section>

<style>
  /* ─── Base ────────────────────────────────────────────────── */
  .hero {
    position: relative;
    width: 100vw;
    height: 100svh;
    min-height: 600px;
    background: #080808;
    color: #f5f5f5;
    overflow: hidden;
  }

  /* ─── Background ──────────────────────────────────────────── */
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: #080808;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-bg-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    display: block;
    user-select: none;
    filter: contrast(1.05) brightness(0.95);
    opacity: 1;
  }

  /* ─── Vignette Overlay ───────────────────────────────────── */
  .hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      /* Bottom-right vignette for text card readability */
      radial-gradient(
        ellipse 55% 45% at 100% 100%,
        rgba(5, 5, 5, 0.88) 0%,
        rgba(5, 5, 5, 0.55) 45%,
        transparent 75%
      ),
      /* Top navbar space tint */
      linear-gradient(
        to bottom,
        rgba(5, 5, 5, 0.4) 0%,
        transparent 16%
      ),
      /* Bottom edge tint */
      linear-gradient(
        to top,
        rgba(5, 5, 5, 0.5) 0%,
        transparent 20%
      );
  }

  /* ─── Text card — bottom right corner ────────────────────── */
  .hero-card {
    position: absolute;
    bottom: 52px;
    right: 60px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    gap: 10px;

    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.3s,
      transform 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
  }

  .hero-card.visible {
    opacity: 1;
    transform: none;
  }

  /* Role label */
  .hero-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(245, 245, 245, 0.5);
  }

  /* Name */
  .hero-name {
    font-family: var(--font-head);
    font-size: clamp(1.5rem, 3vw, 2.6rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #ffffff;
    text-transform: uppercase;
  }

  /* CTA links */
  .hero-links {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .hero-link {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245, 245, 245, 0.6);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }

  .hero-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.22s ease;
  }

  .hero-link:hover {
    color: #ffffff;
  }

  .hero-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .hero-link-sep {
    font-size: 0.55rem;
    color: rgba(245, 245, 245, 0.25);
  }

  /* ─── Available badge — bottom left ──────────────────────── */
  .hero-avail {
    position: absolute;
    bottom: 52px;
    left: 60px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245, 245, 245, 0.45);
  }

  .avail-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    animation: pulse 2.5s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.3); }
  }

  /* ─── Scroll indicator — bottom center ───────────────────── */
  .hero-scroll {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: block;
    padding-bottom: 28px;
  }

  .scroll-line {
    display: block;
    width: 1px;
    height: 48px;
    background: rgba(245, 245, 245, 0.35);
    margin: 0 auto;
    animation: scroll-grow 2.6s ease-in-out infinite;
    transform-origin: top;
  }

  @keyframes scroll-grow {
    0%    { transform: scaleY(0); opacity: 0; transform-origin: top; }
    40%   { transform: scaleY(1); opacity: 1; transform-origin: top; }
    60%   { transform: scaleY(1); opacity: 1; transform-origin: bottom; }
    100%  { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 768px) {
    .hero-bg-img {
      object-fit: cover;
      object-position: center 20%;
    }
    .hero-card  { right: 24px; bottom: 48px; }
    .hero-avail { left: 24px;  bottom: 48px; }
    .hero-name  { font-size: clamp(1.3rem, 5vw, 2rem); }
  }

  @media (max-width: 480px) {
    .hero-avail { display: none; }
    .hero-card  { right: 20px; bottom: 40px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-line { animation: none; opacity: 0.3; transform: none; }
    .avail-dot   { animation: none; }
    .hero-card   { transition: none; }
  }
</style>
