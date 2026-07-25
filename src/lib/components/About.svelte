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
    ArrowRight,
  } from "@lucide/svelte";

  const values = [
    { icon: Target,    title: "Problem Solver",    sub: "Pendekatan analitis & berbasis data" },
    { icon: Users,     title: "Team Player",        sub: "Komunikatif dalam tim Agile" },
    { icon: BookOpen,  title: "Always Learning",    sub: "Selalu update dengan tech terbaru" },
    { icon: Lightbulb, title: "Creative Thinker",   sub: "Solusi inovatif untuk problem kompleks" },
  ];

  const roles = ["Fullstack Developer", "Backend Engineer", "Frontend Creator", "Problem Solver"];
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
        typingSpeed = 50;
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingSpeed = 120;
      }
      if (!isDeleting && currentText === fullText) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }
      timer = setTimeout(tick, typingSpeed);
    }
    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  });
</script>

<section id="about" class="section">
  <div class="container">
    <!-- Header -->
    <div class="reveal reveal-zoom-out" style="margin-bottom:48px;">
      <div class="section-label"><User size={12} /> About Me</div>
      <h2 class="section-title">Passion & Expertise</h2>
    </div>

    <!-- Bento Grid -->
    <div class="about-bento">
      <!-- Bio Card — spans 2 cols -->
      <div class="about-card about-bio reveal reveal-slide-left reveal-d1">
        <div class="card-index">01</div>
        <div class="section-label" style="margin-bottom:16px;"><BookOpen size={12} /> Bio</div>
        <p class="about-text">
          Halo! Saya adalah <span class="typewriter-container"><strong class="typewriter-text">{currentText}</strong><span class="typewriter-cursor">|</span></span>
          dengan pengalaman lebih dari <strong>1 tahun</strong> membangun aplikasi web modern yang keren.
          <Rocket size={14} style="display:inline-block; vertical-align:middle; margin-left: 4px;" />
        </p>
        <p class="about-text" style="margin-top:16px;">
          Dari startup hingga enterprise, saya percaya bahwa kode terbaik adalah yang <strong>bersih, scalable, dan menyenangkan</strong> untuk dibaca!
          Stack favorit: <strong>SvelteKit, Node.js,</strong> dan <strong>PostgreSQL</strong>.
        </p>
        <div class="about-tags">
          <span class="about-tag"><Sparkles size={12} /> Clean Code</span>
          <span class="about-tag"><Activity size={12} /> Agile / Scrum</span>
          <span class="about-tag"><Link size={12} /> API Design</span>
          <span class="about-tag"><Zap size={12} /> Performance</span>
          <span class="about-tag"><Palette size={12} /> UI/UX Mindset</span>
          <span class="about-tag"><Server size={12} /> DevOps</span>
        </div>
      </div>

      <!-- Photo Card -->
      <div class="about-card about-photo reveal reveal-slide-right reveal-d2">
        <div class="card-index">02</div>
        <div class="photo-inner">
          <img src={profilePhoto} alt="Profile Photo" class="photo-img" />
        </div>
        <span class="photo-label">Dwi Wahyu Fauzan</span>
      </div>

      <!-- Values Card -->
      <div class="about-card about-values reveal reveal-slide-left reveal-d3">
        <div class="card-index">03</div>
        <div class="section-label" style="margin-bottom:16px;">💎 My Values</div>
        <div class="values-list">
          {#each values as v}
            {@const Icon = v.icon}
            <div class="value-row">
              <div class="value-icon-wrap"><Icon size={18} /></div>
              <div>
                <div class="value-title">{v.title}</div>
                <div class="value-sub">{v.sub}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Availability Card -->
      <div class="about-card about-avail reveal reveal-slide-right reveal-d4">
        <div class="card-index" style="color: rgba(255,255,255,0.3);">04</div>
        <div class="avail-status">
          <span class="avail-dot"></span>
          Open to Work!
        </div>
        <h3 class="avail-headline">Siap untuk<br /><em>Kolaborasi</em> Seru!</h3>
        <p class="avail-text">
          Tertarik untuk freelance, full-time, atau project menarik? Yuk ngobrol!
          <Coffee size={14} style="display:inline-block; vertical-align:middle; margin-left: 4px;" />
        </p>
        <a href="#contact" class="avail-cta">
          <span>Kontak Saya</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* ─── BENTO GRID ─────────────────────────────────────────── */
  .about-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* ─── BASE CARD STYLE (matches Skills bento style) ──────── */
  .about-card {
    position: relative;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 4px 4px 0 var(--ink);
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .about-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--ink);
  }

  /* Card index number watermark */
  .card-index {
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--ink);
    opacity: 0.22;
    margin-bottom: 8px;
  }

  /* ─── BIO CARD ───────────────────────────────────────────── */
  .about-bio {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  .about-text {
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.7;
    font-weight: 500;
    opacity: 0.85;
  }

  .typewriter-container { display: inline; }
  .typewriter-text { font-weight: 800; color: var(--ink); opacity: 1; }
  .typewriter-cursor {
    display: inline-block;
    margin-left: 2px;
    font-weight: 300;
    animation: cursor-blink 0.8s step-start infinite;
  }
  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    margin-top: auto;
    padding-top: 20px;
  }

  .about-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(var(--ink-rgb), 0.04);
    border: 1px solid rgba(var(--ink-rgb), 0.14);
    border-radius: 99px;
    padding: 5px 12px;
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink);
    transition: background 0.2s, border-color 0.2s, transform 0.2s var(--ease-out);
  }

  .about-tag:hover {
    background: var(--ink);
    color: var(--white);
    border-color: var(--ink);
    transform: translateY(-2px);
  }

  /* ─── PHOTO CARD ─────────────────────────────────────────── */
  .about-photo {
    grid-column: 3;
    grid-row: 1 / 3;
    padding: 20px;
    gap: 12px;
  }

  .photo-inner {
    flex: 1;
    border-radius: 16px;
    overflow: hidden;
    border: 1.5px solid rgba(var(--ink-rgb), 0.12);
  }

  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    filter: grayscale(100%) contrast(1.1);
    transition: filter 0.5s var(--ease-out), transform 0.5s var(--ease-out);
  }

  .about-photo:hover .photo-img {
    filter: grayscale(0%) contrast(1);
    transform: scale(1.03);
  }

  .photo-label {
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0.5;
    text-align: center;
    padding-top: 4px;
  }

  /* ─── VALUES CARD ────────────────────────────────────────── */
  .about-values {
    grid-column: 1;
    grid-row: 2;
  }

  .values-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
  }

  .value-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(var(--ink-rgb), 0.08);
    transition: transform 0.2s var(--ease-out);
  }
  .value-row:last-child { border-bottom: none; }
  .value-row:hover { transform: translateX(6px); }

  .value-icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(var(--ink-rgb), 0.05);
    border: 1px solid rgba(var(--ink-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s var(--ease-out);
  }
  .value-row:hover .value-icon-wrap {
    background: var(--ink);
    color: var(--white);
    transform: scale(1.1);
  }

  .value-title {
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.02em;
  }
  .value-sub {
    font-size: 0.78rem;
    color: var(--ink);
    opacity: 0.6;
    margin-top: 2px;
  }

  /* ─── AVAILABILITY CARD ──────────────────────────────────── */
  .about-avail {
    grid-column: 2;
    grid-row: 2;
    background: var(--ink);
    border-color: var(--ink);
    box-shadow: 4px 4px 0 rgba(var(--ink-rgb), 0.3);
    justify-content: center;
  }

  .about-avail:hover {
    box-shadow: 7px 7px 0 rgba(var(--ink-rgb), 0.3);
  }

  .avail-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 99px;
    padding: 5px 14px;
    font-family: var(--font-head);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    width: fit-content;
    margin-bottom: 16px;
  }

  .avail-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    animation: avail-pulse 2s infinite ease-in-out;
  }

  @keyframes avail-pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .avail-headline {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 12px;
  }

  .avail-headline em {
    font-style: normal;
    color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  .avail-text {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .avail-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--white);
    color: var(--ink);
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 800;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    width: fit-content;
    transition: transform 0.2s var(--ease-out), gap 0.2s;
  }
  .avail-cta:hover {
    transform: translateX(4px);
    gap: 14px;
  }

  /* ─── RESPONSIVE ─────────────────────────────────────────── */
  @media (max-width: 900px) {
    .about-bento {
      grid-template-columns: repeat(2, 1fr);
    }
    .about-bio { grid-column: 1 / 3; grid-row: 1; }
    .about-photo { grid-column: 2; grid-row: 2; aspect-ratio: 3/4; }
    .about-values { grid-column: 1; grid-row: 2; }
    .about-avail { grid-column: 1 / 3; grid-row: 3; }
  }

  @media (max-width: 600px) {
    .about-bento { grid-template-columns: 1fr; gap: 16px; }
    .about-bio, .about-photo, .about-values, .about-avail {
      grid-column: 1;
      grid-row: auto;
    }
    .about-card { padding: 22px 20px; }
    .about-photo { aspect-ratio: 3/4; min-height: 340px; }
  }
</style>
