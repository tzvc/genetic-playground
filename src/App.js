import React, { Component } from "react";
import seedrandom from "seedrandom";
// engines
import SimulatorEngine from "./simulator/simulator_engine";
import Genetic, {
	optimizers,
	individualSelectors,
	parentsSelectors
} from "./genetic/genetic";
import { seed, mutate, crossover } from "./genetic/genetic_config";
// components
import SimulatorRenderer from "./simulator/simulator_renderer";
// utils
import { lerp } from "./utils/math";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.genEngine = new Genetic({
			iterations: 5000,
			population_size: 40,
			mutation_rate: 0.6,
			crossover_rate: 0.6
		});
		this.simulatorEngine = new SimulatorEngine();
		seedrandom("SjfejhDBWonfpwhf8w", { global: true });

		this.genEngine.seed = seed;
		this.genEngine.mutate = mutate;
		this.genEngine.crossover = crossover;
		this.genEngine.optimize = optimizers.maximize;
		this.genEngine.selectIndividual = individualSelectors.tournament3;
		this.genEngine.selectParents = parentsSelectors.tournament3;
		this.genEngine.generation = population => {
			this.simulatorEngine.resetSimulation();
		};
		this.genEngine.fitness = async entity => {
			const paramBitLength = entity.length / 3;
			let params = [];
			for (let i = 0; i < entity.length; i += paramBitLength) {
				const decoded = parseInt(entity.substr(i, paramBitLength), 2);
				params.push(lerp(decoded, 0, Number.MAX_SAFE_INTEGER, 0.0, 1.0));
			}
			return await this.simulatorEngine.runSimulation(
				params[0],
				params[1],
				params[2]
			);
		};

		this.genEngine.evolve();
	}

	render() {
		return <SimulatorRenderer engine={this.simulatorEngine.engine} />;
	}
}
