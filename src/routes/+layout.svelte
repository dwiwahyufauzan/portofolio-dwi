<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { ArrowUp } from '@lucide/svelte';
	import Preloader from '$lib/components/Preloader.svelte';

	let { children } = $props();

	let showScrollTop = $state(false);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		const handleScroll = () => {
			showScrollTop = window.scrollY > 400;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Global observer for new magnetic elements (since some might be rendered later or within components)
		const setupMagnetic = () => {
			const magneticElements = document.querySelectorAll('.magnetic');
			magneticElements.forEach((el) => {
				// avoid attaching multiple times
				if ((el as any)._magneticAttached) return;
				(el as HTMLElement).addEventListener('mousemove', (e) => {
						const rect = el.getBoundingClientRect();
							const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
							const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;
							(el as HTMLElement).style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
						});
				el.addEventListener('mouseleave', () => {
					(el as HTMLElement).style.transform = `translate(0px, 0px)`;
					(el as HTMLElement).style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
				});
				el.addEventListener('mouseenter', () => {
					(el as HTMLElement).style.transition = 'none';
				});
			});
		};
		
		setupMagnetic();
		const observer = new MutationObserver(setupMagnetic);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Dwi Wahyu Fauzan — Fullstack Developer</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Portfolio Dwi Wahyu Fauzan — Fullstack Developer. Membangun produk digital modern dengan SvelteKit, Node.js, dan teknologi web terkini." />
	<meta name="keywords" content="fullstack developer, web developer, SvelteKit, Node.js, portfolio, Dwi Wahyu Fauzan, Indonesia" />
</svelte:head>

<div class="scroll-progress"></div>

<Preloader />

{@render children()}

{#if showScrollTop}
	<button
		class="scroll-top-btn"
		onclick={scrollToTop}
		transition:fade={{ duration: 200 }}
		aria-label="Back to top"
		type="button"
	>
		<ArrowUp size={18} strokeWidth={2.5} />
	</button>
{/if}