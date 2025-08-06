<script lang="ts">
	import capitalizeFirstLetter from '$lib/capitalizeFirstLetter';
	import episodes from '../../../../episodes.json';
</script>

<div class="flex flex-col space-y-12 px-12 pb-12">
	<div class="grid grid-cols-1">
		{#each episodes as episode, index}
			<div
				class="flex flex-row items-center gap-4 border-zinc-300 py-4"
				class:border-b={index < episodes.length - 1 &&
					episodes[index + 1].season !== episode.season}
			>
				<p class="w-48 text-center text-xl font-bold">s{episode.season}:{episode.number}</p>

				<div class="text-start">
					<p>{episode.name}</p>
					{#if episode.startTime !== '' && episode.startDay !== ''}
						<p class="font-light text-zinc-300">
							{episode.startTime} on a {capitalizeFirstLetter(episode.startDay)}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
