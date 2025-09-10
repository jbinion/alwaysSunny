const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getDayNumber(dayString: string): number {
	return days.indexOf(dayString.toLowerCase()) + 1;
}
function getDayString(dayNumber: number): string {
	const result = days[dayNumber - 1];
	if (!result) return '';
	return result.split('')[0].toUpperCase() + result.slice(1) || '';
}

export { getDayNumber, getDayString };
