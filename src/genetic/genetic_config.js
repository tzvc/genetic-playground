import { addLeadingZeros } from "../utils/string";

const bitLength = Number.MAX_SAFE_INTEGER.toString(2).length;

export const seed = () => {
	const PIDParams = [Math.random(), Math.random(), Math.random()];
	let genome = "";
	PIDParams.forEach(PIDParam => {
		genome += addLeadingZeros(
			Math.floor(PIDParam * Number.MAX_SAFE_INTEGER).toString(2),
			bitLength
		);
	});
	return genome;
};

export const mutate = entity => {
	const flipIndex = Math.floor(Math.random() * entity.length);
	function replaceAt(string, index, replace) {
		return string.substring(0, index) + replace + string.substring(index + 1);
	}
	return replaceAt(entity, flipIndex, entity[flipIndex] === "1" ? "0" : "1");
};

export const crossover = (mother, father) => {
	// two-point crossover
	var len = mother.length;
	var ca = Math.floor(Math.random() * len);
	var cb = Math.floor(Math.random() * len);
	if (ca > cb) {
		var tmp = cb;
		cb = ca;
		ca = tmp;
	}

	var son =
		father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
	var daughter =
		mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

	return [son, daughter];
};
