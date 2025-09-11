<script lang="ts">
	import episodes from '../../data/episodes.json';
	import EpisodeCard from '../../components/EpisodeCard.svelte';
	import FilterButton from '../../components/FilterButton.svelte';
	let sortMode: 'chrono' | 'day' | 'unknown' = 'chrono';
	const dayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	const sortedByDay = [...episodes]
		.filter((x) => x.startDay)
		.sort(
			(a, b) =>
				dayList.indexOf(a.startDay.toLowerCase()) - dayList.indexOf(b.startDay.toLowerCase())
		);
	const unknownDay = [...episodes].filter((x) => x.startDay === '');
	const handleClick = (mode: typeof sortMode) => {
		sortMode = mode;
	};
</script>

<div class="flex flex-col space-y-4 px-12 py-12">
	<div class="mb-12 space-x-6">
		<FilterButton
			title="Chronological"
			handleClick={() => handleClick('chrono')}
			active={sortMode === 'chrono'}
		/>
		<FilterButton
			title="By Day"
			handleClick={() => handleClick('day')}
			active={sortMode === 'day'}
		/>
		<FilterButton
			title="Unknown Start Day"
			handleClick={() => handleClick('unknown')}
			active={sortMode === 'unknown'}
		/>
	</div>

	{#if sortMode === 'chrono'}
		{#each episodes as episode, index (episode.name)}
			<EpisodeCard
				{...episode}
				active={index < episodes.length - 1 && episodes[index + 1].season !== episode.season}
			/>
		{/each}
	{/if}
	{#if sortMode === 'day'}
		{#each sortedByDay as episode, index (episode.name)}
			<EpisodeCard
				{...episode}
				active={index < sortedByDay.length - 1 &&
					sortedByDay[index + 1].startDay.toLowerCase() !== episode.startDay.toLowerCase()}
			/>
		{/each}
	{/if}
	{#if sortMode === 'unknown'}
		{#each unknownDay as episode, index (episode.name)}
			<EpisodeCard {...episode} active={false} />
		{/each}
	{/if}
</div>
