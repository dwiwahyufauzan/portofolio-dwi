<script lang="ts">
  import { onMount } from "svelte";
  import instagramLogo from "$lib/assets/instagram.png";
  import tiktokLogo from "$lib/assets/tiktok.png";
  import discordLogo from "$lib/assets/discord.png";
  import githubLogo from "$lib/assets/github.png";
  import linkedinLogo from "$lib/assets/linkedin.png";

  const socials = [
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/dwiwahyufauzan",
      imgUrl: instagramLogo,
    },
    {
      id: "tiktok",
      name: "TikTok",
      url: "https://tiktok.com/@dwiwahyufauzan",
      imgUrl: tiktokLogo,
    },
    {
      id: "discord",
      name: "Discord",
      url: "https://discord.com",
      imgUrl: discordLogo,
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/dwiwahyufauzan",
      imgUrl: githubLogo,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/dwiwahyufauzan",
      imgUrl: linkedinLogo,
    },
  ];

  const CX = 260;
  const CY = 260;
  const RADIUS = 185;
  const N = socials.length;

  const nodes = socials.map((s, i) => {
    const deg = (i / N) * 360 - 90;
    const rad = (deg * Math.PI) / 180;
    return {
      ...s,
      nx: CX + RADIUS * Math.cos(rad),
      ny: CY + RADIUS * Math.sin(rad),
    };
  });

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("#socials .reveal")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<section id="socials" class="socials section section-alt">
  <!-- Irregular Lines Bg -->
  <div class="irregular-lines-bg" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="socials-lines"
          width="250"
          height="250"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="40"
            x2="250"
            y2="210"
            stroke="currentColor"
            stroke-width="1.2"
            opacity="0.08"
          />
          <line
            x1="60"
            y1="0"
            x2="190"
            y2="250"
            stroke="currentColor"
            stroke-width="0.7"
            opacity="0.06"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#socials-lines)" />
    </svg>
  </div>

  <div class="container">
    <!-- Header -->
    <div class="socials-top reveal">
      <p class="section-eyebrow">05 — Social Media</p>
      <div class="socials-head-row">
        <h2 class="section-title">
          <span class="hl-block">Stay</span>
          <span class="hl-block hl-italic">Connected.</span>
        </h2>
        <p class="section-subtitle">
          Temukan saya di berbagai platform dari coding, visual, hingga diskusi
          komunitas.
        </p>
      </div>
    </div>

    <!-- Circular Network Diagram -->
    <div class="socials-diagram reveal reveal-delay-1">
      <!-- SVG: ring + connecting red lines -->
      <svg
        class="diagram-svg"
        viewBox="0 0 520 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="redglow-c" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge
              ><feMergeNode in="blur" /><feMergeNode
                in="SourceGraphic"
              /></feMerge
            >
          </filter>
        </defs>

        <!-- Dashed orbit ring -->
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="rgba(230,57,70,0.3)"
          stroke-width="1.6"
          stroke-dasharray="6 9"
        />

        <!-- Spoke lines: center → each node -->
        {#each nodes as node}
          <line
            x1={CX}
            y1={CY}
            x2={node.nx}
            y2={node.ny}
            stroke="#e63946"
            stroke-width="1.5"
            stroke-dasharray="5 7"
            opacity="0.6"
          />
        {/each}

        <!-- Polygon connecting all nodes -->
        <polygon
          points={nodes.map((n) => `${n.nx},${n.ny}`).join(" ")}
          fill="none"
          stroke="#e63946"
          stroke-width="1.8"
          opacity="0.45"
        />

        <!-- Center dot -->
        <circle
          cx={CX}
          cy={CY}
          r="6"
          fill="#e63946"
          filter="url(#redglow-c)"
          opacity="0.95"
        />

        <!-- Node accent dots -->
        {#each nodes as node}
          <circle
            cx={node.nx}
            cy={node.ny}
            r="4"
            fill="#e63946"
            opacity="0.85"
          />
        {/each}
      </svg>

      <!-- HTML logo nodes anchored over SVG by % position -->
      <div class="diagram-nodes">
        {#each nodes as node (node.id)}
          {@const pctX = (node.nx / 520) * 100}
          {@const pctY = (node.ny / 520) * 100}
          <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            class="node-icon-btn"
            title={node.name}
            style="left: {pctX}%; top: {pctY}%;"
          >
            <img src={node.imgUrl} alt={node.name} class="node-logo-img" />
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .socials {
    position: relative;
    background: var(--bg-alt);
    overflow: hidden;
  }

  .socials :global(.container) {
    position: relative;
    z-index: 2;
  }

  .irregular-lines-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    color: var(--ink);
    opacity: 0.85;
    mask-image: radial-gradient(
      ellipse 90% 90% at 50% 50%,
      black 40%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 90% 90% at 50% 50%,
      black 40%,
      transparent 100%
    );
  }

  /* ─── Header ──────────────────────────────────────────────── */
  .socials-top {
    margin-bottom: 48px;
  }

  .socials-head-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
  }

  .socials-top .section-title {
    margin: 8px 0 0;
  }

  .socials-top .section-subtitle {
    max-width: 380px;
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--ink-2);
  }

  /* ─── Diagram (Windmill Spin Stage) ────────────────── */
  .socials-diagram {
    position: relative;
    max-width: 540px;
    margin: 0 auto;
    aspect-ratio: 1 / 1;
    animation: windmill-spin 24s linear infinite;
  }

  .socials-diagram:hover {
    animation-play-state: paused;
  }

  .diagram-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .diagram-nodes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* ─── Icon Buttons — Windmill Counter-Rotation ────── */
  .node-icon-btn {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    background: transparent;
    border: none;
    box-shadow: none;
    text-decoration: none;
    cursor: pointer;
    animation: windmill-counter 24s linear infinite;
  }

  .socials-diagram:hover .node-icon-btn {
    animation-play-state: paused;
  }

  .node-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    filter: none;
  }

  /* White circular fill strictly behind GitHub Octocat logo */
  .node-icon-btn[title="GitHub"] {
    background: #ffffff;
    border-radius: 50%;
  }

  /* ─── Keyframe Animations for Windmill Motion ───────── */
  @keyframes windmill-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes windmill-counter {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 768px) {
    .socials-head-row {
      flex-direction: column;
      align-items: flex-start;
    }
    .socials-diagram {
      max-width: 100%;
    }
    .node-icon-btn {
      width: 85px;
      height: 85px;
    }
  }
</style>
