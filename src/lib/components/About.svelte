<script lang="ts">
  import { onMount } from "svelte";
  import profilePhoto from "$lib/assets/d-1.jpg";
  import {
    User,
    BookOpen,
    Rocket,
    Target,
    Users,
    Lightbulb,
    Coffee,
    Hand,
    Sparkles,
    Link,
    Zap,
    Activity,
    Server,
    Palette,
  } from "@lucide/svelte";

  const values = [
    {
      icon: Target,
      title: "Problem Solver",
      sub: "Pendekatan analitis & berbasis data",
    },
    {
      icon: Users,
      title: "Team Player",
      sub: "Komunikatif dalam tim Agile",
    },
    {
      icon: BookOpen,
      title: "Always Learning",
      sub: "Selalu update dengan tech terbaru",
    },
    {
      icon: Lightbulb,
      title: "Creative Thinker",
      sub: "Solusi inovatif untuk problem kompleks",
    },
  ];

  const roles = [
    "Fullstack Developer",
    "Backend Engineer",
    "Frontend Creator",
    "Problem Solver",
  ];

  let roleIndex = $state(0);
  let currentText = $state("");
  let isDeleting = $state(false);
  let typingSpeed = $state(150);

  onMount(() => {
    let timer: any;

    function tick() {
      const fullText = roles[roleIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typingSpeed = 50; // Deleting speed
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingSpeed = 120; // Typing speed
      }

      if (!isDeleting && currentText === fullText) {
        typingSpeed = 2200; // Pause after word finished
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      timer = setTimeout(tick, typingSpeed);
    }

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  });
</script>

<section id="about" class="section">
  <div class="section-curtain curtain-horizontal" aria-hidden="true">
    <div class="section-curtain-panel pane-1"></div>
    <div class="section-curtain-panel pane-2"></div>
    <div class="section-curtain-panel pane-3"></div>
    <div class="section-curtain-panel pane-4"></div>
  </div>

  <div class="container">
    <div class="reveal reveal-zoom-out" style="margin-bottom:48px;">
      <div class="section-label">
        <User size={12} /> About Me
      </div>
      <h2 class="section-title">Passion & Expertise</h2>
    </div>

    <div class="bento">
      <div class="cartoon-card about-main reveal reveal-slide-left reveal-d1">
        <div class="card-grid-bg"></div>
        <div class="section-label" style="margin-bottom:16px;">
          <BookOpen size={12} /> Bio
        </div>
        <p class="about-text">
          Halo! Saya adalah <span class="typewriter-container"
            ><strong class="typewriter-text">{currentText}</strong><span
              class="typewriter-cursor">|</span
            ></span
          >
          dengan pengalaman lebih dari
          <strong>1 tahun</strong> membangun aplikasi web modern yang keren.
          <Rocket
            size={14}
            class="floating-icon"
            style="display:inline-block; vertical-align:middle; margin-left: 4px;"
          />
        </p>
        <p class="about-text" style="margin-top:16px;">
          Dari startup hingga enterprise, saya percaya bahwa kode terbaik adalah
          yang
          <strong>bersih, scalable, dan menyenangkan</strong> untuk dibaca!
          Stack favorit: <strong class="highlight">SvelteKit, Node.js,</strong>
          dan
          <strong class="highlight">PostgreSQL</strong>.
        </p>
        <div class="about-tags">
          <span class="about-tag">
            <Sparkles size={12} style="margin-right: 4px;" /> Clean Code
          </span>
          <span class="about-tag">
            <Activity size={12} style="margin-right: 4px;" /> Agile / Scrum
          </span>
          <span class="about-tag">
            <Link size={12} style="margin-right: 4px;" /> API Design
          </span>
          <span class="about-tag">
            <Zap size={12} style="margin-right: 4px;" /> Performance
          </span>
          <span class="about-tag">
            <Palette size={12} style="margin-right: 4px;" /> UI/UX Mindset
          </span>
          <span class="about-tag">
            <Server size={12} style="margin-right: 4px;" /> DevOps
          </span>
        </div>
      </div>

      <div class="cartoon-card about-photo reveal reveal-slide-right reveal-d2">
        <div class="photo-shine"></div>
        <img src={profilePhoto} alt="Profile Photo" class="photo-img" />
      </div>

      <div class="cartoon-card about-values reveal reveal-slide-left reveal-d3">
        <div class="section-label" style="margin-bottom:16px;">
          💎 My Values
        </div>
        <div class="values-list">
          {#each values as v}
            {@const Icon = v.icon}
            <div class="value-row">
              <span class="value-emoji">
                <Icon size={18} />
              </span>
              <div>
                <div class="value-title">{v.title}</div>
                <div class="value-sub">{v.sub}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="cartoon-card about-avail reveal reveal-slide-right reveal-d4">
        <div class="avail-glow-border"></div>

        <div class="avail-badge-cartoon">
          <span class="avail-dot-blue"></span>
          Open to Work!
        </div>
        <div class="avail-headline">
          Siap untuk<br /><span class="avail-em">Kolaborasi</span> Seru!
          <Rocket
            size={20}
            class="rocket-icon"
            style="display:inline-block; vertical-align:middle; margin-left: 6px;"
          />
        </div>
        <p class="avail-text">
          Tertarik untuk freelance, full-time, atau project menarik? Yuk
          ngobrol!
          <Coffee
            size={14}
            style="display:inline-block; vertical-align:middle; margin-left: 4px;"
          />
        </p>
        <a href="#contact" class="btn-primary avail-btn">
          <span>Kontak Saya</span>
          <Hand size={14} style="margin-left: 6px;" />
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* ─── BENTO GRID ─── */
  .bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    align-items: stretch;
  }

  /* ─── CARDS BASE ─── */
  .cartoon-card {
    position: relative;
    background: var(--white);
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 4px; /* Slightly sharper edges for modern feel */
    overflow: hidden;
    z-index: 1;
    transition:
      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.4s ease,
      border-color 0.4s ease;
  }

  .about-main {
    grid-column: 1 / 3;
    grid-row: 1;
    padding: 40px;
  }

  .card-grid-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      rgba(var(--ink-rgb), 0.05) 1px,
      transparent 1px
    );
    background-size: 20px 20px;
    opacity: 0.5;
    z-index: -1;
    pointer-events: none;
  }

  /* ─── POLAROID PHOTO CARD (UNIQUE AESTHETIC) ─── */
  .about-photo {
    grid-column: 3;
    grid-row: 1 / 3;
    padding: 12px; /* White border like a polaroid */
    padding-bottom: 40px; /* Thicker bottom for authentic polaroid look */
    background: var(--white);
    border: 1px solid rgba(var(--ink-rgb), 0.2);
    box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.08);
    transform: rotate(3deg) translateY(10px); /* Tilted */
    display: flex;
    flex-direction: column;
    overflow: visible; /* Important for the tape to show outside */
  }

  /* Glassmorphism Tape */
  .polaroid-tape {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%) rotate(-4deg);
    width: 60px;
    height: 24px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    z-index: 10;
    transition:
      opacity 0.3s,
      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .about-photo:hover {
    transform: rotate(0deg) scale(1.02) translateY(-8px);
    box-shadow: 12px 20px 30px rgba(0, 0, 0, 0.12);
    z-index: 10;
  }
  .about-photo:hover .polaroid-tape {
    opacity: 0; /* Tape disappears/lifts off when hovered */
    transform: translateX(-50%) rotate(-10deg) translateY(-20px);
  }

  .photo-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transition:
      filter 0.6s var(--ease),
      transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    border-radius: 2px;
  }

  .about-photo:hover .photo-img {
    filter: grayscale(0%) contrast(1);
    transform: scale(1.03);
  }

  /* ─── ABOUT VALUES ─── */
  .about-values {
    grid-column: 1;
    grid-row: 2;
    padding: 32px;
  }

  /* ─── AVAILABILITY CARD (DARK MODE STYLE) ─── */
  .about-avail {
    grid-column: 2;
    grid-row: 2;
    padding: 32px;
    background: var(--ink);
    color: var(--bg);
    border: none; /* Let the pseudo-element handle border */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Animated Glowing Edge */
  .avail-glow-border {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.5px;
    background: linear-gradient(
      90deg,
      var(--blue),
      var(--yellow),
      var(--pink),
      var(--blue)
    );
    background-size: 300% 100%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    animation: border-flow 4s linear infinite;
  }

  @keyframes border-flow {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 300% 0%;
    }
  }

  /* ─── HOVER INTERACTIONS ─── */
  .about-main:hover,
  .about-values:hover,
  .about-avail:hover {
    transform: translateY(-8px);
    box-shadow: 10px 15px 0px rgba(var(--ink-rgb), 0.06);
    border-color: var(--ink);
  }

  /* ─── TYPOGRAPHY & TAGS ─── */
  .about-text {
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.7;
    font-weight: 500;
  }
  .about-text .highlight {
    position: relative;
    display: inline-block;
    color: var(--ink);
    font-weight: 700;
  }
  /* Subtle highlight sweep */
  .about-text .highlight::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--accent);
    opacity: 0.3;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .about-main:hover .highlight::after {
    transform: scaleX(1);
  }

  .floating-icon {
    animation: float-up-down 3s ease-in-out infinite;
  }
  @keyframes float-up-down {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  .typewriter-container {
    white-space: nowrap;
    display: inline-block;
  }
  .typewriter-text {
    font-weight: 800;
    color: var(--ink);
  }
  .typewriter-cursor {
    display: inline-block;
    margin-left: 2px;
    font-weight: 300;
    color: var(--accent);
    animation: cursor-blink 0.8s step-start infinite;
  }

  /* Modern Tag Animation */
  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }
  .about-tag {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid rgba(var(--ink-rgb), 0.2);
    border-radius: var(--radius);
    padding: 6px 14px;
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  /* Shine effect inside tag */
  .about-tag::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(var(--ink-rgb), 0.1),
      transparent
    );
    transform: skewX(-20deg);
    transition: left 0.5s ease;
  }
  .about-tag:hover {
    border-color: var(--ink);
    background: rgba(var(--ink-rgb), 0.03);
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(var(--ink-rgb), 0.08);
  }
  .about-tag:hover::before {
    left: 150%;
  }

  /* ─── VALUES LIST ─── */
  .values-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .value-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 12px;
    border-bottom: 1px solid rgba(var(--ink-rgb), 0.08);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
    position: relative;
  }
  .value-row:last-child {
    border-bottom: none;
  }
  .value-row::before {
    content: "";
    position: absolute;
    left: 0;
    top: 15%;
    height: 70%;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: bottom;
  }
  .value-row:hover::before {
    transform: scaleY(1);
    transform-origin: top;
  }
  /* Hover slide-in and bounce icon */
  .value-row:hover {
    transform: translateX(8px);
    background: rgba(var(--ink-rgb), 0.02);
  }
  .value-row:hover .value-emoji {
    transform: scale(1.2) rotate(5deg);
    color: var(--accent);
  }
  .value-emoji {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink);
    flex-shrink: 0;
    transition:
      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      color 0.3s ease;
  }
  .value-title {
    font-family: var(--font-head);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .value-sub {
    font-size: 0.85rem;
    color: rgba(var(--ink-rgb), 0.7);
    margin-top: 2px;
    font-weight: 500;
  }

  /* ─── AVAILABILITY SECTION ─── */
  .avail-badge-cartoon {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--bg);
    font-family: var(--font-head);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid rgba(var(--bg-rgb), 0.25);
    border-radius: 99px;
    padding: 6px 14px;
    margin-bottom: 20px;
    width: fit-content;
  }

  .avail-dot-blue {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse-blue 2s infinite;
  }

  @keyframes pulse-blue {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
    }
  }

  .avail-headline {
    font-family: var(--font-head);
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    text-transform: uppercase;
    color: var(--bg);
    margin-bottom: 12px;
  }

  .about-avail:hover .rocket-icon {
    animation: wiggle 0.5s ease-in-out infinite alternate;
  }

  .avail-em {
    color: var(--bg);
    border-bottom: 2px solid var(--accent);
  }
  .avail-text {
    font-size: 0.95rem;
    color: rgba(var(--bg-rgb), 0.8);
    line-height: 1.6;
    font-weight: 500;
    margin-bottom: 24px;
  }

  /* Modern CTA Button with inner sweep */
  .avail-btn {
    position: relative;
    background: transparent;
    color: var(--bg);
    border: 1px solid var(--bg);
    width: fit-content;
    overflow: hidden;
    padding: 10px 24px;
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius);
    text-decoration: none;
    font-family: var(--font-head);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
    z-index: 1;
    transition: color 0.4s ease;
  }
  .avail-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .avail-btn:hover {
    color: var(--ink);
  }
  .avail-btn:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .bento {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .about-main {
      grid-column: 1 / 3;
      grid-row: 1;
    }
    .about-values {
      grid-column: 1;
      grid-row: 2;
    }
    .about-photo {
      grid-column: 2;
      grid-row: 2;
      aspect-ratio: 3/4; /* Portrait aspect ratio prevents cropping */
      transform: rotate(2deg); /* Subtle tilt for playfulness */
      padding: 10px;
      padding-bottom: 32px; /* Polaroid bottom border */
      overflow: visible;
    }
    .about-photo:hover {
      transform: rotate(0deg) scale(1.02) translateY(-4px);
    }
    .polaroid-tape {
      display: none; /* Hide tape on tablet for space */
    }
    .about-avail {
      grid-column: 1 / 3;
      grid-row: 3;
    }
  }

  @media (max-width: 640px) {
    .bento {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .about-main,
    .about-photo,
    .about-values,
    .about-avail {
      grid-column: 1;
      grid-row: auto;
    }
    .about-photo {
      aspect-ratio: 3/4; /* Keeps portrait polaroid aspect ratio on mobile */
      transform: rotate(0deg); /* Reset tilt on small mobile screens */
      padding: 8px;
      padding-bottom: 24px;
    }
  }
</style>
