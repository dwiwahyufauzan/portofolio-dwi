<script lang="ts">
  import { ArrowUp } from "@lucide/svelte";
  import logoImg from "$lib/assets/logo.png";

  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: "https://github.com/dwiwahyufauzan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/dwiwahyufauzan" },
    { label: "Instagram", href: "https://instagram.com/dwiwahyufauzan" },
  ];

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<footer class="footer" aria-label="Site footer">
  <div class="footer-inner">
    <!-- Left: Brand + Copyright -->
    <div class="footer-left">
      <a href="#hero" class="footer-logo" aria-label="Back to top">
        <img src={logoImg} alt="Logo" class="footer-logo-img" />
      </a>
      <p class="footer-copy">
        © {year} Dwi Wahyu Fauzan. All rights reserved.
      </p>
    </div>

    <!-- Center: Tag line -->
    <p class="footer-tagline" aria-hidden="true">Built with Love</p>

    <!-- Right: Socials + Back to top -->
    <div class="footer-right">
      <nav class="footer-socials" aria-label="Social links">
        {#each socials as s}
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-link"
          >
            {s.label}
          </a>
        {/each}
      </nav>
      <button
        class="footer-top-btn"
        onclick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
      >
        <ArrowUp size={14} strokeWidth={2} />
      </button>
    </div>
  </div>
</footer>

<!-- Giant Editorial PORTFOLIO Banner -->
<div class="footer-giant-banner" aria-hidden="true">
  <h1 class="giant-portfolio-text">PORTFOLIO</h1>
</div>

<style>
  .footer {
    background: var(--bg-alt, #f5f4f0);
    color: var(--ink, #111111);
    border-top: 1px solid var(--border, #e2e2e2);
    padding: 0 60px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .footer-inner {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  /* ─── Left ────────────────────────────────────────────────── */
  .footer-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .footer-logo-img {
    height: 50px;
    width: auto;
    object-fit: contain;
    background: transparent;
    border: none;
    border-radius: 0;
    filter: none;
    transition: transform 0.3s var(--ease);
  }
  .footer-logo:hover .footer-logo-img {
    transform: scale(1.08);
  }

  .footer-copy {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--ink-3, #888888);
  }

  /* ─── Center ──────────────────────────────────────────────── */
  .footer-tagline {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: var(--ink-3, #888888);
    text-align: center;
  }

  /* ─── Right ───────────────────────────────────────────────── */
  .footer-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .footer-socials {
    display: flex;
    gap: 20px;
  }

  .footer-social-link {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-2, #444444);
    text-decoration: none;
    transition: color 0.2s var(--ease);
  }
  .footer-social-link:hover {
    color: var(--ink, #111111);
  }

  .footer-top-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border, #e2e2e2);
    color: var(--ink-2, #444444);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: transparent;
    transition:
      border-color 0.2s var(--ease),
      color 0.2s var(--ease),
      background 0.2s var(--ease);
  }
  .footer-top-btn:hover {
    border-color: var(--ink, #111111);
    color: var(--bg, #ffffff);
    background: var(--ink, #111111);
  }

  /* ─── Giant Editorial PORTFOLIO Banner ───────────────────── */
  .footer-giant-banner {
    width: 100%;
    overflow: hidden;
    background: var(--bg-alt, #f5f4f0);
    border-top: 1px solid var(--border, #e2e2e2);
    padding: 16px 0 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  .giant-portfolio-text {
    font-family: var(--font-head);
    font-size: clamp(4.5rem, 18vw, 22rem);
    font-weight: 900;
    line-height: 0.8;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px var(--ink, #111111);
    opacity: 1;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    position: relative;
    transform: none;
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 768px) {
    .footer {
      height: auto;
      padding: 24px;
    }
    .footer-inner {
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-tagline {
      display: none;
    }
    .footer-left {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    .footer-giant-banner {
      padding: 16px 0 24px;
    }
  }
</style>
