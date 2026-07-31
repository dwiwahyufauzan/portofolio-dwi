<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon-logo.png';
	import { onMount } from 'svelte';
	import Preloader from '$lib/components/Preloader.svelte';

	let { children } = $props();

	onMount(() => {
		// Global IntersectionObserver for .reveal elements
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add('visible');
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
		);
		document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

		// Magnetic hover (global — for any .magnetic elements)
		const setupMagnetic = () => {
			document.querySelectorAll('.magnetic').forEach((el) => {
				if ((el as any)._magneticAttached) return;
				(el as any)._magneticAttached = true;
				(el as HTMLElement).addEventListener('mousemove', (e) => {
					const rect = el.getBoundingClientRect();
					const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
					const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;
					(el as HTMLElement).style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
				});
				el.addEventListener('mouseleave', () => {
					(el as HTMLElement).style.transform = 'translate(0,0)';
					(el as HTMLElement).style.transition = 'transform 0.4s var(--ease)';
				});
				el.addEventListener('mouseenter', () => {
					(el as HTMLElement).style.transition = 'none';
				});
			});
		};
		setupMagnetic();
		const mutObs = new MutationObserver(setupMagnetic);
		mutObs.observe(document.body, { childList: true, subtree: true });

		return () => {
			io.disconnect();
			mutObs.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Dwi Wahyu Fauzan — Fullstack Software Engineer</title>
	<link rel="icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="description" content="Portfolio Dwi Wahyu Fauzan — Fullstack Software Engineer. Membangun produk digital modern yang presisi, elegan, dan siap scale dengan SvelteKit, Node.js, dan TypeScript." />
	<meta name="keywords" content="fullstack developer, web developer, SvelteKit, Node.js, TypeScript, portfolio, Dwi Wahyu Fauzan, Indonesia" />
	<meta property="og:title" content="Dwi Wahyu Fauzan — Fullstack Software Engineer" />
	<meta property="og:description" content="Portfolio Dwi Wahyu Fauzan — Membangun produk digital modern yang presisi dan elegan." />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Scroll progress indicator -->
<div class="scroll-progress" aria-hidden="true"></div>

<!-- Preloader (Demon Eye Awakening) -->
<Preloader />

<!-- Page content -->
{@render children()}