<script>
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	let chartContainer;
	let chart;
	const dayLabels = {
		1: 'Sunday',
		2: 'Monday',
		3: 'Tuesday',
		4: 'Wednesday',
		5: 'Thursday',
		6: 'Friday',
		7: 'Saturday'
	};
	// Sample data for the scatter chart
	const scatterData = [
		[1, 8],
		[1, 8],
		[1, 8],
		[1, 8],
		[2, 14],
		[3, 9],
		[1, 22],
		[4, 16],
		[5, 7],
		[6, 19],
		[7, 11],
		[2, 23],
		[3, 6],
		[4, 13],
		[5, 17],
		[6, 4],
		[7, 20],
		[1, 15],
		[2, 2],
		[3, 18],
		[4, 10],
		[5, 21],
		[6, 12],
		[7, 5],
		[1, 1]
	];

	onMount(() => {
		// Initialize the chart
		chart = echarts.init(chartContainer);
		// Function to spread overlapping points deterministically
		function processOverlappingData(data) {
			const pointGroups = {};

			// Group points by their coordinates
			data.forEach((point, index) => {
				const [x, y] = point;
				const key = `${x},${y}`;
				if (!pointGroups[key]) {
					pointGroups[key] = [];
				}
				pointGroups[key].push({ point, originalIndex: index });
			});

			const processedData = [];

			// Process each group
			Object.entries(pointGroups).forEach(([key, group]) => {
				const [originalX, originalY] = group[0].point;
				const count = group.length;

				if (count === 1) {
					// Single point, no adjustment needed
					processedData.push({
						value: [originalX, originalY],
						symbolSize: 8,
						count: 1,
						originalX: originalX,
						originalY: originalY
					});
				} else {
					// Multiple points, spread them out evenly
					const spacing = 0.1; // Adjust this to control spacing
					const totalWidth = (count - 1) * spacing;
					const startOffset = -totalWidth / 2;

					group.forEach((item, i) => {
						const xOffset = startOffset + i * spacing;
						processedData.push({
							value: [originalX + xOffset, originalY],
							symbolSize: 8,
							count: count,
							originalX: originalX,
							originalY: originalY,
							episodeIndex: item.originalIndex // Keep track of which episode this is
						});
					});
				}
			});

			return processedData;
		}

		const processedData = processOverlappingData(scatterData);
		const option = {
			title: {
				text: 'Scatter Chart Example',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: 'X: {c0}<br/>Y: {c1}'
			},
			xAxis: {
				type: 'value',
				nameLocation: 'middle',
				nameGap: 30,
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: function (value) {
						return dayLabels[value] || null;
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
						type: 'dashed'
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
						color: '#3b82f6',
						opacity: 0.8
					},
					emphasis: {
						itemStyle: {
							color: '#1d4ed8',
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

<div class="chart-wrapper">
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
		border: 1px solid #e5e7eb;
		border-radius: 8px;
	}
</style>
