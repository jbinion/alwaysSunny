// input example : 11:45 pm

const convertTimeToDecimal = (input: string): number => {
	const [time, amPm] = input.toLowerCase().split(' ');

	let hours = parseInt(time.split(':')[0], 10);

	const minutes = parseInt(time.split(':')[1], 10);

	if (amPm === 'pm' && hours < 12) {
		hours += 12;
	}
	const formattedMinutes = Number((minutes / 60).toFixed(2));
	const result = hours + formattedMinutes;
	return result;
};
export default convertTimeToDecimal;
