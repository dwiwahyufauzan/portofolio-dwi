<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import About from "$lib/components/About.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";

  onMount(() => {
    // ── animation-on-scroll Skill IntersectionObserver ──────────────────
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" };

    const inViewIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate", "visible");
          inViewIO.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".animate-on-scroll, .reveal, .section")
      .forEach((el) => inViewIO.observe(el));

    return () => {
      inViewIO.disconnect();
    };
  });
</script>

<Navbar />
<main>
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Contact />
</main>
<Footer />
