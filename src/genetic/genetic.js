export const optimizers = {
	maximize: (a, b) => a >= b,
	minimize: (a, b) => a < b
};

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
	FittestRandom: population => [
		individualSelectors.fittest(population),
		individualSelectors.random(population)
	]
};
export default class Genetic {
	constructor(config) {
		const defaultConfig = {
			iterations: 5000,
			population_size: 10,
			mutation_rate: 0.6,
			crossover_rate: 0.6,
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
		this.selectParents = parentsSelectors.tournament3;
		this.selectIndividual = individualSelectors.tournament3;
	}

	newIndividualFromGenome = genome => ({
		fitness: 0,
		genome
	});

	shouldApplyFromRate = rate => Math.random() <= rate;

	async evolve() {
		// seed population
		for (let i = 0; i < this.config.population_size; ++i)
			this.population.push(this.newIndividualFromGenome(this.seed()));
		// main loop
		for (let i = 0; i < this.config.iterations; ++i) {
			this.population = await Promise.all(
				this.population.map(async individual => {
					return {
						fitness: await this.fitness(individual.genome),
						genome: individual.genome
					};
				})
			);
			this.population.sort((a, b) =>
				this.optimize(a.fitness, b.fitness) ? -1 : 1
			);

			const mapNb = (number, in_min, in_max, out_min, out_max) => {
				return (
					((number - in_min) * (out_max - out_min)) / (in_max - in_min) +
					out_min
				);
			};
			const paramBitLength = this.population[0].genome.length / 3;
			let params = [];
			for (
				let i = 0;
				i < this.population[0].genome.length;
				i += paramBitLength
			) {
				params.push(
					mapNb(
						parseInt(this.population[0].genome.substr(i, paramBitLength), 2),
						0,
						Number.MAX_SAFE_INTEGER,
						0.0,
						1.0
					)
				);
			}

			console.log("fittest", this.population[0].fitness, params);
			// user controlled stop
			this.generation(this.population);

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
					const childrens = this.crossover(parents[0], parents[1]);
					newPopulation.concat(
						childrens.map(children => this.newIndividualFromGenome(children))
					);
				} else {
					let indiv = this.selectIndividual(this.population, this.optimize);
					if (this.shouldApplyFromRate(this.config.mutation_rate))
						indiv = this.mutate(indiv);
					newPopulation.push(this.newIndividualFromGenome(indiv));
				}
			}
			this.population = newPopulation;
		}
	}
}
