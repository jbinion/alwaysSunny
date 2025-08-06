<script lang="ts">
	import episodes from '../../../../episodes.json';
</script>

<div class="container mx-auto flex flex-col space-y-12 px-12 pb-12 pt-12">
	<div class="text-start">
		<a href="/">Back</a>
	</div>
	<p class="text-start">All Episodes</p>
	<div class="grid grid-cols-1">
		{#each episodes as episode, index}
			<div
				class="flex flex-row items-center gap-4 py-4"
				class:border-b={index < episodes.length - 1 &&
					episodes[index + 1].season !== episode.season}
			>
				<p class="w-48 text-xl font-bold">s{episode.season}:{episode.number}</p>

				<div class="text-start">
					<p>{episode.name}</p>
					{#if episode.startTime !== '' && episode.startDay !== ''}
						<p class="font-light">{episode.startTime} on a {episode.startDay}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
