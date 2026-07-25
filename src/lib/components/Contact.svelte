<script lang="ts">
  import {
    Send,
    Hand,
    CheckCircle2,
    PartyPopper,
    Coffee,
    User,
    Mail,
    Lightbulb,
    MessageSquare,
    Loader2,
    Globe,
    Clock,
    Zap,
  } from "@lucide/svelte";

  import { sound } from "$lib/utils/audio";

  let formName = $state("");
  let formEmail = $state("");
  let formSubject = $state("");
  let formMessage = $state("");
  let sending = $state(false);
  let sent = $state(false);
  let apiErrorMessage = $state("");

  let errors = $state({
    name: "",
    email: "",
    message: "",
  });

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    sound.playClick();
    errors.name = "";
    errors.email = "";
    errors.message = "";
    apiErrorMessage = "";

    let isValid = true;

    if (!formName.trim()) {
      errors.name = "Nama lengkap wajib diisi";
      isValid = false;
    }

    if (!formEmail.trim()) {
      errors.email = "Email wajib diisi";
      isValid = false;
    } else if (!validateEmail(formEmail)) {
      errors.email = "Format email tidak valid";
      isValid = false;
    }

    if (!formMessage.trim()) {
      errors.message = "Pesan wajib diisi (minimal 10 karakter)";
      isValid = false;
    } else if (formMessage.trim().length < 10) {
      errors.message = "Pesan terlalu singkat (minimal 10 karakter)";
      isValid = false;
    }

    if (!isValid) return;

    sending = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        sound.playPop();
        sent = true;
        formName = "";
        formEmail = "";
        formSubject = "";
        formMessage = "";
      } else {
        apiErrorMessage = result.message || "Gagal mengirim pesan. Silakan coba lagi.";
      }
    } catch {
      apiErrorMessage = "Gagal terhubung ke server. Periksa koneksi internet Anda.";
    } finally {
      sending = false;
    }
  }

  const contactInfo = [
    {
      icon: "mail",
      label: "Email",
      value: "dwiwhy31@gmail.com",
      href: "mailto:dwiwhy31@gmail.com",
      bg: "var(--yellow)",
      color: "var(--ink)",
    },
    {
      icon: "github",
      label: "GitHub",
      value: "@dwiwahyufauzan",
      href: "https://github.com/dwiwahyufauzan",
      bg: "var(--blue)",
      color: "#fff",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "Dwi Wahyu Fauzan",
      href: "https://linkedin.com/in/dwiwahyufauzan",
      bg: "var(--teal)",
      color: "#fff",
    },
    {
      icon: "globe",
      label: "Location",
      value: "Indonesia",
      href: null,
      bg: "var(--green)",
      color: "#fff",
    },
  ];
</script>

<!-- ═══ CONTACT SECTION ═══ -->
<section id="contact" class="section">
  <div class="container">
    <!-- Header -->
    <div class="reveal reveal-zoom-out" style="margin-bottom:48px;">
      <div class="section-label">
        <Send size={12} /> Get In Touch
      </div>
      <h2 class="section-title">Let's Work Together!</h2>
      <p class="contact-subtitle">
        Terbuka untuk freelance, full-time, maupun kolaborasi seru lainnya.
        Jangan ragu untuk say hi!
        <Hand
          size={14}
          style="display:inline-block; vertical-align:middle; margin-left: 4px;"
        />
      </p>
    </div>

    <div class="contact-grid">
      <!-- Form -->
      <div class="reveal reveal-slide-left reveal-d1">
        <div class="form-wrap">
          {#if sent}
            <div class="success-overlay">
              <div class="checkmark-wrap">
                <svg class="success-svg" viewBox="0 0 52 52">
                  <circle class="success-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path class="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <div class="success-title">
                Yeay! Terkirim!
                <PartyPopper
                  size={18}
                  style="display:inline-block; vertical-align:middle; margin-left: 6px;"
                />
              </div>
              <div class="success-sub">
                Terima kasih! Saya akan balas dalam 1–2 hari kerja.
                <Coffee
                  size={14}
                  style="display:inline-block; vertical-align:middle; margin-left: 4px;"
                />
              </div>
            </div>
          {:else}
            <form onsubmit={handleSubmit} novalidate>
              <div class="form-group" class:has-error={errors.name}>
                <input
                  type="text"
                  class="form-input"
                  id="form-name"
                  bind:value={formName}
                  required
                  placeholder=" "
                />
                <label for="form-name" class="form-label">
                  <User
                    size={14}
                    style="display:inline-block; vertical-align:middle; margin-right: 4px;"
                  /> Nama Lengkap
                </label>
                {#if errors.name}
                  <span class="error-msg">{errors.name}</span>
                {/if}
              </div>
              <div class="form-group" class:has-error={errors.email}>
                <input
                  type="email"
                  class="form-input"
                  id="form-email"
                  bind:value={formEmail}
                  required
                  placeholder=" "
                />
                <label for="form-email" class="form-label">
                  <Mail
                    size={14}
                    style="display:inline-block; vertical-align:middle; margin-right: 4px;"
                  /> Alamat Email
                </label>
                {#if errors.email}
                  <span class="error-msg">{errors.email}</span>
                {/if}
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  id="form-subject"
                  bind:value={formSubject}
                  placeholder=" "
                />
                <label for="form-subject" class="form-label">
                  <Lightbulb
                    size={14}
                    style="display:inline-block; vertical-align:middle; margin-right: 4px;"
                  /> Subjek (Opsional)
                </label>
              </div>
              <div class="form-group" class:has-error={errors.message}>
                <textarea
                  class="form-input"
                  id="form-message"
                  rows="4"
                  bind:value={formMessage}
                  required
                  placeholder=" "
                ></textarea>
                <label for="form-message" class="form-label">
                  <MessageSquare
                    size={14}
                    style="display:inline-block; vertical-align:middle; margin-right: 4px;"
                  /> Pesan Anda
                </label>
                {#if errors.message}
                  <span class="error-msg">{errors.message}</span>
                {/if}
              </div>
              <button type="submit" class="btn-send" disabled={sending}>
                {#if sending}
                  <span>
                    Mengirim...
                    <Loader2
                      size={16}
                      class="spinner"
                      style="display:inline-block; vertical-align:middle; margin-left:6px;"
                    />
                  </span>
                {:else}
                  <span>
                    Kirim Pesan!
                    <Send
                      size={16}
                      style="display:inline-block; vertical-align:middle; margin-left:6px;"
                    />
                  </span>
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>

      <!-- Contact info cards -->
      <div class="reveal reveal-slide-right reveal-d2 info-col">
        {#each contactInfo as c}
          {#if c.href}
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              class="info-card"
            >
              <div
                class="info-icon"
                style="display: flex; align-items: center; justify-content: center;"
              >
                {#if c.icon === "mail"}
                  <Mail size={20} />
                {:else if c.icon === "github"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    ><path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                    /></svg
                  >
                {:else if c.icon === "linkedin"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    ><path
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    /><circle cx="4" cy="4" r="2" /></svg
                  >
                {:else if c.icon === "globe"}
                  <Globe size={20} />
                {/if}
              </div>
              <div>
                <div class="info-label">{c.label}</div>
                <div class="info-val">{c.value}</div>
              </div>
            </a>
          {:else}
            <div class="info-card" style="cursor:default;">
              <div
                class="info-icon"
                style="display: flex; align-items: center; justify-content: center;"
              >
                {#if c.icon === "mail"}
                  <Mail size={20} />
                {:else if c.icon === "github"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    ><path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                    /></svg
                  >
                {:else if c.icon === "linkedin"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    ><path
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    /><circle cx="4" cy="4" r="2" /></svg
                  >
                {:else if c.icon === "globe"}
                  <Globe size={20} />
                {/if}
              </div>
              <div>
                <div class="info-label">{c.label}</div>
                <div class="info-val">{c.value}</div>
              </div>
            </div>
          {/if}
        {/each}

        <!-- Coffee card -->
        <div class="coffee-card">
          <div class="coffee-emoji" style="display: flex; align-items: center; justify-content: center;">
            <Clock size={32} />
          </div>
          <div class="coffee-title">Response Time</div>
          <div class="coffee-sub">
            Biasanya dalam 24 jam!
            <Zap
              size={14}
              style="display:inline-block; vertical-align:middle; margin-left: 4px;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-subtitle {
    font-size: 1rem;
    color: var(--ink);
    line-height: 1.6;
    margin-top: 12px;
    max-width: 480px;
    font-weight: 500;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 80px;
    align-items: start;
  }

  /* Form */
  .form-wrap {
    position: relative;
    min-height: 400px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 24px;
    box-shadow: 4px 4px 0 var(--ink);
    padding: 36px;
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
  }
  .form-wrap:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--ink);
  }
  .form-group {
    position: relative;
    margin-bottom: 24px;
  }
  .form-group::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .form-group:focus-within::after {
    transform: scaleX(1);
  }
  .form-group.has-error::after {
    background: var(--red);
    transform: scaleX(1);
  }
  .error-msg {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size: 0.65rem;
    color: var(--red); /* Adaptive Red error color */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-group.has-error .form-input {
    border-color: var(--red);
  }
  .form-group.has-error .form-label {
    color: var(--red) !important;
  }
  .form-label {
    position: absolute;
    top: 24px;
    left: 0;
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(var(--ink-rgb), 0.4);
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-input:focus ~ .form-label,
  .form-input:not(:placeholder-shown) ~ .form-label {
    top: 4px;
    font-size: 0.68rem;
    color: var(--ink);
  }
  .form-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(var(--ink-rgb), 0.2);
    border-radius: 0;
    padding: 24px 0 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--ink);
    outline: none;
    resize: none;
    box-shadow: none;
    transition: border-color 0.2s;
  }
  .form-input:focus {
    border-color: var(--ink);
  }
  textarea.form-input {
    min-height: 110px;
  }

  .btn-send {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 28px;
    background: var(--ink);
    color: var(--white);
    font-family: var(--font-head);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1.5px solid var(--ink);
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 4px 4px 0 rgba(var(--ink-rgb), 0.3);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out), opacity 0.2s;
    margin-top: 12px;
  }
  .btn-send:hover:not(:disabled) {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 rgba(var(--ink-rgb), 0.3);
  }
  .btn-send:disabled {
    opacity: 0.5;
  }

  :global(.spinner) {
    animation: spin-loader 1s linear infinite;
  }
  @keyframes spin-loader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Success Drawing Checkmark */
  .success-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
    gap: 14px;
    text-align: center;
    animation: fade-in 0.4s ease;
  }
  .checkmark-wrap {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }
  .success-svg {
    width: 100%;
    height: 100%;
    stroke: var(--accent);
    stroke-width: 3;
    stroke-miterlimit: 10;
    border-radius: 50%;
    animation: scale-check .3s ease-in-out .9s forwards;
  }
  .success-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke: var(--accent);
    fill: none;
    animation: stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .success-check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    stroke: var(--accent);
    animation: stroke-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
  }
  @keyframes stroke-circle {
    100% { stroke-dashoffset: 0; }
  }
  @keyframes stroke-check {
    100% { stroke-dashoffset: 0; }
  }
  @keyframes scale-check {
    0%, 100% { transform: none; }
    50% { transform: scale3d(1.15, 1.15, 1); }
  }
  .success-title {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
  }
  .success-sub {
    font-size: 0.9rem;
    color: rgba(var(--ink-rgb), 0.7);
    max-width: 240px;
    font-weight: 600;
  }

  /* Info column */
  .info-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .info-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 16px;
    box-shadow: 3px 3px 0 var(--ink);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
    color: var(--ink);
    text-decoration: none;
  }
  .info-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--ink);
  }
  .info-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(var(--ink-rgb), 0.06);
    border: 1px solid rgba(var(--ink-rgb), 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink);
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;
  }
  .info-card:hover .info-icon {
    background: var(--ink);
    color: var(--white);
  }
  .info-label {
    font-size: 0.75rem;
    color: rgba(var(--ink-rgb), 0.5);
    font-weight: 700;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .info-val {
    font-size: 0.95rem;
    color: var(--ink);
    font-weight: 700;
  }

  .coffee-card {
    background: var(--white);
    border: 1.5px solid var(--ink);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 3px 3px 0 var(--ink);
    text-align: center;
    margin-top: 4px;
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  }
  .coffee-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--ink);
  }
  .coffee-emoji {
    margin-bottom: 8px;
  }
  .coffee-title {
    font-family: var(--font-head);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .coffee-sub {
    font-size: 0.85rem;
    color: var(--ink);
    font-weight: 500;
    margin-top: 4px;
  }

  @media (max-width: 900px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .form-wrap {
      padding: 24px 18px;
    }
  }
  @media (max-width: 480px) {
    .info-item {
      padding: 12px;
    }
    .info-val {
      font-size: 0.82rem;
      word-break: break-all;
    }
  }
</style>
