<script lang="ts">
  import { onMount } from "svelte";
  import { MessageSquare } from "@lucide/svelte";

  const testimonials = [
    {
      quote:
        "Dwi delivered an e-commerce platform that exceeded our expectations! The checkout flow is seamless and our conversions went up by 40% after launch. Highly recommended!",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80&auto=format&fit=crop",
      name: "Budi Santoso",
      role: "CEO, TechStartup.id",
    },
    {
      quote:
        "Sangat profesional dan detail! Dwi memahami kebutuhan bisnis kami dengan cepat dan menghadirkan solusi teknis yang bersih dan scalable. API-nya masih solid 2 tahun kemudian!",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80&auto=format&fit=crop",
      name: "Rina Maharani",
      role: "Product Manager, Digital Agency",
    },
    {
      quote:
        "The POS system Dwi built transformed our store! His attention to UX made even our least tech-savvy staff comfortable from day one. Absolutely love the result!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop",
      name: "Ahmad Rizki",
      role: "Owner, GlamStitch Fashion",
    },
  ];

  let currentCard = $state(0);
  let autoSlideTimer: any;

  function goToCard(idx: number) {
    currentCard = (idx + testimonials.length) % testimonials.length;
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      goToCard(currentCard + 1);
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  onMount(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideTimer);
  });

  // Swipe support
  let touchStartX = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToCard(currentCard + 1);
      } else {
        goToCard(currentCard - 1);
      }
      resetAutoSlide();
    }
  }
</script>

<!-- ═══ TESTIMONIALS SECTION ═══ -->
<section id="testimonials" class="section">
  <div class="container">
    <!-- Header -->
    <div class="reveal reveal-zoom-out" style="margin-bottom: 40px;">
      <div class="section-label">
        <MessageSquare size={12} /> Testimonials
      </div>
      <h2 class="section-title">What Clients Say</h2>
    </div>

    <!-- Carousel -->
    <div class="testimonial-wrap reveal reveal-zoom-in reveal-d1">
      <div
        class="testimonial-track"
        style="transform: translateX(-{currentCard * 100}%);"
        ontouchstart={handleTouchStart}
        ontouchend={handleTouchEnd}
        role="presentation"
      >
        {#each testimonials as t, i}
          <div class="testimonial-card" class:active={i === currentCard}>
            <svg class="bg-quote" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <blockquote class="testi-quote">
              "{t.quote}"
            </blockquote>
            <div class="testi-author">
              <img class="testi-avatar" src={t.avatar} alt={t.name} />
              <div>
                <div class="testi-name">{t.name}</div>
                <div class="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Navigation -->
      <div class="testi-nav">
        <button
          class="testi-btn"
          aria-label="Previous"
          onclick={() => {
            goToCard(currentCard - 1);
            resetAutoSlide();
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="testi-btn"
          aria-label="Next"
          onclick={() => {
            goToCard(currentCard + 1);
            resetAutoSlide();
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div class="testi-dots">
          {#each testimonials as _, i}
            <button
              class="testi-dot"
              class:active={i === currentCard}
              onclick={() => {
                goToCard(i);
                resetAutoSlide();
              }}
              aria-label="Go to slide {i + 1}"
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .testimonial-wrap {
    position: relative;
    overflow: hidden;
  }

  .testimonial-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .testimonial-card {
    min-width: 100%;
    box-sizing: border-box;
    padding: 40px;
    background: var(--white);
    border: 1px solid rgba(var(--ink-rgb), 0.15);
    border-radius: 0;
    box-shadow: none;
    position: relative;
    overflow: hidden;
    opacity: 0.3;
    transform: scale(0.95);
    transition:
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.6s ease;
  }

  .testimonial-card.active {
    opacity: 1;
    transform: scale(1);
  }

  .bg-quote {
    position: absolute;
    top: -10px;
    right: 20px;
    width: 120px;
    height: 120px;
    color: rgba(var(--ink-rgb), 0.04);
    pointer-events: none;
    z-index: 0;
    transform: rotate(-10deg);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .testimonial-card.active .bg-quote {
    transform: rotate(10deg) scale(1.15);
  }

  .testi-quote {
    font-family: var(--font-body);
    font-size: clamp(1.1rem, 2.2vw, 1.4rem);
    font-weight: 500;
    color: var(--ink);
    line-height: 1.6;
    margin-bottom: 28px;
    letter-spacing: -0.01em;
    position: relative;
    z-index: 1;
  }

  .testi-author {
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 1;
  }

  .testi-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--ink);
    box-shadow: none;
  }

  .testi-name {
    font-family: var(--font-head);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .testi-role {
    font-size: 0.75rem;
    color: rgba(var(--ink-rgb), 0.7);
    margin-top: 2px;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .testi-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
  }

  .testi-btn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink);
    cursor: pointer;
    background: var(--white);
    box-shadow: none;
    transition: background 0.3s var(--ease), color 0.3s var(--ease);
  }

  .testi-btn:hover {
    background: var(--ink);
    color: var(--white);
  }

  .testi-dots {
    display: flex;
    gap: 6px;
    margin-left: 8px;
  }

  .testi-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid var(--ink);
    cursor: pointer;
    transition:
      background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.4s;
    padding: 0;
  }

  .testi-dot.active {
    background: var(--ink);
    width: 20px;
    border-radius: 99px;
  }
</style>
