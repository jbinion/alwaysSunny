<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import episodes from '../../../episodes.json';
	import { getDayString } from '$lib/dayLabels';
	import { processOverlappingData, type Result } from '$lib/convertDataToChartFormat';
	import Tooltip from '$lib/Tooltip';
	import type { CallbackDataParams } from 'echarts/types/dist/shared';

	let chartContainer: HTMLDivElement;
	let chart: echarts.ECharts;
	let selectedSeason: number | null = null;
	const seasons = Array.from(new Set(episodes.map((e) => e.season)));
	const resizeHandler = () => {
		chart.resize();
	};

	onMount(() => {
		chart = echarts.init(chartContainer);

		const processedData = processOverlappingData(selectedSeason);
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: function (params: CallbackDataParams) {
					console.log(params.data);
					const data = params.data as Result;
					const episodeData = episodes.find((x) => x.id === data.id);
					if (!episodeData) return '';
					return Tooltip(episodeData);
				}
			},
			xAxis: {
				type: 'value',
				nameLocation: 'middle',
				nameGap: 30,
				min: 0,
				max: 8,
				interval: 1,
				splitLine: {
					lineStyle: {
						type: 'dashed',
						color: '#333333'
					}
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: function (value: number) {
						const isSmall = window.innerWidth < 768;

						if (isSmall) {
							const shortDays = ['', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
							return shortDays[value] || null;
						} else {
							return getDayString(value) || null;
						}
					}
				}
			},
			yAxis: {
				type: 'value',
				showLine: false,
				inverse: true,
				nameGap: 15,
				min: 0,
				max: 24,
				interval: 2,
				splitLine: {
					lineStyle: {
						type: 'dashed',
						color: '#333333'
					}
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: function (value: number) {
						if (value === 0) return '12:00 AM';
						if (value === 12) return '12:00 PM';
						if (value < 12) return `${value}:00 AM`;
						return `${value - 12}:00 PM`;
					}
				}
			},
			series: [
				{
					name: 'Data Points',
					type: 'scatter',
					data: processedData,
					symbolSize: 8,

					emphasis: {
						itemStyle: {
							opacity: 1,
							borderColor: '#fff',
							borderWidth: 2
						}
					}
				}
			],
			grid: {
				left: '10%',
				right: '10%',
				bottom: '15%',
				top: '0%'
			}
		};

		chart.setOption(option, true);

		window.addEventListener('resize', resizeHandler);
	});

	onDestroy(() => {
		if (chart) {
			if (resizeHandler) {
				window.removeEventListener('resize', resizeHandler);
			}
			chart.dispose();
		}
	});
	const onSeasonSelect = (seasonNumber: number) => {
		console.log(seasonNumber);
		selectedSeason === seasonNumber ? (selectedSeason = null) : (selectedSeason = seasonNumber);
		const processedData = processOverlappingData(selectedSeason);
		chart.setOption({
			series: [{ data: processedData }]
		});
	};
</script>

<div class="space-y-12">
	<p class="text-center text-4xl">IASIP Time Chart</p>

	<div class="flex flex-row flex-wrap justify-center gap-4">
		{#each seasons as season}
			<button
				class="seasonButton"
				class:active={season === selectedSeason}
				on:click={() => onSeasonSelect(season)}
			>
				Season {season}
			</button>
		{/each}
	</div>
	<div class="chart-wrapper">
		<div bind:this={chartContainer} class="chart-container"></div>
	</div>
</div>

<style>
	.chart-wrapper {
		width: 100%;
		padding: 20px;
	}

	.chart-container {
		width: 100%;
		height: 800px;
	}
</style>
