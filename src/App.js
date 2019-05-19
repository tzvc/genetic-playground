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
import LeftPanelOverlay from "./components/left_panel_overlay";
import SettingInputLine from "./components/setting_input";
// utils
import { lerp } from "./utils/math";
import Divider from "./components/divider";
import Button from "./components/button";
import Author from "./components/author";

const settings = [
	{ text: "Population Size", name: "population_size" },
	{ text: "Mutation rate", name: "mutation_rate" },
	{ text: "Crossover rate", name: "crossover_rate" }
];
const Options = [{ name: "Tournament" }, { name: "random" }];

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// settings
			population_size: 10,
			mutation_rate: 0.5,
			crossover_rate: 0.5,
			simulationRunning: false
		};
		this.genEngine = new Genetic();
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
			console.log(entity);
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

		this.genEngine.run({
			iterations: 5000,
			population_size: 60,
			mutation_rate: 0.6,
			crossover_rate: 0.6
		});
	}

	_runSimulation = () => {
		this.genEngine.run({
			iterations: 5000,
			population_size: this.state.population_size,
			mutation_rate: this.state.mutation_rate,
			crossover_rate: this.state.crossover_rate
		});
		this.setState({ simulationRunning: true });
	};

	_stopSimulation = () => {
		this.setState({ simulationRunning: false });
	};

	_handleSettingChange = e => {
		console.log("change", e.target.name, e.target.value);
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<>
				<LeftPanelOverlay>
					<Author />
					<Divider />
					<SettingInputLine
						setting="Indiv selector"
						name="indiv_selector"
						options={Options}
						disabled={this.state.simulationRunning}
					/>
					<SettingInputLine
						setting="Parent selector"
						name="parent_selector"
						options={Options}
						disabled={this.state.simulationRunning}
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
				</LeftPanelOverlay>
				<SimulatorRenderer engine={this.simulatorEngine.engine} />
			</>
		);
	}
}
