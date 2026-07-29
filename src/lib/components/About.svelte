<script lang="ts">
  import { onMount } from "svelte";
  import profilePhoto from "$lib/assets/d-1.jpg";
  import { ArrowRight } from "@lucide/svelte";

  const skills = [
    "SvelteKit",
    "TypeScript",
    "Node.js",
    "Elysia",
    "Drizzle ORM",
    "MySQL",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
    "GraphQL",
    "Git",
    "Docker",
  ];

  const values = [
    {
      num: "01",
      label: "Clean Code",
      desc: "Kode bersih, terbaca, dan maintainable adalah prioritas utama.",
    },
    {
      num: "02",
      label: "Performance",
      desc: "Setiap millisecond penting optimasi dari database hingga render.",
    },
    {
      num: "03",
      label: "User First",
      desc: "Antarmuka harus intuitif dan memberikan pengalaman yang menyenangkan.",
    },
    {
      num: "04",
      label: "Always Learning",
      desc: "Teknologi terus berkembang belajar tanpa henti adalah kunci.",
    },
  ];

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("#about .reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
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
        <h2 class="about-headline reveal">
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
          </div>
        </div>
      </div>

      <!-- Right: Photo -->
      <div class="about-right reveal reveal-delay-2">
        <div class="about-photo-wrap">
          <img
            src={profilePhoto}
            alt="Dwi Wahyu Fauzan"
            class="about-photo"
            loading="lazy"
          />
          <div class="about-photo-label" aria-hidden="true">
            <span>DWI WAHYU FAUZAN</span>
            <span class="dot-sep">·</span>
            <span>FULLSTACK</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <hr class="hr-line reveal" />

    <!-- Skills Row -->
    <div class="about-skills-section">
      <p class="about-skills-label reveal">Tech Stack</p>
      <div class="about-skills-grid reveal reveal-delay-1">
        {#each skills as skill}
          <span class="skill-tag">{skill}</span>
        {/each}
      </div>
    </div>

    <!-- Values Grid -->
    <div class="about-values reveal reveal-delay-2">
      {#each values as v}
        <div class="value-item">
          <span class="value-num">{v.num}</span>
          <h3 class="value-label">{v.label}</h3>
          <p class="value-desc">{v.desc}</p>
        </div>
      {/each}
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

  /* ─── Photo ───────────────────────────────────────────────── */
  .about-photo-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 0; /* editorial: sharp */
  }

  .about-photo {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: grayscale(100%);
    transition:
      filter 0.4s var(--ease),
      transform 0.6s var(--ease);
  }

  .about-photo-wrap:hover .about-photo {
    filter: grayscale(0%);
    transform: scale(1.025);
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
  }

  .dot-sep {
    opacity: 0.35;
  }

  /* ─── Skills ──────────────────────────────────────────────── */
  .about-skills-section {
    padding: 56px 0;
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: start;
    gap: 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 64px;
  }

  .about-skills-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding-top: 6px;
  }

  .about-skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-tag {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--ink-2);
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    background: var(--bg);
    transition:
      background 0.2s var(--ease),
      color 0.2s var(--ease),
      border-color 0.2s var(--ease);
  }
  .skill-tag:hover {
    background: var(--ink);
    color: var(--bg);
    border-color: var(--ink);
  }

  /* ─── Values ──────────────────────────────────────────────── */
  .about-values {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  .value-item {
    padding: 32px 32px 32px 0;
    border-right: 1px solid var(--border);
    padding-right: 32px;
    padding-left: 0;
  }
  .value-item:last-child {
    border-right: none;
  }
  .value-item + .value-item {
    padding-left: 32px;
  }

  .value-num {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: var(--ink-3);
    display: block;
    margin-bottom: 16px;
  }

  .value-label {
    font-family: var(--font-head);
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }

  .value-desc {
    font-size: 0.85rem;
    line-height: 1.65;
    color: var(--ink-2);
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .about-values {
      grid-template-columns: repeat(2, 1fr);
    }
    .value-item {
      border-right: none;
      border-bottom: 1px solid var(--border);
      padding: 28px 0;
    }
    .value-item:last-child {
      border-bottom: none;
    }
    .value-item + .value-item {
      padding-left: 0;
    }
    .about-skills-section {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  @media (max-width: 640px) {
    .about-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .about-values {
      grid-template-columns: 1fr;
    }
    .about-cta-row {
      flex-direction: column;
    }
    .about-cta-row .btn {
      justify-content: center;
    }
  }
</style>
