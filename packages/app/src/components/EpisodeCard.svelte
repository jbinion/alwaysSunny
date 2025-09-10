<script>
	import capitalizeFirstLetter from '$lib/capitalizeFirstLetter';

    export let name = ''
export let startTime=''
export let startDay=''
export let season = 0
export let number=0
export let active = false
</script>

		<div
			class="border-foreground-muted flex flex-row items-center gap-8 py-4 md:gap-12"
			class:border-b={active}
		>
			<p class="w-[48px] text-xl font-bold">s{season}:{number}</p>

			<div>
				<p>{name}</p>
				{#if startTime !== '' && startDay !== ''}
					<p class="text-foreground-muted font-light">
						{startTime} on a {capitalizeFirstLetter(startDay)}
					</p>
				{/if}
			</div>
		</div>