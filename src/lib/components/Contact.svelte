<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowRight } from "@lucide/svelte";
  import contactBg from "$lib/assets/contact.jpg";

  const socials = [
    { label: "GitHub", href: "https://github.com/dwiwahyufauzan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/dwiwahyufauzan" },
    { label: "Instagram", href: "https://instagram.com/dwisycoo" },
  ];

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll("#contact .reveal")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<section id="contact" class="contact section">
  <!-- Background Image — Monochrome (grayscale) -->
  <div class="contact-bg-layer" aria-hidden="true">
    <img src={contactBg} alt="" class="contact-bg-img" draggable="false" />
  </div>

  <div class="container contact-container">
    <!-- Left Aligned Content Box -->
    <div class="contact-left-wrapper">
      <!-- Eyebrow -->
      <p class="section-eyebrow reveal">06 — Contact</p>

      <!-- Headline -->
      <div class="contact-header reveal">
        <h2 class="section-title contact-headline">
          <span class="hl-block">Let's Work</span>
          <span class="hl-block hl-italic">Together.</span>
        </h2>
        <p class="contact-desc">
          Saya saat ini <strong
            >siap bekerja & melamar posisi baru (Open for Hire)</strong
          >. Jika perusahaan atau tim engineering Anda sedang mencari Fullstack
          Software Engineer yang siap berkontribusi, silakan hubungi saya
          melalui email langsung atau jejaring profesional di bawah ini.
        </p>
      </div>

      <!-- Quick Contact & Socials -->
      <div class="contact-info-row reveal reveal-delay-1">
        <a href="mailto:dwiwahyufauzan@gmail.com" class="contact-email-link">
          dwiwahyufauzan@gmail.com
          <ArrowRight size={16} />
        </a>
        <div class="contact-socials">
          {#each socials as s}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              {s.label}
            </a>
          {/each}
        </div>
      </div>

      <hr class="hr-line reveal" />
    </div>
  </div>
</section>

<style>
  /* ─── Section Base ────────────────────────────────────────── */
  .contact {
    position: relative;
    background: #080808;
    color: #ffffff;
    overflow: hidden;
  }

  /* ─── Background Layer (Monochrome Image) ──────────────────── */
  .contact-bg-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  .contact-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% center;
    /* Inverted white tone for dark section background */
    filter: grayscale(100%) contrast(0.85) brightness(1.1);
    opacity: 0.55;
    display: block;
    user-select: none;
  }

  /* ─── Container & Left Alignment ──────────────────────────── */
  .contact-container {
    position: relative;
    z-index: 1;
  }

  .contact-left-wrapper {
    max-width: 680px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  /* ─── Header ──────────────────────────────────────────────── */
  .contact-container :global(.section-eyebrow) {
    color: rgba(255, 255, 255, 0.45) !important;
  }
  .contact-container :global(.section-eyebrow::after) {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .contact-header {
    margin-bottom: 32px;
  }

  .contact-headline {
    color: #ffffff !important;
    margin-bottom: 20px;
  }

  .contact-headline :global(.hl-italic) {
    color: rgba(255, 255, 255, 0.55) !important;
  }

  .contact-desc {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.6);
    max-width: 520px;
  }

  /* ─── Info Row (Email & Socials) ─────────────────────────── */
  .contact-info-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 40px;
    width: 100%;
  }

  .contact-email-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: -0.01em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding-bottom: 4px;
    transition:
      gap 0.2s var(--ease),
      opacity 0.2s var(--ease);
  }
  .contact-email-link:hover {
    gap: 18px;
    opacity: 0.7;
  }

  .contact-socials {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .social-link {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color 0.2s var(--ease);
    position: relative;
  }
  .social-link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.22s var(--ease);
  }
  .social-link:hover {
    color: #ffffff;
  }
  .social-link:hover::after {
    transform: scaleX(1);
  }
</style>
