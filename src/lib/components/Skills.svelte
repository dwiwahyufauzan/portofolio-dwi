<script lang="ts">
  import japanBg from "$lib/assets/japan-artistic-3840x2160-25406.jpg";
  import { skillsCategories as categories } from "$lib/data/skills";

  const all = categories.flatMap((c) => c.items);
  const stats = [
    { n: all.length, label: "Teknologi" },
    { n: categories.length, label: "Kategori" },
    { n: all.filter((i) => i.level >= 90).length, label: "Level Expert" },
  ];
  const tabs = ["Semua", ...categories.map((c) => c.name)];

  let active = $state("Semua");
  let failed = $state<Record<string, boolean>>({});
  const visible = $derived(
    active === "Semua"
      ? categories
      : categories.filter((c) => c.name === active),
  );

  const levelLabel = (l: number) =>
    l >= 90 ? "Expert" : l >= 82 ? "Advanced" : "Proficient";

  /* ── Actions ── */
  function reveal(node: HTMLElement) {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  function skill(node: HTMLElement, level: number) {
    const num = node.querySelector<HTMLElement>(".pct-num");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (num && !calm) num.textContent = "0";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        node.classList.add("in");
        if (!num || calm) return;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / 1100, 1);
          num.textContent = String(
            Math.round(level * (1 - Math.pow(1 - p, 3))),
          );
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  function spot(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
</script>

{#snippet ico(item: { name: string; icon: string })}
  <span class="ico">
    {#if failed[item.name]}
      <span class="ico-fb">{item.name[0]}</span>
    {:else}
      <img
        src={item.icon}
        alt=""
        loading="lazy"
        onerror={() => (failed[item.name] = true)}
      />
    {/if}
  </span>
{/snippet}

<section id="skills" class="skills">
  <div class="bg" aria-hidden="true">
    <img
      src={japanBg}
      alt=""
      class="bg-img"
      draggable="false"
      loading="lazy"
      decoding="async"
    />
    <div class="bg-shade"></div>
    <div class="bg-grid"></div>
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
  </div>

  <div class="wrap">
    <p class="eyebrow" use:reveal><span class="dot"></span>02 — Skills</p>

    <header class="head" use:reveal>
      <h2 class="title">Tech <em>Stack.</em></h2>
      <div class="head-side">
        <p class="subtitle">
          Alat dan teknologi yang saya gunakan untuk membangun produk digital
          berkualitas tinggi.
        </p>
        <dl class="stats">
          {#each stats as s}
            <div class="stat">
              <dt>{s.label}</dt>
              <dd>{s.n}<span>+</span></dd>
            </div>
          {/each}
        </dl>
      </div>
    </header>
  </div>

  <!-- Marquee -->
  <div class="marquee" aria-hidden="true" use:reveal>
    {#each [0, 1] as row}
      <div class="m-row" class:rev={row === 1}>
        <div class="m-track">
          {#each [...(row ? [...all].reverse() : all), ...(row ? [...all].reverse() : all)] as item}
            <span class="chip">{@render ico(item)}{item.name}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="wrap">
    <!-- Filter -->
    <div class="tabs" role="tablist" aria-label="Filter kategori" use:reveal>
      {#each tabs as t}
        <button
          role="tab"
          aria-selected={active === t}
          class="tab"
          class:on={active === t}
          onclick={() => (active = t)}
        >
          {t}
        </button>
      {/each}
    </div>

    {#key active}
      <div class="grid" class:solo={visible.length === 1}>
        {#each visible as cat, ci (cat.name)}
          <article
            class="card"
            style="--d:{ci * 0.08}s"
            onpointermove={spot}
            use:reveal
          >
            <div class="card-head">
              <div>
                <h3 class="cat-name">{cat.name}</h3>
                <p class="cat-desc">{cat.desc}</p>
              </div>
              <span class="count"
                >{String(cat.items.length).padStart(2, "0")}</span
              >
            </div>

            <ul class="list">
              {#each cat.items as item, ii (item.name)}
                <li
                  class="row"
                  style="--i:{ii}; --d:{ci * 0.08}s"
                  use:skill={item.level}
                >
                  <div class="info">
                    {@render ico(item)}
                    <div class="name-block">
                      <span class="name">{item.name}</span>
                      <span
                        class="lvl lvl-{levelLabel(item.level).toLowerCase()}"
                        >{levelLabel(item.level)}</span
                      >
                    </div>
                    <span class="pct"
                      ><span class="pct-num">{item.level}</span>%</span
                    >
                  </div>
                  <div
                    class="track"
                    role="progressbar"
                    aria-label={item.name}
                    aria-valuenow={item.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div class="bar" style="--w:{item.level}%"></div>
                  </div>
                </li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>
    {/key}
  </div>
</section>

<style>
  .skills {
    --red: #ff4d4d;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: #070505;
    color: #fff;
    padding: clamp(64px, 10vw, 128px) 0;
  }
  .wrap {
    width: min(100% - 2.5rem, 1280px);
    margin-inline: auto;
  }

  /* ── Background ── */
  .bg {
    position: absolute;
    inset: 0;
    z-index: -1;
  }
  .bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: saturate(0.8) contrast(1.05);
    user-select: none;
  }
  .bg-shade {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 70% 60% at 12% 30%,
        rgba(160, 25, 25, 0.3),
        transparent 70%
      ),
      linear-gradient(
        to bottom,
        rgba(5, 3, 3, 0.82),
        rgba(5, 3, 3, 0.62) 40%,
        rgba(5, 3, 3, 0.92)
      );
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.04) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(
      ellipse 80% 70% at 50% 40%,
      #000,
      transparent 75%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 70% at 50% 40%,
      #000,
      transparent 75%
    );
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
    animation: float 14s ease-in-out infinite;
  }
  .orb-a {
    width: 340px;
    height: 340px;
    background: #b91c1c;
    top: -80px;
    right: 8%;
  }
  .orb-b {
    width: 260px;
    height: 260px;
    background: #7f1d1d;
    bottom: 10%;
    left: -60px;
    animation-delay: -7s;
  }
  @keyframes float {
    50% {
      transform: translate(30px, -40px) scale(1.12);
    }
  }

  /* ── Header ── */
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 22px;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--red);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.6);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    to {
      box-shadow: 0 0 0 10px rgba(255, 77, 77, 0);
    }
  }
  .head {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: clamp(24px, 5vw, 64px);
    align-items: end;
    margin-bottom: clamp(32px, 5vw, 56px);
  }
  .title {
    margin: 0;
    font-size: clamp(3rem, 9vw, 6.5rem);
    line-height: 0.92;
    letter-spacing: -0.04em;
    font-weight: 700;
  }
  .title em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(100deg, #fff 20%, var(--red));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    padding-right: 0.06em;
  }
  .subtitle {
    margin: 0 0 28px;
    max-width: 46ch;
    font-size: clamp(0.95rem, 1.6vw, 1.08rem);
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 0;
  }
  .stat {
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .stat dt {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }
  .stat dd {
    margin: 6px 0 0;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    line-height: 1;
  }
  .stat dd span {
    color: var(--red);
  }

  /* ── Marquee ── */
  .marquee {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: clamp(36px, 5vw, 56px);
    mask-image: linear-gradient(
      90deg,
      transparent,
      #000 12%,
      #000 88%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent,
      #000 12%,
      #000 88%,
      transparent
    );
  }
  .m-row {
    overflow: hidden;
  }
  .m-track {
    display: flex;
    width: max-content;
    animation: scroll 55s linear infinite;
  }
  .m-row.rev .m-track {
    animation-direction: reverse;
    animation-duration: 65s;
  }
  .marquee:hover .m-track {
    animation-play-state: paused;
  }
  @keyframes scroll {
    to {
      transform: translateX(-50%);
    }
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-right: 12px;
    padding: 8px 16px 8px 8px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    font-size: 0.85rem;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.85);
  }

  /* ── Tabs ── */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 28px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .tabs::-webkit-scrollbar {
    display: none;
  }
  .tab {
    flex-shrink: 0;
    padding: 10px 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.75);
    font: inherit;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .tab:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
  .tab.on {
    background: #fff;
    border-color: #fff;
    color: #120606;
    font-weight: 600;
  }
  .tab:focus-visible {
    outline: 2px solid var(--red);
    outline-offset: 3px;
  }

  /* ── Cards ── */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
    gap: clamp(14px, 2vw, 22px);
  }
  .card {
    position: relative;
    padding: clamp(20px, 2.5vw, 30px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    background: rgba(18, 12, 12, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 0.7s ease var(--d, 0s),
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s);
  }
  .card:global(.in) {
    opacity: 1;
    transform: none;
  }
  .card::before,
  .card::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .card::before {
    background: radial-gradient(
      420px circle at var(--mx, 50%) var(--my, 0%),
      rgba(255, 77, 77, 0.16),
      transparent 60%
    );
  }
  .card::after {
    padding: 1px;
    background: radial-gradient(
      320px circle at var(--mx, 50%) var(--my, 0%),
      rgba(255, 255, 255, 0.8),
      transparent 60%
    );
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  .card:hover::before,
  .card:hover::after {
    opacity: 1;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
  .cat-name {
    margin: 0 0 4px;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .cat-desc {
    margin: 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.55);
  }
  .count {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 77, 77, 0.15);
    color: #ffb4b4;
  }

  /* ── Skill rows ── */
  .list {
    display: grid;
    gap: 18px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .solo {
    grid-template-columns: 1fr;
  }
  .solo .list {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: 22px 40px;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .name-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }
  .name {
    font-size: 0.92rem;
    font-weight: 500;
    overflow-wrap: anywhere;
  }
  .lvl {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  .lvl-expert {
    color: #ff9a9a;
  }
  .pct {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.78rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .ico {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .ico img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
  .ico-fb {
    font-size: 0.75rem;
    font-weight: 700;
  }

  .track {
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
  }
  .bar {
    height: 100%;
    width: var(--w);
    border-radius: inherit;
    background: linear-gradient(90deg, #fff, var(--red));
    box-shadow: 0 0 12px rgba(255, 77, 77, 0.6);
    transform: scaleX(0);
    transform-origin: left;
  }
  .row:global(.in) .bar {
    transform: scaleX(1);
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)
      calc(var(--i, 0) * 0.07s);
  }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .head {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 520px) {
    .stats {
      gap: 8px;
    }
    .stat {
      padding: 12px;
    }
    .bg-img {
      object-position: 62% center;
    }
    .card {
      border-radius: 20px;
    }
  }

  /* Reveal untuk eyebrow / header / marquee / tabs */
  .eyebrow,
  .head,
  .marquee,
  .tabs {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.7s ease,
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  :global(.eyebrow.in),
  :global(.head.in),
  :global(.marquee.in),
  :global(.tabs.in) {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .m-track,
    .orb,
    .dot {
      animation: none;
    }
    .card,
    .eyebrow,
    .head,
    .marquee,
    .tabs {
      opacity: 1;
      transform: none;
      transition: none;
    }
    .bar {
      transform: none;
      transition: none;
    }
  }
</style>
