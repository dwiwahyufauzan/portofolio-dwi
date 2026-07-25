<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { PartyPopper, Sun, Moon } from "@lucide/svelte";

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let activeSection = $state("hero");
  let theme = $state("light");

  function toggleMenu() {
    menuOpen = !menuOpen;
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }
  function closeMenu() {
    menuOpen = false;
    document.body.style.overflow = "";
  }

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    theme = nextTheme;
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  onMount(() => {
    theme = document.documentElement.getAttribute("data-theme") || "light";

    const onScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) activeSection = e.target.id;
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  });

  const links = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];
</script>

<nav class="navbar" class:scrolled>
  <div class="nav-inner">
    <a href="#hero" class="nav-logo" onclick={closeMenu}> Dwisycoo </a>

    <div class="nav-links">
      {#each links as l}
        <a href={l.href} class="nav-link" class:active={activeSection === l.id}>
          <span class="link-text">{l.label}</span>
        </a>
      {/each}
    </div>

    <div class="nav-right">
      <button
        class="theme-toggle"
        class:is-dark={theme === "dark"}
        onclick={toggleTheme}
        aria-label="Toggle theme"
        type="button"
      >
        <div class="toggle-thumb">
          <div class="thumb-icon thumb-sun" class:visible={theme === "light"}>
            <Sun size={14} strokeWidth={3} />
          </div>
          <div class="thumb-icon thumb-moon" class:visible={theme === "dark"}>
            <Moon size={14} strokeWidth={3} />
          </div>
        </div>
      </button>

      <a href="#contact" class="nav-cta">
        Let's Talk!
        <PartyPopper size={16} class="cta-icon" />
      </a>

      <button
        class="hamburger"
        class:open={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        type="button"
        onclick={toggleMenu}
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

{#if menuOpen}
  <div
    class="mobile-menu"
    role="dialog"
    aria-modal="true"
    transition:fade={{ duration: 200 }}
  >
    {#each links as l, i}
      <div in:fly={{ y: 20, duration: 300, delay: 50 * i }}>
        <a href={l.href} class="mob-link" onclick={closeMenu}>{l.label}</a>
      </div>
    {/each}
    <div in:fly={{ y: 20, duration: 300, delay: 200 }}>
      <a href="#contact" class="mob-cta" onclick={closeMenu}>
        Let's Talk!
        <PartyPopper
          size={20}
          style="margin-left: 8px; display: inline-block;"
        />
      </a>
    </div>
  </div>
{/if}

<style>
  /* ── 1. Floating Pill Navbar ── */
  .navbar {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 1100px;
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 72px;
    background: rgba(var(--bg-rgb), 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(var(--ink-rgb), 0.08);
    border-radius: 99px; /* Pill shape */
    box-shadow: 0 4px 20px -2px rgba(var(--ink-rgb), 0.05);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .navbar.scrolled {
    top: 12px;
    height: 60px;
    background: rgba(var(--bg-rgb), 0.85);
    box-shadow: 0 10px 30px -10px rgba(var(--ink-rgb), 0.15);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .nav-logo {
    font-family: var(--font-head);
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    transition: transform 0.3s ease;
  }
  .nav-logo:hover {
    transform: scale(1.05);
  }

  /* ── 2. Animated Link Indicators ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link {
    position: relative;
    font-family: var(--font-head);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ink);
    padding: 10px 18px;
    border-radius: 99px;
    z-index: 1;
    transition: color 0.3s ease;
  }

  .nav-link::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 99px;
    background: var(--ink);
    opacity: 0;
    transform: scale(0.8) translateY(5px);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
  }

  .nav-link:hover::before {
    opacity: 0.05;
    transform: scale(1) translateY(0);
  }

  .nav-link.active::before {
    opacity: 0.1;
    transform: scale(1) translateY(0);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* ── 3. Elastic Morphing Theme Toggle ── */
  .theme-toggle {
    position: relative;
    width: 56px;
    height: 30px;
    border-radius: 99px;
    background: linear-gradient(135deg, #fff080 0%, #ffd200 100%);
    border: 1.5px solid var(--ink);
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    overflow: hidden; /* Clips the background transition */
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.15);
    transition:
      border-color 0.4s ease,
      box-shadow 0.4s ease;
  }

  /* Smooth gradient crossfade using pseudo-element */
  .theme-toggle::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1e3a8a 0%, #0b0f19 100%);
    opacity: 0;
    z-index: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .theme-toggle.is-dark::before {
    opacity: 1;
  }

  .theme-toggle:hover {
    box-shadow:
      inset 0 2px 5px rgba(0, 0, 0, 0.15),
      0 0 12px rgba(255, 210, 0, 0.3);
  }

  .theme-toggle.is-dark:hover {
    box-shadow:
      inset 0 2px 5px rgba(0, 0, 0, 0.3),
      0 0 14px rgba(59, 130, 246, 0.4);
  }

  /* The Moving Thumb */
  .toggle-thumb {
    position: absolute;
    top: 1.5px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: var(--ink);
    border-radius: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff; /* Sun icon color in light mode */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    /* Animasi pergeseran dengan efek memantul */
    transition:
      transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 0.4s ease,
      color 0.4s ease,
      box-shadow 0.4s ease;
  }

  /* Efek Meliat (Squish) saat ditekan tahan */
  .theme-toggle:active .toggle-thumb {
    width: 32px;
  }

  /* Kondisi saat Dark Mode aktif */
  .theme-toggle.is-dark .toggle-thumb {
    transform: translateX(26px);
    background: #ffffff;
    color: #1e3a8a; /* Moon icon color in dark mode */
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.4),
      0 0 6px rgba(255, 255, 255, 0.2);
  }

  /* Menggeser lebih sedikit saat Dark Mode ditekan, karena thumb memanjang */
  .theme-toggle.is-dark:active .toggle-thumb {
    transform: translateX(18px);
    width: 32px;
  }

  /* Animasi putar dan pudar Icon di dalam thumb */
  .thumb-icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.35s ease;
  }

  .thumb-sun {
    opacity: 0;
    transform: rotate(-180deg) scale(0.3);
  }
  .thumb-sun.visible {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .thumb-moon {
    opacity: 0;
    transform: rotate(180deg) scale(0.3);
  }
  .thumb-moon.visible {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  /* ── 4. CTA Button Hover Animation ── */
  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--ink);
    color: var(--bg);
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: 99px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .cta-icon {
    margin-left: 2px;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .nav-cta:hover {
    background: transparent;
    color: var(--ink);
    border-color: var(--ink);
  }

  .nav-cta:hover .cta-icon {
    transform: rotate(15deg) scale(1.1);
  }

  /* ── Hamburger Menu ── */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 6px;
    cursor: pointer;
    background: transparent;
    border: none;
    z-index: 101; /* Selalu di atas mobile menu */
  }
  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--ink);
    border-radius: 4px;
    transition:
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.3s;
  }
  .hamburger.open span:first-child {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: translateX(-10px);
  }
  .hamburger.open span:last-child {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Mobile Menu Fullscreen ── */
  .mobile-menu {
    position: fixed;
    inset: 0;
    background: rgba(var(--bg-rgb), 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 99;
    display: flex;
    flex-direction: column;
    padding: 140px 40px 60px;
    gap: 12px;
  }

  .mob-link {
    font-family: var(--font-head);
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    padding: 12px 0;
    border-bottom: 1px solid rgba(var(--ink-rgb), 0.1);
    transition:
      opacity 0.3s,
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mob-link:hover {
    opacity: 0.6;
    transform: translateX(12px);
  }

  .mob-cta {
    margin-top: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--ink);
    color: var(--bg);
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 18px 32px;
    border-radius: 99px;
    width: fit-content;
    transition:
      transform 0.3s ease,
      opacity 0.3s;
  }
  .mob-cta:hover {
    opacity: 0.9;
    transform: translateY(-4px);
  }

  /* ── Responsiveness ── */
  @media (max-width: 860px) {
    .nav-links,
    .nav-cta {
      display: none;
    }
    .hamburger {
      display: flex;
    }
    .navbar {
      top: 16px;
      padding: 0 20px;
      height: 64px;
      width: calc(100% - 32px);
    }
    .navbar.scrolled {
      top: 8px;
    }
  }
</style>
