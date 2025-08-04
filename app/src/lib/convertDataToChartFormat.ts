import convertTimeToDecimal from './convertTimeToDecimal';
import { getDayNumber } from './dayLabels';

const convertDataToChartFormat = (data) => {
	return data
		.filter((e) => e.startTime && e.startDay)
		.map((e) => {
			return [getDayNumber(e.startDay), convertTimeToDecimal(e.startTime)];
		});
};

export default convertDataToChartFormat;
