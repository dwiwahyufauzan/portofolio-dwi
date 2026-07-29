<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { ArrowUpRight, X } from "@lucide/svelte";

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let activeSection = $state("hero");
  let heroVisible = $state(true);

  function toggleMenu() {
    menuOpen = !menuOpen;
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }

  function closeMenu() {
    menuOpen = false;
    document.body.style.overflow = "";
  }

  onMount(() => {
    document.documentElement.removeAttribute("data-theme");

    // Scroll detection
    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Section detection
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            activeSection = e.target.id;
            heroVisible = e.target.id === "hero";
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    // Close menu on desktop resize
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) closeMenu();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  });

  const links = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  const socials = [
    { label: "GitHub", href: "https://github.com/dwiwahyufauzan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/dwiwahyufauzan" },
    { label: "Instagram", href: "https://instagram.com/dwiwahyufauzan" },
  ];

  const isOnHero = $derived(heroVisible && !scrolled);
</script>

<header
  class="navbar"
  class:scrolled
  class:on-hero={isOnHero}
  aria-label="Main navigation"
>
  <!-- Logo -->
  <a href="#hero" class="nav-logo" aria-label="Dwi Wahyu Fauzan — Home">
    <span class="logo-mark">Dwisycoo<span class="logo-dot">.</span></span>
  </a>

  <!-- Desktop Nav Links -->
  <nav class="nav-links" aria-label="Site sections">
    {#each links as link}
      <a
        href={link.href}
        class="nav-link"
        class:active={activeSection === link.id}
        aria-current={activeSection === link.id ? "page" : undefined}
      >
        {link.label}
      </a>
    {/each}
  </nav>

  <!-- Right Actions -->
  <div class="nav-actions">
    <!-- CTA -->
    <a href="#contact" class="nav-cta">
      <span>Hire Me</span>
    </a>

    <!-- Luxury Hamburger Button (Mobile) -->
    <button
      class="hamburger-btn"
      class:open={menuOpen}
      onclick={toggleMenu}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      type="button"
    >
      <span class="hamburger-label">{menuOpen ? "CLOSE" : "MENU"}</span>
      <div class="hamburger-lines">
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
      </div>
    </button>
  </div>
</header>

<!-- Mobile Menu Overlay (Luxury Fullscreen Dark Drawer) -->
{#if menuOpen}
  <div
    class="mobile-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation"
    transition:fade={{ duration: 280 }}
  >
    <!-- Overlay Top Bar -->
    <div class="mobile-top-bar">
      <a href="#hero" class="mobile-logo" onclick={closeMenu}>
        Dwisycoo<span class="logo-dot">.</span>
      </a>
      <button
        class="mobile-close-btn"
        onclick={closeMenu}
        aria-label="Close menu"
        type="button"
      >
        <X size={20} />
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="mobile-nav">
      {#each links as link, i}
        <a
          href={link.href}
          class="mobile-link"
          onclick={closeMenu}
          class:active={activeSection === link.id}
          in:fly={{ y: 24, duration: 400, delay: i * 70 }}
        >
          <span class="mobile-link-num">0{i + 1}</span>
          <span class="mobile-link-text">{link.label}</span>
          <ArrowUpRight size={22} class="mobile-link-arrow" />
        </a>
      {/each}
    </nav>

    <!-- Overlay Bottom Footer -->
    <div class="mobile-footer" in:fly={{ y: 20, duration: 400, delay: 300 }}>
      <div class="mobile-socials">
        {#each socials as s}
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-social-link"
          >
            {s.label}
          </a>
        {/each}
      </div>
      <a href="mailto:dwiwahyufauzan@gmail.com" class="mobile-email">
        dwiwahyufauzan@gmail.com
      </a>
    </div>
  </div>
{/if}

<style>
  /* ─── Navbar Base ─────────────────────────────────────────── */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 76px;
    transition:
      background 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      border-color 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      backdrop-filter 0.35s cubic-bezier(0.23, 1, 0.32, 1);

    /* Default: Hero overlay (dark) */
    background: transparent;
    border-bottom: 1px solid transparent;
    color: var(--hero-ink, #ffffff);
  }

  /* Scrolled State: Solid Light Backdrop */
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    color: #111111;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  }

  .navbar.on-hero {
    color: #ffffff;
  }

  /* ─── Logo ────────────────────────────────────────────────── */
  .nav-logo {
    display: flex;
    align-items: baseline;
    text-decoration: none;
    color: inherit;
    z-index: 1;
  }

  .logo-mark {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .logo-dot {
    color: #ef4444;
    font-weight: 900;
    margin-left: 1px;
  }

  /* ─── Nav Links (Desktop) ─────────────────────────────────── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .nav-link {
    font-family: var(--font-head);
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: inherit;
    text-decoration: none;
    opacity: 0.65;
    position: relative;
    padding: 6px 0;
    transition: opacity 0.22s var(--ease);
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-link:hover,
  .nav-link.active {
    opacity: 1;
  }
  .nav-link:hover::after,
  .nav-link.active::after {
    transform: scaleX(1);
  }

  /* ─── Right Actions ───────────────────────────────────────── */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-cta {
    font-family: var(--font-head);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* On hero */
  .on-hero .nav-cta {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(8px);
  }
  .on-hero .nav-cta:hover {
    background: #ffffff;
    color: #080808;
    border-color: #ffffff;
    transform: translateY(-1px);
  }

  /* Scrolled */
  .scrolled .nav-cta {
    background: #111111;
    color: #ffffff;
    border: 1px solid #111111;
  }
  .scrolled .nav-cta:hover {
    background: transparent;
    color: #111111;
    transform: translateY(-1px);
  }

  /* ─── Luxury Hamburger Button (Mobile) ────────────────────── */
  .hamburger-btn {
    display: none;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: inherit;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .scrolled .hamburger-btn {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.15);
    color: #111111;
  }

  .hamburger-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .hamburger-lines {
    width: 18px;
    height: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hamburger-lines .line {
    display: block;
    width: 100%;
    height: 1.5px;
    background: currentColor;
    border-radius: 1px;
    transition:
      transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.2s ease;
  }

  .hamburger-btn.open .line-1 {
    transform: translateY(5.25px) rotate(45deg);
  }
  .hamburger-btn.open .line-2 {
    opacity: 0;
  }
  .hamburger-btn.open .line-3 {
    transform: translateY(-5.25px) rotate(-45deg);
  }

  /* ─── Mobile Overlay (Luxury Dark Cinematic Drawer) ───────── */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: #080808;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 32px 40px;
    overflow-y: auto;
  }

  .mobile-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-logo {
    font-family: var(--font-head);
    font-size: 1.2rem;
    font-weight: 900;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: -0.03em;
  }

  .mobile-close-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .mobile-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 40px 0;
  }

  .mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-head);
    font-size: clamp(2.2rem, 9vw, 3.8rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.25s ease;
  }

  .mobile-link:hover,
  .mobile-link.active {
    color: #ffffff;
    padding-left: 8px;
    border-bottom-color: rgba(255, 255, 255, 0.3);
  }

  .mobile-link-num {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.35);
  }

  .mobile-link.active .mobile-link-num,
  .mobile-link:hover .mobile-link-num {
    color: #ef4444;
  }

  .mobile-link-arrow {
    opacity: 0;
    transform: translate(-10px, 10px);
    transition: all 0.25s ease;
    color: #ffffff;
  }

  .mobile-link:hover .mobile-link-arrow,
  .mobile-link.active .mobile-link-arrow {
    opacity: 1;
    transform: none;
  }

  /* Overlay Footer */
  .mobile-footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
  }

  .mobile-socials {
    display: flex;
    gap: 24px;
  }

  .mobile-social-link {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .mobile-social-link:hover {
    color: #ffffff;
  }

  .mobile-email {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 900px) {
    .navbar {
      padding: 0 36px;
    }
    .nav-links {
      gap: 28px;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 0 20px;
      height: 68px;
    }
    .nav-links {
      display: none;
    }
    .hamburger-btn {
      display: flex;
    }
    .nav-cta {
      display: none;
    }
  }
</style>
