<script>
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import episodes from '../../../episodes.json';
	import { getDayString } from '$lib/dayLabels';
	import convertDataToChartFormat from '$lib/convertDataToChartFormat';
	import capitalizeFirstLetter from '$lib/capitalizeFirstLetter';

	console.log(episodes.filter((e) => e.startTime && e.startDay));

	const realData = convertDataToChartFormat(episodes);

	console.log(realData);
	let chartContainer;
	let chart;

	onMount(() => {
		chart = echarts.init(chartContainer);
		// Function to spread overlapping points deterministically
		function processOverlappingData(data) {
			const pointGroups = {};
			const processedData = [];

			// Group points by their coordinates
			data.forEach((point, index) => {
				const [x, y] = point;
				const key = `${x},${y}`;
				if (!pointGroups[key]) {
					pointGroups[key] = [];
				}
				pointGroups[key].push({ point, episodeIndex: index });
			});

			Object.entries(pointGroups).forEach(([key, group]) => {
				const [originalX, originalY] = group[0].point;
				const count = group.length;

				if (count === 1) {
					// Single point, no adjustment needed
					processedData.push({
						value: [originalX, originalY],
						symbolSize: 8,
						episodeIndex: group[0].episodeIndex
					});
				} else {
					// Multiple points, spread them out evenly
					const spacing = 0.1;
					const totalWidth = (count - 1) * spacing;
					const startOffset = -totalWidth / 2;

					group.forEach((item, i) => {
						const xOffset = startOffset + i * spacing;
						processedData.push({
							value: [originalX + xOffset, originalY],
							symbolSize: 8,
							episodeIndex: item.episodeIndex
						});
					});
				}
			});

			return processedData;
		}

		const processedData = processOverlappingData(realData);
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					console.log(params.data);
					const data = params.data;
					const episodeData = episodes[data.episodeIndex]; // Access original episode data

					return `
            <div style="padding: 10px;">
                <div style="color: #000000; font-weight: bold; margin-bottom: 4px;">
                    ${episodeData?.name || 'Episode'}
                </div>
                <div style="margin-bottom: 4px;">
                Season: ${episodeData?.season || 'N/A'} -
				Episode: ${episodeData?.number || 'N/A'}
                </div>
                <div style="margin-bottom: 4px;">
                   
                </div>
			   <p>${episodeData.startTime.toLowerCase()} on a ${capitalizeFirstLetter(episodeData.startDay)}</p>
            </div>
        `;
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
					formatter: function (value) {
						// Check screen size and return appropriate label
						const isSmall = window.innerWidth < 768;

						if (isSmall) {
							// Single letter labels for small screens
							const shortDays = ['', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
							return shortDays[value] || null;
						} else {
							// Use your existing getDayString function for larger screens
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
					formatter: function (value) {
						// Convert 24-hour to 12-hour format

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
					itemStyle: {
						color: '#FED82B',
						opacity: 0.8
					},
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
				bottom: '15%'
			}
		};

		// Set the option and render the chart
		chart.setOption(option);

		// Handle window resize
		const handleResize = () => {
			chart.resize();
		};

		window.addEventListener('resize', handleResize);

		// Store the resize handler for cleanup
		chart._resizeHandler = handleResize;
	});

	onDestroy(() => {
		if (chart) {
			// Remove resize listener
			if (chart._resizeHandler) {
				window.removeEventListener('resize', chart._resizeHandler);
			}
			// Dispose of the chart
			chart.dispose();
		}
	});
</script>

<div class="chart-wrapper min-h-screen bg-black text-center">
	<p class="mt-12 text-4xl text-white">IASIP Time Chart</p>
	<div>
		<p>Season 01</p>
	</div>
	<p>data</p>
	<div bind:this={chartContainer} class="chart-container"></div>
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
