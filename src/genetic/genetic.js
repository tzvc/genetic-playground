const optimizers = {
	maximize: (a, b) => a >= b,
	minimize: (a, b) => a < b
};

const individualSelectors = {
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

const parentsSelector = {
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
	FittestRandom: population => [
		individualSelectors.fittest(population),
		individualSelectors.random(population)
	]
};
module.exports = class Genetic {
	constructor(config) {
		const defaultConfig = {
			iterations: 10000,
			population_size: 1000,
			mutation_rate: 0.3,
			crossover_rate: 0.3,
			fittestAlwaysSurvive: true
		};
		this.config = defaultConfig;

		// internals
		this.population = [];

		// population functions
		this.fitness = null;
		this.seed = null;
		this.mutate = null;
		this.crossover = null;
		this.optimize = optimizers.maximize;
		this.generation = null;
		this.notification = null;
		// selection functions
		this.selectParents = parentsSelector.tournament2;
		this.selectIndividual = individualSelectors.tournament2;
	}

	newIndividualFromGenome(genome) {
		return {
			fitness: 0,
			genome
		};
	}

	shouldApplyFromRate(rate) {
		return Math.random() <= rate;
	}

	evolve() {
		// seed population
		for (let i = 0; i < this.config.population_size; ++i)
			this.population.push(this.newIndividualFromGenome(this.seed()));
		// main loop
		for (let i = 0; i < this.config.iterations; ++i) {
			// calculate population fitness and rank them
			this.population = this.population
				.map(individual => {
					//console.log("evaluating fitness", individual.genome);
					return {
						fitness: this.fitness(individual.genome),
						genome: individual.genome
					};
				})
				.sort((a, b) => (this.optimize(a.fitness, b.fitness) ? -1 : 1));

			// user controlled stop
			if (this.generation ? this.generation(this.population) : false) break;

			this.notification(this.population, i);
			// evolve population
			let newPopulation = [];

			// if option specified, keep fittest individual
			if (this.config.fittestAlwaysSurvive)
				newPopulation.push(this.population[0]);

			// generate next population round
			while (newPopulation.length < this.config.population_size) {
				if (
					this.crossover &&
					this.shouldApplyFromRate(this.config.crossover_rate) &&
					newPopulation.length + 1 < this.config.population_size
				) {
					const parents = this.selectParents(this.population, this.optimize);
					//console.log("parents", parents);
					const childrens = this.crossover(parents[0], parents[1]);
					//console.log("childrens", childrens);
					newPopulation.concat(
						childrens.map(children => this.newIndividualFromGenome(children))
					);
				} else {
					let indiv = this.selectIndividual(this.population, this.optimize);
					if (this.shouldApplyFromRate(this.config.mutation_rate)) {
						indiv = this.mutate(indiv);
					}
					newPopulation.push(this.newIndividualFromGenome(indiv));
				}
			}
			this.population = newPopulation;
		}
	}
};
