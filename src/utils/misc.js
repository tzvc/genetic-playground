import { increasePerc } from "./math";

export const getLastItem = arr => arr[arr.length - 1];

export const getFitnessStatPercIncrease = arr => {
	if (arr.length <= 2) return 0.0;
	return increasePerc(arr[arr.length - 1].fitness, arr[arr.length - 2].fitness);
};
