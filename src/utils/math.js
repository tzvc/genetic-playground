export const lerp = (number, in_min, in_max, out_min, out_max) => {
	return (
		((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	);
};

export const increasePerc = (a, b) => ((a - b) / b) * 100;
