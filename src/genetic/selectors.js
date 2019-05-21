export const individualSelectors = {
	tournament2: (population, optimizer) => {
		var n = population.length;
		var a = population[Math.floor(Math.random() * n)];
		var b = population[Math.floor(Math.random() * n)];
		return optimizer(a.fitness, b.fitness) ? a.genome : b.genome;
	},
	tournament3: (population, optimizer) => {
		var n = population.length;
		var a = population[Math.floor(Math.random() * n)];
		var b = population[Math.floor(Math.random() * n)];
		var c = population[Math.floor(Math.random() * n)];
		var best = optimizer(a.fitness, b.fitness) ? a : b;
		best = optimizer(best.fitness, c.fitness) ? best : c;
		return best.genome;
	},
	fittest: (population, optimizer) => population[0].genome,
	random: (population, optimizer) =>
		population[Math.floor(Math.random() * population.length)].genome
};

export const parentsSelectors = {
	tournament2: (population, optimizer) => [
		individualSelectors.tournament2(population, optimizer),
		individualSelectors.tournament2(population, optimizer)
	],
	tournament3: (population, optimizer) => [
		individualSelectors.tournament3(population, optimizer),
		individualSelectors.tournament3(population, optimizer)
	],
	random: population => [
		individualSelectors.random(population),
		individualSelectors.random(population)
	],
	fittestRandom: population => [
		individualSelectors.fittest(population),
		individualSelectors.random(population)
	]
};
