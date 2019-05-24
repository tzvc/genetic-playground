import { increasePerc } from "./math";

export const getLastItem = arr => arr[arr.length - 1];

export const getFitnessStatPercIncrease = arr => {
	if (arr.length <= 2) return 0.0;
	return increasePerc(arr[arr.length - 1].fitness, arr[arr.length - 2].fitness);
};

export const statsToCSVFile = (best, avg) => {
	const legend = `generation,best_fitness,average_fitness`;
	let csv = "";
	best.forEach(
		(d, idx) => (csv += `${d.generation},${d.fitness},${avg[idx].fitness}\n`)
	);

	console.log(csv);
	return encodeURI(`data:text/csv;charset=utf-8,${legend}\n${csv}`);
};
