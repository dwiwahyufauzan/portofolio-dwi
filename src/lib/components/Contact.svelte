<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowRight, Send } from "@lucide/svelte";
  import contactBg from "$lib/assets/contact.jpg";

  const socials = [
    { label: "GitHub", href: "https://github.com/dwiwahyufauzan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/dwiwahyufauzan" },
    { label: "Instagram", href: "https://instagram.com/dwiwahyufauzan" },
  ];

  let name = $state("");
  let email = $state("");
  let message = $state("");
  let sending = $state(false);
  let sent = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name || !email || !message) return;
    sending = true;
    await new Promise((r) => setTimeout(r, 1400));
    sending = false;
    sent = true;
    name = "";
    email = "";
    message = "";
    setTimeout(() => (sent = false), 4000);
  }

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
      <p class="section-eyebrow reveal">04 — Contact</p>

      <!-- Headline -->
      <div class="contact-header reveal">
        <h2 class="contact-headline">Get In Touch.</h2>
        <p class="contact-desc">
          Tertarik bekerja sama? Saya selalu terbuka untuk proyek baru,
          kolaborasi, atau sekadar ngobrol soal teknologi.
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

      <!-- Contact Form — Left Aligned -->
      <div class="contact-form-wrap reveal reveal-delay-2">
        <form
          class="contact-form"
          onsubmit={handleSubmit}
          aria-label="Contact form"
        >
          <div class="form-row">
            <div class="form-group">
              <label for="cf-name" class="form-label">Name</label>
              <input
                id="cf-name"
                type="text"
                bind:value={name}
                placeholder="Your Name"
                class="form-input"
                required
                autocomplete="name"
              />
            </div>
            <div class="form-group">
              <label for="cf-email" class="form-label">Email</label>
              <input
                id="cf-email"
                type="email"
                bind:value={email}
                placeholder="your@email.com"
                class="form-input"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="cf-message" class="form-label">Message</label>
            <textarea
              id="cf-message"
              bind:value={message}
              placeholder="Tell me about your project..."
              class="form-textarea"
              rows={4}
              required
            ></textarea>
          </div>

          <div class="form-footer">
            <button
              type="submit"
              class="btn btn-dark form-submit"
              disabled={sending}
            >
              {#if sent}
                Message Sent ✓
              {:else if sending}
                Sending...
              {:else}
                Send Message <Send size={13} />
              {/if}
            </button>
            <p class="form-note">Response within 24 hours.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  /* ─── Section Base ────────────────────────────────────────── */
  .contact {
    position: relative;
    background: var(--bg);
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
    /* Clean, bright monochrome grayscale */
    filter: grayscale(100%) contrast(1.05) brightness(0.9);
    opacity: 0.85;
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
  .contact-header {
    margin-bottom: 32px;
  }

  .contact-headline {
    font-family: var(--font-head);
    font-size: clamp(3.2rem, 6.5vw, 6.5rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.9;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .contact-desc {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--ink-2);
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
    color: var(--ink);
    text-decoration: none;
    letter-spacing: -0.01em;
    border-bottom: 1px solid var(--ink);
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
    color: var(--ink-3);
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
    color: var(--ink);
  }
  .social-link:hover::after {
    transform: scaleX(1);
  }

  /* ─── Form ────────────────────────────────────────────────── */
  .contact-form-wrap {
    width: 100%;
    padding-top: 36px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 14px 0;
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    background: transparent;
    color: var(--ink);
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s var(--ease);
    resize: none;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: var(--ink-3);
  }
  .form-input:focus,
  .form-textarea:focus {
    border-bottom-color: var(--ink);
  }

  .form-textarea {
    min-height: 110px;
  }

  .form-footer {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 8px;
  }

  .form-submit {
    min-width: 180px;
    justify-content: center;
  }

  .form-note {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--ink-3);
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 768px) {
    .contact-left-wrapper {
      max-width: 100%;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .form-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>
