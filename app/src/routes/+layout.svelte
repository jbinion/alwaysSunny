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
	<div class="mb-12 flex flex-row justify-between p-4 py-6 text-start">
		<div class="space-x-4">
			<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
			<a href="/data" class:active={$page.url.pathname === '/data'}>All Episodes</a>
		</div>

		<a href="https://www.github.com/jbinion/alwaysSunny" target="_blank"
			><Icon src={AiFillGithub} size="24px" /></a
		>
	</div>
	{@render children?.()}
</div>
