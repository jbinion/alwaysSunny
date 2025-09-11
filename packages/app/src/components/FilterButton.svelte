<script lang="ts">
	export let active = false;
	export let handleClick: () => void;
	export let title: string;
</script>

<button on:click={handleClick} class="filterButton" class:active>{title}</button>
