import Genetic from "genetic-js";

const genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = () => {
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

genetic.mutate = entity => {
	const flipIndex = Math.floor(Math.random() * entity.length);
	entity[flipIndex] = entity[flipIndex] === "1" ? "0" : "1";
	return entity;
};

genetic.crossover = (mother, father) => {
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

genetic.fitness = entity => {};

genetic.generation = (pop, generation, stats) => {};

genetic.notification = (pop, generation, stats, isFinished) => {};
