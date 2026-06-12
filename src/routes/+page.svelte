<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import About from "$lib/components/About.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Game from "$lib/components/Game.svelte";

  onMount(() => {
    // ── Scroll reveal ─────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            e.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.01 },
    );
    document
      .querySelectorAll(".section")
      .forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
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
  <Game />
</main>
<Footer />
