import convertTimeToDecimal from './convertTimeToDecimal';
import { getDayNumber } from './dayLabels';
import episodes from '../../../episodes.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		color: string;
		opacity: number;
	};
};

export function processOverlappingData(selectedSeason: number | null): Result[] {
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

	const results: Result[] = [];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
			const spacing = 0.1;
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
	if (selectedSeason === null) return 6;
	return season === selectedSeason ? 8 : 4;
}

function getItemStyle(
	season: number,
	selectedSeason: number | null
): { color: string; opacity: number } {
	const baseOpacity = selectedSeason === null ? 0.8 : season === selectedSeason ? 0.8 : 0.4;
	return {
		color: '#FED82B',
		opacity: baseOpacity
	};
}
