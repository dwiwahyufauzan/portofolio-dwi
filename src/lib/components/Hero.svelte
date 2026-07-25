<script lang="ts">
  import { onMount } from "svelte";
  import { countUp } from "$lib/actions/countUp";
  import { Check, Target, Hand, Code2, Zap, Star, Eye, X } from "@lucide/svelte";

  // ── State ─────────────────────────────────────────────────
  let visible = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let heroEl: HTMLElement | null = $state(null);
  let activeCardIndex = $state<number | null>(null);
  let isCardLocked = $state(false);
  let modalOpen = $state(false);
  let modalImage = $state<(typeof heroImages)[0] | null>(null);

  // ── Data ──────────────────────────────────────────────────
  const stats = [
    { num: "1+",  label: "Tahun\nExperience" },
    { num: "10+", label: "Project\nCompleted" },
    { num: "15+", label: "Tech Stack\nMastered" },
  ];

  const heroImages = [
    {
      src: "https://i.pinimg.com/1200x/44/d4/04/44d4049bb0cea0723e61dce8403ef1ff.jpg",
      alt: "Fullstack System Architecture",
      tag: "Fullstack",
      index: "01",
      desc: "Sistem arsitektur web modern terintegrasi dengan performa tinggi dan respon kilat.",
    },
    {
      src: "https://i.pinimg.com/1200x/8c/b9/f4/8cb9f40b7e0ff3008e2e9143a81b2d96.jpg",
      alt: "UI/UX Interactive Design",
      tag: "UI/UX",
      index: "02",
      desc: "Perancangan antarmuka responsif dengan animasi mikro & user experience intuitif.",
    },
    {
      src: "https://i.pinimg.com/736x/a4/7b/3a/a47b3a9486c7626ce527a130fbe1a874.jpg",
      alt: "Scalable API Architecture",
      tag: "Backend",
      index: "03",
      desc: "Struktur backend scalable, ORM tercepat, dan integrasi REST/GraphQL aman.",
    },
  ];

  // ── Modal Handlers ────────────────────────────────────────
  function openModal(img: (typeof heroImages)[0]) {
    modalImage = img;
    modalOpen = true;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOpen = false;
    modalImage = null;
    document.body.style.overflow = "";
  }

  // ── Card Interaction ──────────────────────────────────────
  function onCardEnter(index: number) {
    activeCardIndex = index;
    isCardLocked = true;
    mouseX = 0;
    mouseY = 0;
  }

  function onCardLeave() {
    activeCardIndex = null;
    isCardLocked = false;
  }

  // ── Mouse 3D Parallax ────────────────────────────────────
  function onMouseMove(e: MouseEvent) {
    if (!heroEl || isCardLocked) return;
    const { left, top, width, height } = heroEl.getBoundingClientRect();
    mouseX = (e.clientX - left) / width - 0.5;
    mouseY = (e.clientY - top) / height - 0.5;
  }

  function onMouseLeave() {
    isCardLocked = false;
    activeCardIndex = null;
    mouseX = 0;
    mouseY = 0;
  }

  // ── Mount ─────────────────────────────────────────────────
  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    if (document.body.classList.contains("loading")) {
      const observer = new MutationObserver(() => {
        if (!document.body.classList.contains("loading")) {
          visible = true;
          observer.disconnect();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      const t = setTimeout(() => { visible = true; observer.disconnect(); }, 4000);
      return () => { clearTimeout(t); observer.disconnect(); window.removeEventListener("keydown", onKey); };
    } else {
      visible = true;
    }
    return () => window.removeEventListener("keydown", onKey);
  });
</script>

<!-- ══ HERO SECTION ══════════════════════════════════════════ -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  id="hero"
  bind:this={heroEl}
  onmousemove={onMouseMove}
  onmouseleave={onMouseLeave}
  class="hero"
>
  <!-- Background grid accent -->
  <div class="hero-bg-accent" aria-hidden="true"></div>

  <div class="hero-inner">
    <!-- ─── LEFT: TEXT ──────────────────────────────────── -->
    <div class="hero-text" class:visible>
      <!-- Available badge -->
      <div class="hero-badge">
        <span class="live-dot"></span>
        <Check size={11} strokeWidth={3} />
        Available for Work
      </div>

      <!-- Headline -->
      <h1 class="hero-headline" aria-label="Dwi Wahyu Fauzan — Fullstack Developer">
        <span class="hl-line">
          <span class="hl-word" style="--d:0.1s">Dwi</span>
          <span class="hl-word" style="--d:0.2s">Wahyu</span>
        </span>
        <span class="hl-line">
          <span class="hl-word" style="--d:0.32s">Fauzan</span>
        </span>
      </h1>

      <!-- Role tag -->
      <div class="hero-role">
        <span class="role-pill">
          <Code2 size={13} />
          Fullstack Software Engineer
          <Star size={11} style="opacity:0.45" />
        </span>
      </div>

      <!-- Description -->
      <p class="hero-desc">
        Membangun sistem web & aplikasi modern yang <strong>presisi, elegan, dan siap scale</strong>
        — dari <strong>UI/UX responsif</strong> hingga <strong>arsitektur backend solid</strong>.
      </p>

      <!-- CTA Buttons -->
      <div class="hero-btns">
        <a href="#projects" class="btn-primary">
          <Target size={14} />
          Lihat Project
        </a>
        <a href="#contact" class="btn-outline">
          <Hand size={14} />
          Hubungi Saya
        </a>
      </div>

      <!-- Stats Card -->
      <div class="hero-stats-card">
        {#each stats as s, i}
          <div class="stat-item">
            <span class="stat-num" use:countUp={s.num}>{s.num}</span>
            <span class="stat-lbl">{s.label}</span>
          </div>
          {#if i < stats.length - 1}
            <div class="stat-sep" aria-hidden="true"></div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- ─── RIGHT: IMAGE DECK ───────────────────────────── -->
    <div class="hero-visual" class:visible aria-label="Portfolio preview cards">
      <!-- 3D tilt wrapper — only tilts when not locked -->
      <div
        class="deck"
        class:locked={isCardLocked}
        style="--rx:{isCardLocked ? 0 : mouseY}; --ry:{isCardLocked ? 0 : mouseX};"
      >
        {#each heroImages as img, i}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div
            class="deck-card deck-card-{i}"
            class:active={activeCardIndex === i}
            role="button"
            tabindex="0"
            onclick={() => openModal(img)}
            onmouseenter={() => onCardEnter(i)}
            onmouseleave={onCardLeave}
            ontouchstart={() => onCardEnter(i)}
            ontouchend={() => onCardLeave()}
          >
            <figure class="deck-img-wrap">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div class="deck-overlay" aria-hidden="true">
                <span class="deck-overlay-chip">
                  <Eye size={12} />
                  Preview
                </span>
              </div>
            </figure>

            <div class="deck-footer">
              <span class="deck-idx">{img.index}</span>
              <span class="deck-tag">{img.tag}</span>
              <Zap size={11} style="opacity:0.35; color:var(--ink);" />
            </div>
          </div>
        {/each}
      </div>

      <!-- Floating tag -->
      <div class="hero-float-tag" aria-hidden="true">
        <span class="float-dot"></span>
        Fullstack Dev
      </div>
    </div>
  </div>
</section>

<!-- ══ LIGHTBOX MODAL ════════════════════════════════════════ -->
{#if modalOpen && modalImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="modal-overlay"
    onclick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    role="dialog"
    aria-modal="true"
    aria-label="Image preview"
  >
    <div class="modal-box">
      <button class="modal-close" onclick={closeModal} aria-label="Close modal" type="button">
        <X size={16} strokeWidth={2.5} />
      </button>
      <div class="modal-img-wrap">
        <img class="modal-img" src={modalImage.src} alt={modalImage.alt} />
      </div>
      <div class="modal-body">
        <span class="modal-index">SHOWCASE #{modalImage.index}</span>
        <h3 class="modal-title">{modalImage.alt}</h3>
        <p class="modal-desc">{modalImage.desc}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ═══ HERO ════════════════════════════════════════════════ */
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 0 72px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle top-right corner accent blob */
  .hero-bg-accent {
    position: absolute;
    top: -160px;
    right: -160px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--ink-rgb), 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .hero-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 48px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  /* ══ LEFT: TEXT ══════════════════════════════════════════ */
  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Available badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    box-shadow: 3px 3px 0 var(--ink);
    font-family: var(--font-head);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    width: fit-content;
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
  }

  .hero-text.visible .hero-badge { opacity: 1; transform: translateY(0); }

  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink);
    animation: live-pulse 2s ease-in-out infinite;
  }

  @keyframes live-pulse {
    0%, 100% { opacity: 0.35; transform: scale(0.8); }
    50%       { opacity: 1;    transform: scale(1.2); }
  }

  /* Headline */
  .hero-headline {
    font-family: var(--font-head);
    font-size: clamp(3rem, 5.5vw, 5.8rem);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.04em;
    color: var(--ink);
    margin-bottom: 24px;
  }

  .hl-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0.28em;
    overflow: hidden;
    padding-bottom: 0.1em;
  }

  .hl-word {
    display: inline-block;
    transform: translateY(110%);
    transition: transform 0.72s cubic-bezier(0.32, 0.72, 0, 1) var(--d, 0s);
  }

  .hero-text.visible .hl-word { transform: translateY(0); }

  /* Role pill */
  .hero-role {
    margin-bottom: 22px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--ease-out) 0.05s, transform 0.4s var(--ease-out) 0.05s;
  }

  .hero-text.visible .hero-role { opacity: 1; transform: translateY(0); }

  .role-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    box-shadow: 3px 3px 0 var(--ink);
    font-family: var(--font-head);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--ink);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }

  .role-pill:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--ink); }
  .role-pill:active { transform: scale(0.97); }

  /* Description */
  .hero-desc {
    font-size: 0.96rem;
    line-height: 1.72;
    color: var(--ink);
    max-width: 490px;
    margin-bottom: 32px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--ease-out) 0.1s, transform 0.4s var(--ease-out) 0.1s;
  }

  .hero-text.visible .hero-desc { opacity: 0.8; transform: translateY(0); }

  /* Buttons */
  .hero-btns {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--ease-out) 0.15s, transform 0.4s var(--ease-out) 0.15s;
  }

  .hero-text.visible .hero-btns { opacity: 1; transform: translateY(0); }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--ink);
    color: var(--white);
    font-family: var(--font-head);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 12px;
    border: 1.5px solid var(--ink);
    box-shadow: 4px 4px 0 rgba(var(--ink-rgb), 0.22);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }

  .btn-primary:hover { transform: translate(-3px,-3px); box-shadow: 7px 7px 0 rgba(var(--ink-rgb), 0.22); }
  .btn-primary:active { transform: scale(0.96); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--white);
    color: var(--ink);
    font-family: var(--font-head);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 12px;
    border: 1.5px solid var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }

  .btn-outline:hover { transform: translate(-3px,-3px); box-shadow: 7px 7px 0 var(--ink); }
  .btn-outline:active { transform: scale(0.96); }

  /* Stats Card */
  .hero-stats-card {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 16px 22px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--ink);
    width: fit-content;
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 0.4s var(--ease-out) 0.2s,
      transform 0.4s var(--ease-out) 0.2s,
      box-shadow 0.22s var(--ease-out);
  }

  .hero-stats-card:hover { box-shadow: 6px 6px 0 var(--ink); transform: translateY(-2px); }

  .hero-text.visible .hero-stats-card { opacity: 1; transform: translateY(0); }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 18px;
  }

  .stat-item:first-child { padding-left: 0; }

  .stat-num {
    font-family: var(--font-head);
    font-size: 1.9rem;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .stat-lbl {
    font-family: var(--font-head);
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink);
    opacity: 0.45;
    margin-top: 4px;
    white-space: pre-line;
    line-height: 1.35;
  }

  .stat-sep {
    width: 1px;
    height: 34px;
    background: rgba(var(--ink-rgb), 0.15);
    flex-shrink: 0;
  }

  /* ══ RIGHT: IMAGE DECK ═══════════════════════════════════ */
  .hero-visual {
    position: relative;
    height: 580px;
    opacity: 0;
    transform: scale(0.95) translateY(16px);
    transition: opacity 0.8s var(--ease-out) 0.25s, transform 0.8s var(--ease-out) 0.25s;
  }

  .hero-visual.visible { opacity: 1; transform: scale(1) translateY(0); }

  /* 3D tilt deck container */
  .deck {
    position: relative;
    width: 100%;
    height: 100%;
    transform:
      perspective(1100px)
      rotateX(calc(var(--rx, 0) * -7deg))
      rotateY(calc(var(--ry, 0) * 7deg));
    transition: transform 0.38s var(--ease-out);
    transform-style: preserve-3d;
  }

  .deck.locked {
    transform: perspective(1100px) rotateX(0deg) rotateY(0deg);
  }

  /* ── Card Base ── */
  .deck-card {
    position: absolute;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.38s var(--ease-out), box-shadow 0.38s var(--ease-out), z-index 0s;
  }

  /* Card positions & sizes */
  .deck-card-0 {
    width: 370px;
    height: 265px;
    top: 1%;
    left: 3%;
    z-index: 3;
    box-shadow: 5px 5px 0 var(--ink);
    transform: rotate(-4.5deg);
  }
  .deck-card-1 {
    width: 325px;
    height: 235px;
    top: 44%;
    right: 1%;
    z-index: 2;
    box-shadow: 5px 5px 0 var(--ink);
    transform: rotate(3.5deg);
  }
  .deck-card-2 {
    width: 295px;
    height: 210px;
    bottom: 2%;
    left: 3%;
    z-index: 1;
    box-shadow: 5px 5px 0 var(--ink);
    transform: rotate(-2deg);
  }

  /* Hover / active: lift & straighten */
  .deck-card.active,
  .deck-card:focus-visible {
    z-index: 10 !important;
    transform: rotate(0deg) translateY(-8px) scale(1.04) !important;
    box-shadow: 10px 10px 0 var(--ink) !important;
  }

  /* Image wrapper */
  .deck-img-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .deck-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s var(--ease-out);
  }

  .deck-card.active .deck-img-wrap img { transform: scale(1.07); }

  /* Hover overlay */
  .deck-overlay {
    position: absolute;
    inset: 0;
    background: rgba(var(--ink-rgb), 0.4);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.28s var(--ease-out);
  }

  .deck-card.active .deck-overlay,
  .deck-card:hover .deck-overlay { opacity: 1; }

  .deck-overlay-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--white);
    color: var(--ink);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    padding: 6px 14px;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: 3px 3px 0 var(--ink);
  }

  /* Card footer */
  .deck-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border-top: 1.5px solid var(--ink);
    background: var(--white);
    flex-shrink: 0;
  }

  .deck-idx {
    font-family: var(--font-mono, monospace);
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--ink);
    opacity: 0.3;
    letter-spacing: 0.06em;
  }

  .deck-tag {
    font-family: var(--font-head);
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--ink);
    flex: 1;
  }

  /* Floating label */
  .hero-float-tag {
    position: absolute;
    top: 10px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 7px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 99px;
    box-shadow: 3px 3px 0 var(--ink);
    padding: 5px 14px;
    font-family: var(--font-head);
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink);
    z-index: 4;
    animation: float 4s ease-in-out infinite;
  }

  .float-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink);
    opacity: 0.5;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-7px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-float-tag { animation: none; }
    .deck { transform: none !important; }
    .deck-card-0, .deck-card-1, .deck-card-2 { transform: none !important; }
  }

  /* ══ LIGHTBOX MODAL ══════════════════════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(var(--ink-rgb), 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: overlay-in 0.25s var(--ease-out);
  }

  @keyframes overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .modal-box {
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 28px;
    max-width: 620px;
    width: 100%;
    overflow: hidden;
    position: relative;
    box-shadow: 8px 8px 0 var(--ink);
    animation: modal-pop 0.3s var(--ease-drawer);
  }

  @keyframes modal-pop {
    from { opacity: 0; transform: scale(0.9) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--white);
    border: 1.5px solid var(--ink);
    color: var(--ink);
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 0 var(--ink);
    transition: transform 0.18s var(--ease-out), box-shadow 0.18s var(--ease-out);
  }

  .modal-close:hover { transform: scale(1.12); box-shadow: 4px 4px 0 var(--ink); }

  .modal-img-wrap { position: relative; }

  .modal-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
    border-bottom: 1.5px solid var(--ink);
  }

  .modal-body { padding: 24px 28px; }

  .modal-index {
    font-family: var(--font-head);
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0.4;
    display: block;
    margin-bottom: 6px;
  }

  .modal-title {
    font-family: var(--font-head);
    font-size: 1.35rem;
    font-weight: 900;
    color: var(--ink);
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .modal-desc {
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--ink);
    opacity: 0.75;
  }

  /* ══ RESPONSIVE ══════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .hero-visual { height: 420px; }
    .deck-card-0 { width: 310px; height: 220px; }
    .deck-card-1 { width: 270px; height: 192px; }
    .deck-card-2 { width: 245px; height: 172px; }
  }

  @media (max-width: 640px) {
    .hero { padding: 96px 0 60px; }
    .hero-inner { padding: 0 20px; gap: 32px; }

    .hero-headline { font-size: clamp(2.5rem, 10vw, 4rem); }

    .hero-btns { flex-direction: column; width: 100%; }
    .btn-primary, .btn-outline { width: 100%; justify-content: center; }

    .hero-visual { height: 340px; }

    .deck-card-0 { width: 240px; height: 172px; top: 0;    left: 2%; }
    .deck-card-1 { width: 220px; height: 156px; top: 50px; right: 2%; }
    .deck-card-2 { width: 200px; height: 142px; top: 126px; left: 12%; }

    .stat-item { padding: 0 12px; }
    .stat-num  { font-size: 1.55rem; }

    .hero-float-tag { display: none; }
  }
</style>
