import capitalizeFirstLetter from '$lib/capitalizeFirstLetter';
import type { Episode } from './convertDataToChartFormat';

export default function Tooltip(episode: Episode): string {
	const { name, season, number, startTime, startDay } = episode;

	return `
		<div style="padding: 10px;">
			<div style="color: #000000; font-weight: bold; margin-bottom: 4px;">
				${name}
			</div>
			<div style="margin-bottom: 4px;">
				Season: ${season} - Episode: ${number}
			</div>
			<p>${startTime.toLowerCase()} on a ${capitalizeFirstLetter(startDay)}</p>
		</div>
	`;
}
