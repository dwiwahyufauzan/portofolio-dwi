<script lang="ts">
  import { onMount } from "svelte";
  import { Rocket, Heart, Coffee, Globe } from "@lucide/svelte";

  let time = $state("");
  let year = $state(new Date().getFullYear());

  function updateTime() {
    time = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  }

  onMount(() => {
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  });
</script>

<footer class="site-footer">
  <div class="container">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <a href="#hero" class="footer-logo">DWISYCOO<em>!</em></a>
        <p class="footer-tagline">
          Building purposeful digital products.
          <Rocket
            size={12}
            style="display:inline-block; vertical-align:middle; margin-left: 4px;"
          />
        </p>
      </div>

      <!-- Time and Copyright -->
      <div class="footer-mid">
        <p class="footer-copy">
          © {year} Dwi Wahyu Fauzan · Made with
          <Heart
            size={12}
            style="display:inline-block; vertical-align:middle; margin-left: 2px; margin-right: 2px;"
          />
          &amp; lots of
          <Coffee
            size={12}
            style="display:inline-block; vertical-align:middle; margin-left: 2px;"
          />
        </p>
        <p class="footer-time">
          <span class="live-dot-pulse"></span>
          Jakarta, ID · {time} WIB
          <Globe
            size={12}
            style="display:inline-block; vertical-align:middle; margin-left: 4px;"
          />
        </p>
      </div>

      <!-- Socials -->
      <div class="footer-socials">
        <a
          href="https://github.com/dwiwahyufauzan"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          aria-label="GitHub"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
            />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/dwiwahyufauzan"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          aria-label="LinkedIn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            /><circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          href="mailto:dwiwhy31@gmail.com"
          class="social-btn"
          aria-label="Email"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Giant Full-Bleed Editorial Footer Text (Stretches edge-to-edge) -->
  <div class="footer-big-text" aria-hidden="true">
    <span>PORTFOLIO</span>
  </div>
</footer>

<style>
  .site-footer {
    background: var(--footer-bg);
    color: var(--footer-text);
    padding: 60px 0 20px 0;
    position: relative;
    overflow: hidden;
  }

  .live-dot-pulse {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--accent);
    margin-right: 6px;
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
    animation: pulse-ring-blue 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
    vertical-align: middle;
  }

  @keyframes pulse-ring-blue {
    to {
      box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
    }
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .footer-logo {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--footer-text);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    width: fit-content;
  }
  .footer-logo em {
    color: var(--footer-text);
    font-style: normal;
  }

  .footer-tagline {
    font-size: 0.8rem;
    color: rgba(236, 236, 236, 0.5);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .footer-mid {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: rgba(236, 236, 236, 0.4);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .footer-time {
    font-size: 0.8rem;
    color: rgba(236, 236, 236, 0.4);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
  }

  .footer-socials {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    width: 40px;
    height: 40px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.65);
    transition:
      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      border-color 0.4s,
      color 0.4s,
      background-color 0.4s;
  }

  .social-btn:hover {
    transform: scale(1.15) rotate(8deg);
    border-color: var(--white);
    color: var(--footer-bg);
    background-color: var(--white);
  }

  /* ── FULL-BLEED GIANT EDITORIAL FOOTER TEXT ── */
  .footer-big-text {
    width: 100%;
    overflow: hidden;
    margin-top: 40px;
    padding: 0;
    border-top: none;
    text-align: center;
    pointer-events: none;
    user-select: none;
    line-height: 0.78;
  }

  .footer-big-text span {
    font-family: var(--font-head);
    font-size: clamp(3.6rem, 18.2vw, 22rem);
    font-weight: 900;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.18);
    display: block;
    white-space: nowrap;
    width: 100%;
    margin-bottom: 0.02em;
    transition:
      -webkit-text-stroke 0.4s ease,
      opacity 0.4s ease;
  }

  .site-footer:hover .footer-big-text span {
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
  }
</style>
