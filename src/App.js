import React, { Component } from "react";

import SimulatorEngine from "./simulator/simulator_engine";
import Genetic from "./genetic/genetic";
import { seed, mutate, crossover } from "./genetic/genetic_config";
// components
import SimulatorRenderer from "./simulator/simulator_renderer";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.genEngine = new Genetic();
		// var config = {
		// 	iterations: 2,
		// 	size: 5,
		// 	crossover: 0.3,
		// 	mutation: 0.3,
		// 	skip: 20,
		// 	webWorkers: true
		// };
		this.simulatorEngine = new SimulatorEngine();
		this.genEngine.seed = seed;
		this.genEngine.mutate = mutate;
		this.genEngine.crossover = crossover;
		this.genEngine.generation = population => {
			this.simulatorEngine.resetSimulation();
		};
		this.genEngine.fitness = async entity => {
			const mapNb = (number, in_min, in_max, out_min, out_max) => {
				return (
					((number - in_min) * (out_max - out_min)) / (in_max - in_min) +
					out_min
				);
			};
			const paramBitLength = entity.length / 3;
			let params = [];
			for (let i = 0; i < entity.length; i += paramBitLength) {
				params.push(
					mapNb(
						parseInt(entity.substr(i, paramBitLength), 2),
						0,
						Number.MAX_SAFE_INTEGER,
						0.0,
						1.0
					)
				);
			}
			//console.log(params);
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
