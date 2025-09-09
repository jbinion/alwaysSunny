import convertTimeToDecimal from './convertTimeToDecimal';
import { getDayNumber } from './dayLabels';
import episodes from '../../../episodes.json';

export type Episode = {
	id: number;
	season: number;
	name: string;
	number: number;
	airdate: string;
	startTime: string;
	startDay: string;
};

export type Result = {
	id: number;
	value: [number, number];
	symbolSize: number;
	itemStyle: {
		opacity: number;
	};
};

const defaultSize = 6;
const hiddenSize = 3;
const highlightedSize = 8;
const defaultOpacity = 1;
const hiddenOpacity = 0.6;
const spacing = 0.1;

export function processOverlappingData(selectedSeason: number | null): Result[] {
	const results: Result[] = [];

	const groupedByCoordinates = episodes
		.filter((e) => e.startTime && e.startDay)
		.reduce(
			(acc, e) => {
				const key = `${e.startDay.toLowerCase()},${e.startTime.toLowerCase()}`;
				if (!acc[key]) acc[key] = [];
				acc[key].push(e);
				return acc;
			},
			{} as Record<string, typeof episodes>
		);

	Object.entries(groupedByCoordinates).forEach(([_, group]) => {
		const { startDay, startTime } = group[0];
		const x = getDayNumber(startDay);
		const y = convertTimeToDecimal(startTime);

		if (group.length === 1) {
			const { id, season } = group[0];
			results.push({
				id,
				value: [x, y],
				symbolSize: getSymbolSize(season, selectedSeason),
				itemStyle: getItemStyle(season, selectedSeason)
			});
		} else {
			const startOffset = -((group.length - 1) * spacing) / 2;

			group.forEach((ep, i) => {
				results.push({
					id: ep.id,
					value: [x + startOffset + i * spacing, y],
					symbolSize: getSymbolSize(ep.season, selectedSeason),
					itemStyle: getItemStyle(ep.season, selectedSeason)
				});
			});
		}
	});

	return results;
}

function getSymbolSize(season: number, selectedSeason: number | null): number {
	if (selectedSeason === null) return defaultSize;
	return season === selectedSeason ? highlightedSize : hiddenSize;
}

function getItemStyle(season: number, selectedSeason: number | null): { opacity: number } {
	const baseOpacity =
		selectedSeason === null
			? defaultOpacity
			: season === selectedSeason
				? defaultOpacity
				: hiddenOpacity;
	return {
		opacity: baseOpacity
	};
}
