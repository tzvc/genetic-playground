import { individualSelectors, parentsSelectors } from "./selectors";

export const optimizers = {
	maximize: (a, b) => a >= b,
	minimize: (a, b) => a < b
};

const defaultConfig = {
	iterations: Infinity,
	population_size: 100,
	mutation_rate: 0.03,
	crossover_rate: 0.6,
	fittestAlwaysSurvive: true
};
export default class Genetic {
	constructor() {
		// internals
		this.population = [];
		this.stopFlag = false;

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

	stop() {
		this.stopFlag = true;
	}

	async run(config) {
		this.config = { ...defaultConfig, ...config };
		// seed population
		for (let i = 0; i < this.config.population_size; ++i)
			this.population.push(this.newIndividualFromGenome(this.seed()));

		this.generation(0, this.population);

		// main loop
		for (let gen = 0; gen < this.config.iterations && !this.stopFlag; ++gen) {
			this.population = this.population.map(async individual => {
				return {
					fitness: await this.fitness(individual.genome),
					genome: individual.genome
				};
			});

			if (this.preFitnessEval) this.preFitnessEval();
			this.population = await Promise.all(this.population);
			this.population.sort((a, b) =>
				this.optimize(a.fitness, b.fitness) ? -1 : 1
			);

			// user controlled stop
			this.generation(gen, this.population);

			// evolve population
			let newPopulation = [];

			// if option specified, keep fittest individual (elitism)
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
						childrens.map(children => {
							if (this.shouldApplyFromRate(this.config.mutation_rate))
								children = this.mutate(children);
							return this.newIndividualFromGenome(children);
						})
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

		// cleanup
		this.population = [];
		this.stopFlag = false;
	}
}
