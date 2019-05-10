import Genetic from "genetic-js";

const map = (number, in_min, in_max, out_min, out_max) => {
	return (
		((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	);
};

const bitLength = Number.MAX_SAFE_INTEGER.toString(2).length;
const addLeadingZeros = (str, targetLength) => {
	return "0".repeat(targetLength - str.length) + str;
};

export default class GeneticEngine {
	constructor() {
		this.engine = Genetic.create();

		this.engine.optimize = Genetic.Optimize.Maximize;
		this.engine.select1 = Genetic.Select1.Tournament2;
		this.engine.select2 = Genetic.Select2.Tournament2;

		this.engine.seed = () => {
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

		this.engine.mutate = entity => {
			const flipIndex = Math.floor(Math.random() * entity.length);
			entity[flipIndex] = entity[flipIndex] === "1" ? "0" : "1";
			return entity;
		};

		this.engine.crossover = (mother, father) => {
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

		this.engine.fitness = entity => {};

		this.engine.generation = (pop, generation, stats) => {};

		this.engine.notification = (pop, generation, stats, isFinished) => {};
	}
}
