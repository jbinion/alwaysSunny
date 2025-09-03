<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mx-auto min-h-screen max-w-screen-lg">
	<div class="mb-6 flex flex-row justify-end p-4 py-4 text-end">
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
