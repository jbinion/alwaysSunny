import convertTimeToDecimal from './convertTimeToDecimal';
import { getDayNumber } from './dayLabels';

type Episode = {
	id: number;
	season: number;
	name: string;
	number: number;
	airdate: string;
	startTime: string;
	startDay: string;
};

export type FormattedEpisode = {
	id: number;
	season: number;
	value: [number, number];
};

const convertDataToChartFormat = (data: Episode[]): FormattedEpisode[] => {
	return data
		.filter((e) => e.startTime && e.startDay)
		.map((e) => {
			return {
				id: e.id,
				season: e.season,
				value: [getDayNumber(e.startDay), convertTimeToDecimal(e.startTime)]
			};
		});
};

export default convertDataToChartFormat;
