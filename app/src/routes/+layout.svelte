<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { BsSun, BsMoon } from 'svelte-icons-pack/bs';
	import { Icon } from 'svelte-icons-pack';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children } = $props();

	let theme = $state<'light' | 'dark'>('dark');

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light') {
			theme = 'light';
		}
	});

	$effect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			localStorage.setItem('theme', 'light');
		} else {
			document.documentElement.classList.remove('light');
			localStorage.setItem('theme', 'dark');
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mx-auto min-h-screen max-w-screen-lg">
	<div class="mb-6 flex flex-row items-center justify-end gap-4 p-4 py-4 text-end">
		<button
			on:click={toggleTheme}
			class="bg-button-active text-foreground rounded-full p-2 transition-colors hover:opacity-80"
		>
			{#if theme === 'light'}
				<Icon src={BsMoon} size="18px" />
			{:else}
				<Icon src={BsSun} size="18px" />
			{/if}
		</button>
		<a
			href="https://www.github.com/jbinion/alwaysSunny"
			target="_blank"
			aria-label="View project on github"><Icon src={AiFillGithub} size="24px" /></a
		>
	</div>

	<div class="mb-12 flex flex-col items-center">
		<p class="title mb-6 text-center text-4xl">IASIP Start Chart</p>
		<div class="space-x-6">
			<a href="/" class:active={$page.url.pathname === '/'}>Chart</a>
			<a href="/data" class:active={$page.url.pathname === '/data'}>List</a>
		</div>
	</div>

	{@render children?.()}
</div>
