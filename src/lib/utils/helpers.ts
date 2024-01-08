export function getRandomValuesFromArray(array: any[], numberOfValues: number) {
	const shuffled = array.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, numberOfValues);
}
