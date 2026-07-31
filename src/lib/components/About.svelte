<script lang="ts">
  import { onMount } from "svelte";
  import profilePhoto from "$lib/assets/www.png";
  import katanaPhoto from "$lib/assets/ppp.png";
  import { ArrowRight, Download } from "@lucide/svelte";

  let photoWrap: HTMLDivElement;
  let katanaEl: HTMLImageElement;
  let cursorRing: HTMLDivElement;

  // Target & current values (px, relative to photo)
  let tx = 0,
    ty = 0; // target cursor position
  let cx = 0,
    cy = 0; // current cursor position (lerped)
  let targetR = 0; // target radius
  let currentR = 0; // current radius (lerped)
  let isInside = false;
  let raf = 0;

  const RADIUS = 130; // spotlight radius
  const FEATHER = 40; // soft edge width in px
  const LERP_POS = 0.14; // position smoothness (lower = more lag)
  const LERP_R = 0.09; // radius smoothness (slower open/close)

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function tick() {
    // Smooth position
    cx = lerp(cx, tx, LERP_POS);
    cy = lerp(cy, ty, LERP_POS);
    // Smooth radius
    currentR = lerp(currentR, targetR, LERP_R);

    // Apply soft mask (radial gradient: opaque centre → transparent edge)
    if (katanaEl) {
      const inner = Math.max(0, currentR - FEATHER);
      katanaEl.style.maskImage = `-webkit-radial-gradient(circle ${inner}px at ${cx}px ${cy}px, black 0%, black ${inner}px, transparent ${currentR}px)`;
      katanaEl.style.webkitMaskImage = `radial-gradient(circle ${inner}px at ${cx}px ${cy}px, black 0%, black ${inner}px, transparent ${currentR}px)`;
    }

    // Move cursor ring
    if (cursorRing) {
      cursorRing.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${currentR > 4 ? 1 : 0.1})`;
      cursorRing.style.width = `${currentR * 2}px`;
      cursorRing.style.height = `${currentR * 2}px`;
      cursorRing.style.opacity = currentR > 4 ? "1" : "0";
    }

    raf = requestAnimationFrame(tick);
  }

  onMount(() => {
    // Intersection reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("#about .reveal").forEach((el) => io.observe(el));

    // Init mask (fully hidden)
    if (katanaEl) {
      katanaEl.style.maskImage =
        "radial-gradient(circle 0px at 50% 50%, transparent 100%)";
      katanaEl.style.webkitMaskImage =
        "radial-gradient(circle 0px at 50% 50%, transparent 100%)";
    }

    raf = requestAnimationFrame(tick);

    function onMove(e: MouseEvent) {
      const rect = photoWrap.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    }
    function onEnter(e: MouseEvent) {
      isInside = true;
      targetR = RADIUS;
      const rect = photoWrap.getBoundingClientRect();
      // Snap position instantly on enter (no lag on first appear)
      tx = cx = e.clientX - rect.left;
      ty = cy = e.clientY - rect.top;
      photoWrap.addEventListener("mousemove", onMove);
    }
    function onLeave() {
      isInside = false;
      targetR = 0;
      photoWrap.removeEventListener("mousemove", onMove);
    }

    photoWrap.addEventListener("mouseenter", onEnter);
    photoWrap.addEventListener("mouseleave", onLeave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      photoWrap.removeEventListener("mouseenter", onEnter);
      photoWrap.removeEventListener("mouseleave", onLeave);
      photoWrap.removeEventListener("mousemove", onMove);
    };
  });
</script>

<section id="about" class="about section">
  <div class="container">
    <!-- Section top row -->
    <div class="about-header reveal">
      <p class="section-eyebrow">01 — About</p>
      <a href="#projects" class="about-see-work">
        See Work <ArrowRight size={12} />
      </a>
    </div>

    <!-- Editorial two-column layout -->
    <div class="about-grid">
      <!-- Left: Headline + Description -->
      <div class="about-left">
        <h2 class="about-headline section-title reveal">
          <span class="hl-block">I Build</span>
          <span class="hl-block hl-italic">Things.</span>
        </h2>

        <div class="about-text-col reveal reveal-delay-1">
          <p class="about-para">
            Halo!, Saya <strong>Dwi Wahyu Fauzan</strong>, seorang Fullstack
            Software Engineer asal Indonesia. Saya membangun sistem web modern
            yang presisi, elegan, dan siap scale dari UI/UX responsif hingga
            arsitektur backend solid.
          </p>
          <p class="about-para">
            Dengan pengalaman di SvelteKit, Node.js, TypeScript, dan ekosistem
            database modern, saya berfokus pada performa, keterbacaan kode, dan
            pengalaman pengguna yang intuitif. Setiap proyek adalah kesempatan
            untuk membangun sesuatu yang benar-benar bermanfaat.
          </p>

          <div class="about-cta-row">
            <a href="#contact" class="btn btn-dark">Get in Touch</a>
            <a
              href="https://github.com/dwiwahyufauzan"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost"
            >
              GitHub Profile <ArrowRight size={12} />
            </a>
            <a
              href="/cv.pdf"
              download="CV-DwiWahyuFauzan.pdf"
              class="btn btn-ghost cv-btn"
              aria-label="Download CV Dwi Wahyu Fauzan"
            >
              <Download size={12} /> Download CV
            </a>
          </div>
        </div>
      </div>

      <!-- Right: Photo (spotlight lens reveal) -->
      <div class="about-right reveal reveal-delay-2">
        <div
          class="about-photo-wrap"
          bind:this={photoWrap}
          aria-label="Foto Dwi Wahyu Fauzan — gerakkan kursor untuk reveal katana"
        >
          <!-- Layer 1: Profile photo — always visible base -->
          <img
            src={profilePhoto}
            alt="Dwi Wahyu Fauzan"
            class="about-photo about-photo-profile"
            loading="lazy"
          />

          <!-- Layer 2: Katana — revealed by soft mask following cursor -->
          <img
            src={katanaPhoto}
            alt="Katana"
            class="about-photo about-photo-katana"
            bind:this={katanaEl}
            loading="lazy"
            aria-hidden="true"
          />

          <!-- Cursor ring (invisible — used only by JS for mask tracking) -->
          <div
            class="photo-cursor-ring"
            bind:this={cursorRing}
            aria-hidden="true"
          ></div>

          <div class="about-photo-label" aria-hidden="true">
            <span>DWI WAHYU FAUZAN</span>
            <span class="dot-sep">·</span>
            <span>FULLSTACK</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* ─── Section ─────────────────────────────────────────────── */
  .about {
    background: var(--bg-alt);
  }

  /* ─── Header Row ──────────────────────────────────────────── */
  .about-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 64px;
  }

  .about-see-work {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-2);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 7px;
    transition:
      color 0.2s var(--ease),
      gap 0.2s var(--ease);
  }
  .about-see-work:hover {
    color: var(--ink);
    gap: 12px;
  }

  /* ─── Two-Column Grid ─────────────────────────────────────── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 80px;
    align-items: start;
    margin-bottom: 80px;
  }

  /* ─── Headline ────────────────────────────────────────────── */
  .about-headline {
    font-family: var(--font-head);
    font-size: clamp(3.5rem, 6.5vw, 7rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.88;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 48px;
  }

  .hl-block {
    display: block;
  }
  .hl-italic {
    font-style: italic;
    font-weight: 300;
    letter-spacing: -0.04em;
  }

  /* ─── Text Column ─────────────────────────────────────────── */
  .about-text-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .about-para {
    font-size: 1rem;
    line-height: 1.78;
    color: var(--ink-2);
    max-width: 540px;
  }

  .about-para strong {
    color: var(--ink);
    font-weight: 600;
  }

  .about-cta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  /* ─── Photo Wrap ─────────────────────────────────────────── */
  .about-photo-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    cursor: none; /* custom cursor ring replaces OS cursor */
  }

  /* Shared sizing for both layers */
  .about-photo {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }

  /* ── Layer 1: Profile — base, always visible ──────────────── */
  .about-photo-profile {
    object-position: center top;
    filter: grayscale(100%);
    position: relative;
    z-index: 1;
  }

  /* ── Layer 2: Katana — mask controlled by JS ──────────────── */
  .about-photo-katana {
    object-position: center center;
    position: absolute;
    inset: 0;
    height: 100%;
    z-index: 2;
    /* Fully hidden by default — JS updates mask-image each frame */
    mask-image: radial-gradient(circle 0px at 50% 50%, transparent 100%);
    -webkit-mask-image: radial-gradient(
      circle 0px at 50% 50%,
      transparent 100%
    );
  }

  /* ── Cursor ring (invisible — only used as JS ref) ──────────── */
  .photo-cursor-ring {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    pointer-events: none;
    opacity: 0; /* always invisible */
    border-radius: 50%;
    will-change: transform, width, height;
  }

  .about-photo-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245, 245, 245, 0.7);
    z-index: 4;
  }

  .dot-sep {
    opacity: 0.35;
  }

  @media (prefers-reduced-motion: reduce) {
    .about-photo-katana {
      transition: none;
    }
    .photo-cursor-ring {
      transition: none;
    }
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }

  }

  @media (max-width: 640px) {
    .about-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .about-cta-row {
      flex-direction: column;
    }
    .about-cta-row .btn {
      justify-content: center;
    }
  }
</style>
