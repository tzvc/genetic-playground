import { addLeadingZeros } from "../utils/string";

const bitLength = Number.MAX_SAFE_INTEGER.toString(2).length;

/**
 * Seed intitial population with random chromosomes
 */
export const seed = () => {
	const PIDParams = [Math.random(), Math.random(), Math.random()];
	let chromosome = "";
	PIDParams.forEach(PIDParam => {
		chromosome += addLeadingZeros(
			Math.floor(PIDParam * Number.MAX_SAFE_INTEGER).toString(2),
			bitLength
		);
	});
	return chromosome;
};

/**
 * Perform random bit flip mutation
 * @param {String} chromosome Individual's chromosome
 */
export const mutate = chromosome => {
	const flipIndex = Math.floor(Math.random() * chromosome.length);
	function replaceAt(string, index, replace) {
		return string.substring(0, index) + replace + string.substring(index + 1);
	}
	return replaceAt(
		chromosome,
		flipIndex,
		chromosome[flipIndex] === "1" ? "0" : "1"
	);
};

/**
 * Perform random two-point crossover
 * @param {Object} mother Selected mother chromosome
 * @param {Object} father Selected father chromosome
 */
export const crossover = (mother, father) => {
	// two-point crossover
	let ca = Math.floor(Math.random() * mother.length);
	let cb = Math.floor(Math.random() * mother.length);
	if (ca > cb) {
		const tmp = cb;
		cb = ca;
		ca = tmp;
	}

	const son =
		father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
	const daughter =
		mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

	return [son, daughter];
};
