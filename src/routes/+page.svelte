<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import About from "$lib/components/About.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Roadmap from "$lib/components/Roadmap.svelte";
  import Socials from "$lib/components/Socials.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />

<main id="main-content">
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Roadmap />
  <Socials />
  <Contact />
</main>

<Footer />
