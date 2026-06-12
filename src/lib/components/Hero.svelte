<script lang="ts">
  import { onMount } from "svelte";
  import { countUp } from "$lib/actions/countUp";
  import {
    Check,
    Laptop,
    Palette,
    Cog,
    Target,
    Hand,
    Star,
    Lightbulb,
    Rocket,
    Sparkles,
  } from "@lucide/svelte";

  let visible = $state(false);

  const stats = [
    { num: "1+", label: "Tahun Exp" },
    { num: "10+", label: "Project" },
    { num: "15+", label: "Tech Stack" },
  ];

  const heroImages = [
    {
      src: "https://i.pinimg.com/1200x/44/d4/04/44d4049bb0cea0723e61dce8403ef1ff.jpg",
      alt: "Code editor",
      tag: "Full-stack",
    },
    {
      src: "https://i.pinimg.com/1200x/8c/b9/f4/8cb9f40b7e0ff3008e2e9143a81b2d96.jpg",
      alt: "UI/UX Design",
      tag: "UI/UX",
    },
    {
      src: "https://i.pinimg.com/736x/a4/7b/3a/a47b3a9486c7626ce527a130fbe1a874.jpg",
      alt: "Database",
      tag: "Backend",
    },
  ];

  const floatingStickers = [
    {
      icon: Star,
      style: "top:18%;left:6%;animation-delay:0s;color:var(--yellow);",
    },
    {
      icon: Lightbulb,
      style: "top:30%;right:7%;animation-delay:1s;color:var(--orange);",
    },
    {
      icon: Rocket,
      style: "bottom:30%;left:5%;animation-delay:2s;color:var(--pink);",
    },
    {
      icon: Sparkles,
      style: "bottom:22%;right:5%;animation-delay:0.5s;color:var(--teal);",
    },
  ];

  let mouseX = $state(0);
  let mouseY = $state(0);
  let heroEl: HTMLElement | null = $state(null);

  function handleMouseMove(e: MouseEvent) {
    if (!heroEl) return;
    const { left, top, width, height } = heroEl.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX = x;
    mouseY = y;
  }

  function handleMouseLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  onMount(() => {
    if (document.body.classList.contains("loading")) {
      const observer = new MutationObserver(() => {
        if (!document.body.classList.contains("loading")) {
          visible = true;
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

      const t = setTimeout(() => {
        visible = true;
        observer.disconnect();
      }, 4000);

      return () => {
        clearTimeout(t);
        observer.disconnect();
      };
    } else {
      visible = true;
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section id="hero" bind:this={heroEl} onmousemove={handleMouseMove} onmouseleave={handleMouseLeave} class="hero" style="--mx: {mouseX}; --my: {mouseY};">
  <div class="cinematic-glow" aria-hidden="true"></div>

  <div class="blob-yellow" aria-hidden="true"></div>
  <div class="blob-teal" aria-hidden="true"></div>

  {#each floatingStickers as s}
    {@const Icon = s.icon}
    <span class="float-star" style={s.style} aria-hidden="true">
      <Icon size={28} strokeWidth={2.5} />
    </span>
  {/each}

  <div class="hero-inner">
    <div class="hero-text">
      <div class="hero-badge" class:visible>
        <span class="pulse-dot"></span>
        <Check size={14} strokeWidth={3} />
        Siap untuk Peluang Baru!
      </div>

      <h1
        class="hero-headline"
        class:visible
        aria-label="Dwi Wahyu Fauzan — Fullstack Developer"
      >
        <span class="word">
          <span class="word-inner" style="transition-delay:0.3s">Dwi</span>
        </span>
        <span class="word">
          <span class="word-inner" style="transition-delay:0.45s">Wahyu</span>
        </span>
        <br />
        <span class="word accent-word">
          <span class="word-inner" style="transition-delay:0.6s">Fauzan</span>
        </span>
      </h1>

      <div class="role-badge" class:visible>
        <span class="role-pill">
          Fullstack Developer
          <Laptop size={16} class="role-icon" />
        </span>
      </div>

      <p class="hero-desc" class:visible>
        Membangun digital produk yang <strong>bermakna dan menyenangkan</strong>
        <Palette
          size={16}
          style="display:inline-block; vertical-align:middle; margin-left: 4px; color: var(--pink);"
        />
        dari <strong>frontend elegan</strong> hingga
        <strong>backend yang solid</strong>.
      </p>

      <div class="hero-btns" class:visible>
        <a href="#projects" class="btn-primary hover-lift">
          Lihat Project <Target size={16} style="margin-left: 6px;" />
        </a>
        <a href="#contact" class="btn-secondary hover-lift">
          Hubungi Saya <Hand size={16} style="margin-left: 6px;" />
        </a>
      </div>

      <div class="hero-stats" class:visible>
        {#each stats as s, i}
          <div class="stat-box" style="animation-delay: {1.5 + i * 0.1}s">
            <div class="stat-num" use:countUp={s.num}>{s.num}</div>
            <div class="stat-lbl">{s.label}</div>
          </div>
        {/each}
      </div>
    </div>

    <div class="hero-visual" class:visible>
      <svg class="mood-string" viewBox="0 0 400 400" preserveAspectRatio="none">
        <path d="M 120,80 C 250,100 350,200 280,320" />
      </svg>

      {#each heroImages as img, i}
        <div class="hero-card scatter-{i}">
          <img src={img.src} alt={img.alt} loading="lazy" />
          <span class="hero-card-tag glass-tag">
            {#if i === 0}
              <Laptop size={14} strokeWidth={2.5} style="margin-right: 6px;" />
            {:else if i === 1}
              <Palette size={14} strokeWidth={2.5} style="margin-right: 6px;" />
            {:else}
              <Cog size={14} strokeWidth={2.5} style="margin-right: 6px;" />
            {/if}
            {img.tag}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ── 1. BASE LAYOUT & LIGHTING ── */
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 140px 0 80px;
    position: relative;
    overflow: hidden;
  }

  .cinematic-glow {
    position: absolute;
    top: 10%;
    right: 5%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(var(--ink-rgb), 0.03) 0%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  :global([data-theme="dark"]) .cinematic-glow {
    display: none;
  }

  /* Hide cartoon blobs and stickers */
  .blob-yellow,
  .blob-teal,
  :global(.float-star) {
    display: none !important;
  }

  .hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    width: 100%;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  /* ── 2. TYPOGRAPHY & REVEALS ── */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--ink);
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 8px 20px;
    border: 1px solid rgba(var(--ink-rgb), 0.2);
    border-radius: 99px;
    margin-bottom: 32px;
    width: fit-content;
    opacity: 0;
    transform: translateY(10px);
  }
  
  @keyframes spring-in {
    0% { opacity: 0; transform: scale(0.8) translateY(20px); }
    65% { transform: scale(1.05) translateY(-4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .hero-badge.visible {
    animation: spring-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    animation: pulse-ring 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
  }

  @keyframes pulse-ring {
    to {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
  }

  .hero-headline {
    font-family: var(--font-head);
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: var(--ink);
    text-transform: uppercase;
    overflow: hidden;
  }

  .word {
    display: inline-block;
    overflow: hidden;
    margin-right: 0.15em;
  }
  .word-inner {
    display: inline-block;
    transform: translateY(100%) skewY(6deg);
    opacity: 0;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hero-headline.visible .word-inner {
    transform: translateY(0) skewY(0);
    opacity: 1;
  }

  /* Cinematic Spotlight Effect on Accent Word */
  .spotlight-text {
    background: linear-gradient(
      120deg,
      var(--ink) 0%,
      rgba(var(--ink-rgb), 0.4) 40%,
      var(--ink) 80%
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: spotlight-sweep 4s linear infinite;
  }

  @keyframes spotlight-sweep {
    to {
      background-position: 200% center;
    }
  }

  .accent-word::before {
    display: none !important;
  }

  /* ── 3. BADGES & DESCRIPTIONS ── */
  .role-badge {
    display: flex;
    margin-top: 24px;
    opacity: 0;
  }
  .role-badge.visible {
    animation: spring-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s forwards;
  }
  .role-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(var(--ink-rgb), 0.03);
    color: var(--ink);
    font-family: var(--font-head);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 8px 18px;
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 99px;
  }

  .hero-desc {
    font-size: 1.05rem;
    color: rgba(var(--ink-rgb), 0.85);
    line-height: 1.7;
    max-width: 500px;
    margin: 28px 0 40px;
    font-weight: 500;
    opacity: 0;
    transform: translateY(10px);
  }
  .hero-desc.visible {
    animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
  }
  .hero-desc strong {
    color: var(--ink);
    font-weight: 700;
  }

  /* ── 4. BUTTONS & STATS ── */
  .hero-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    opacity: 0;
    transform: translateY(10px);
  }
  .hero-btns.visible {
    animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
  }

  .hover-lift {
    transition:
      transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.3s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -10px rgba(var(--ink-rgb), 0.3);
  }

  .hero-stats {
    display: flex;
    gap: 20px;
    margin-top: 56px;
    flex-wrap: wrap;
    opacity: 1; /* Handled by child animations */
  }

  .stat-box {
    position: relative;
    padding: 20px 28px;
    text-align: left;
    min-width: 130px;
    border-left: 2px solid rgba(var(--ink-rgb), 0.1);
    background: transparent;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.4s ease;
  }
  .hero-stats.visible .stat-box {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .stat-box:hover {
    border-left-color: var(--ink);
    background: rgba(var(--ink-rgb), 0.02);
    padding-left: 36px; /* Smooth indent effect */
  }

  .stat-num {
    font-family: var(--font-head);
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 6px;
    color: var(--ink);
  }
  .stat-lbl {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(var(--ink-rgb), 0.6);
  }

  /* ── 5. CINEMATIC MOODBOARD VISUAL ── */
  .hero-visual {
    position: relative;
    width: 100%;
    height: 550px;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero-visual.visible {
    animation: blur-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
  }

  @keyframes blur-reveal {
    0% {
      opacity: 0;
      filter: blur(10px);
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
    }
  }

  .mood-string {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  .mood-string path {
    fill: none;
    stroke: rgba(var(--ink-rgb), 0.2);
    stroke-width: 2;
    stroke-dasharray: 6 6;
    animation: dash-flow 20s linear infinite;
  }

  @keyframes dash-flow {
    to {
      stroke-dashoffset: -100;
    }
  }

  .hero-card {
    position: absolute;
    background: #fff;
    padding: 10px;
    padding-bottom: 35px; /* Polaroid bottom lip */
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 4px 10px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 2;
  }

  /* Specific Positioning for the Moodboard Grid with drift animations */
  @keyframes float-0 {
    0%, 100% {
      transform: translate(calc(var(--mx) * -30px), calc(var(--my) * -30px + 0px)) rotate(-6deg);
    }
    50% {
      transform: translate(calc(var(--mx) * -30px + 3px), calc(var(--my) * -30px - 10px)) rotate(-5deg);
    }
  }
  @keyframes float-1 {
    0%, 100% {
      transform: translate(calc(var(--mx) * 20px), calc(var(--my) * 20px + 0px)) rotate(4deg);
    }
    50% {
      transform: translate(calc(var(--mx) * 20px - 4px), calc(var(--my) * 20px + 8px)) rotate(6deg);
    }
  }
  @keyframes float-2 {
    0%, 100% {
      transform: translate(calc(var(--mx) * -15px), calc(var(--my) * 15px + 0px)) rotate(-2deg);
    }
    50% {
      transform: translate(calc(var(--mx) * -15px + 2px), calc(var(--my) * 15px - 6px)) rotate(-1deg);
    }
  }

  .scatter-0 {
    /* Top Left - Code */
    width: 260px;
    top: 10%;
    left: 5%;
    z-index: 3;
    animation: float-0 6s ease-in-out infinite;
  }
  .scatter-1 {
    /* Center Right - UI/UX (Focus Image) */
    width: 300px;
    top: 25%;
    right: 0%;
    z-index: 4;
    box-shadow: 8px 15px 30px rgba(0, 0, 0, 0.12);
    animation: float-1 7s ease-in-out infinite;
  }
  .scatter-1 img {
    background-color: #dc2626 !important;
    mix-blend-mode: multiply;
  }
  .scatter-2 {
    /* Bottom Left - DB */
    width: 240px;
    bottom: 5%;
    left: 20%;
    z-index: 2;
    animation: float-2 5s ease-in-out infinite;
  }

  .hero-card img {
    width: 100%;
    height: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transition: filter 0.6s ease;
  }

  /* Glassmorphism Tape */
  .polaroid-tape {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%) rotate(-3deg);
    width: 70px;
    height: 25px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    z-index: 10;
    transition: all 0.4s ease;
  }

  /* Hover Effects */
  .hero-card {
    position: absolute;
    background: #fff;
    padding: 10px;
    padding-bottom: 35px; /* Polaroid bottom lip */
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 4px 10px 25px rgba(0, 0, 0, 0.08);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    z-index: 2;
  }
  .hero-card:hover {
    transform: scale(1.06) rotate(0deg) !important;
    animation: none !important;
    z-index: 10;
    box-shadow: 15px 25px 40px rgba(0, 0, 0, 0.15);
  }
  .hero-card:hover img {
    filter: grayscale(0%) contrast(1);
  }
  .hero-card:hover .polaroid-tape {
    opacity: 0;
    transform: translateX(-50%) translateY(-15px);
  }

  .glass-tag {
    position: absolute;
    bottom: -15px; /* Hang slightly off the polaroid */
    right: 10px;
    background: rgba(var(--ink-rgb), 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(var(--white-rgb), 0.2);
    border-radius: 6px;
    padding: 6px 14px;
    display: flex;
    align-items: center;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--bg);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .hero-card:hover .glass-tag {
    transform: translateY(-4px) scale(1.05);
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ── 6. RESPONSIVE ── */
  @media (max-width: 1024px) {
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 60px;
      padding: 0 24px;
    }

    .hero-visual {
      height: auto;
      min-height: 400px;
    }

    .mood-string {
      display: none;
    } /* Hide string on tablet/mobile */

    /* Adjust grid for smaller screens */
    .scatter-0 {
      top: 0;
      left: 0;
      width: 45%;
    }
    .scatter-1 {
      top: 10%;
      right: 0;
      width: 50%;
      z-index: 5;
    }
    .scatter-2 {
      bottom: 0;
      left: 15%;
      width: 45%;
    }
  }

  @media (max-width: 768px) {
    .hero-visual {
      display: none; /* Keep hidden on very small screens as per original code */
    }
    .hero {
      padding: 120px 0 60px;
    }
    .hero-stats {
      flex-direction: column;
      gap: 12px;
    }
    .stat-box {
      border-left: none;
      border-bottom: 1px solid rgba(var(--ink-rgb), 0.1);
      padding: 16px 0;
    }
    .stat-box:hover {
      padding-left: 12px;
      border-bottom-color: var(--ink);
    }
  }
</style>
