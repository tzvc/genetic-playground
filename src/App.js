import React, { Component } from "react";
import seedrandom from "seedrandom";
// engines
import SimulatorEngine from "./simulator/simulator_engine";
import Genetic, { optimizers } from "./genetic/genetic";
import { individualSelectors, parentsSelectors } from "./genetic/selectors";
import { seed, mutate, crossover } from "./genetic/genetic_config";
// components
import SimulatorRenderer from "./simulator/simulator_renderer";
import Logo from "./components/logo";
import StatLine from "./components/stat_line";
import Overlay from "./components/overlay";
import SettingsPanel from "./components/settings_panel";
import SettingInputLine from "./components/setting_input";
import Divider from "./components/divider";
import Button from "./components/button";
import Author from "./components/author";
// utils
import { decodeFloatsFromBinaryStr } from "./utils/string";
import VisPanel from "./components/vis_panel";

const settings = [
	{ text: "Population Size", name: "population_size" },
	{ text: "Mutation rate", name: "mutation_rate" },
	{ text: "Crossover rate", name: "crossover_rate" },
	{ text: "Random seed", name: "random_seed" }
];

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// settings
			indiv_selector: "tournament3",
			parent_selector: "tournament3",
			population_size: 10,
			mutation_rate: 0.5,
			crossover_rate: 0.5,
			random_seed: "h8cnkRWfbI",
			// simulation
			simulationRunning: false,
			generation: 0,
			average_fitness: 0.0,
			average_fitness_evol: 0.0,
			best_fitness: 0.0,
			best_fitness_evol: 0.0,
			fittest_genome: ""
		};
		this.geneticEngine = new Genetic();
		this.simulatorEngine = new SimulatorEngine();

		this.geneticEngine.seed = seed;
		this.geneticEngine.mutate = mutate;
		this.geneticEngine.crossover = crossover;
		this.geneticEngine.optimize = optimizers.maximize;
		this.geneticEngine.selectIndividual =
			individualSelectors[this.state.indiv_selector];
		this.geneticEngine.selectParents =
			parentsSelectors[this.state.parent_selector];
		this.geneticEngine.generation = (generation, population) => {
			console.log("pop: ", population);

			const average_fitness =
				population.map(indiv => indiv.fitness).reduce((a, b) => a + b, 0) /
				population.length;

			this.setState(pv => ({
				generation: generation + 1,
				average_fitness: average_fitness,
				average_fitness_evol:
					generation == 0
						? 0.0
						: ((population[0].fitness - pv.average_fitness) /
								pv.average_fitness) *
						  100,
				best_fitness: population[0].fitness,
				best_fitness_evol:
					generation == 0
						? 0.0
						: ((population[0].fitness - pv.best_fitness) / pv.best_fitness) *
						  100,
				fittest_genome: population[0].genome
			}));
		};

		this.geneticEngine.preFitnessEval = () => {
			//console.log("running simulation");
			this.simulatorEngine.run();
		};

		this.geneticEngine.fitness = async entity => {
			const pidParams = decodeFloatsFromBinaryStr(entity, 3);
			//console.log("Added vehicle", pidParams);
			return await this.simulatorEngine.addVehicle(
				pidParams[0],
				pidParams[1],
				pidParams[2]
			);
		};
	}

	_runSimulation = () => {
		seedrandom(this.state.random_seed, { global: true });
		this.geneticEngine.run({
			iterations: 5000,
			population_size: parseFloat(this.state.population_size),
			mutation_rate: parseFloat(this.state.mutation_rate),
			crossover_rate: parseFloat(this.state.crossover_rate)
		});
		this.setState({ simulationRunning: true });
	};

	_stopSimulation = () => {
		this.geneticEngine.stop();
		this.simulatorEngine.stop();
		this.setState({ simulationRunning: false });
	};

	_handleSettingChange = e =>
		this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<>
				<Overlay>
					<SettingsPanel>
						<Logo />
						<Author />
						<Divider />
						<SettingInputLine
							text="Indiv selector"
							name="indiv_selector"
							value={this.state.indiv_selector}
							options={Object.keys(individualSelectors)}
							disabled={this.state.simulationRunning}
							onChange={e => {
								this.geneticEngine.selectIndividual =
									individualSelectors[e.target.value];
								this._handleSettingChange(e);
							}}
						/>
						<SettingInputLine
							text="Parent selector"
							name="parent_selector"
							value={this.state.parent_selector}
							options={Object.keys(parentsSelectors)}
							disabled={this.state.simulationRunning}
							onChange={e => {
								this.geneticEngine.selectParents =
									parentsSelectors[e.target.value];
								this._handleSettingChange(e);
							}}
						/>
						<Divider />
						{settings.map(({ text, name }) => (
							<SettingInputLine
								key={name}
								text={text}
								name={name}
								value={this.state[name]}
								disabled={this.state.simulationRunning}
								onChange={this._handleSettingChange}
							/>
						))}
						<Divider />
						<Button
							onClick={
								this.state.simulationRunning
									? this._stopSimulation
									: this._runSimulation
							}
						>
							{this.state.simulationRunning ? "Stop" : "Run"}
						</Button>
					</SettingsPanel>
					{this.state.simulationRunning && (
						<VisPanel>
							<StatLine>{`Generation: ${this.state.generation}`}</StatLine>
							<StatLine>{`Average fitness: ${this.state.average_fitness} (${
								this.state.average_fitness_evol > 0 ? "+" : ""
							}${this.state.average_fitness_evol.toFixed(1)}%)`}</StatLine>
							<StatLine>{`Best fitness: ${this.state.best_fitness} (${
								this.state.best_fitness_evol > 0 ? "+" : ""
							}${this.state.best_fitness_evol.toFixed(1)}%)`}</StatLine>
							<StatLine>{`Fittest genome:`}</StatLine>
						</VisPanel>
					)}
				</Overlay>

				<SimulatorRenderer engine={this.simulatorEngine.engine} />
			</>
		);
	}
}
