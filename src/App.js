import React, { Component } from "react";
import seedrandom from "seedrandom";
// simulator
import SimulatorEngine from "./simulator/simulator_engine";
// genetic
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
import VisPanel from "./components/vis_panel";
import GenomeEvolutionVis from "./components/genome_vis";
import EvolPercVis from "./components/evol_perc_vis";
import StatPlot from "./components/stat_plot";
// utils
import { decodeFloatsFromBinaryStr } from "./utils/string";
import {
	getLastItem,
	getFitnessStatPercIncrease,
	statsToCSVFile
} from "./utils/misc";

const settings = [
	{ text: "Population Size", name: "population_size" },
	{ text: "Mutation rate", name: "mutation_rate" },
	{ text: "Crossover rate", name: "crossover_rate" },
	{ text: "Random seed", name: "random_seed" }
];

const default_seed = "h8cnkRWfbI";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.isMobile = window.innerWidth <= 700;
		this.state = {
			// settings
			indiv_selector: "tournament3",
			parent_selector: "tournament3",
			population_size: 10,
			mutation_rate: 0.5,
			crossover_rate: 0.5,
			random_seed: default_seed,
			// simulation
			simulationRunning: false,
			generation: 0,
			best_genomes: [],
			best_fitness_stat: [],
			avg_fitness_stat: []
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
			this.setState(pv => ({
				generation: generation + 1,
				best_genomes: [...pv.best_genomes, population[0].genome],
				best_fitness_stat: [
					...pv.best_fitness_stat,
					{ generation: generation, fitness: population[0].fitness }
				],
				avg_fitness_stat: [
					...pv.avg_fitness_stat,
					{
						generation: generation,
						fitness:
							population
								.map(indiv => indiv.fitness)
								.reduce((a, b) => a + b, 0) / population.length
					}
				]
			}));
		};

		/**
		 * Evaluate fitness by adding vehicle to the simulation
		 * with the PID parameters decoded from the individual's chromosome.
		 * Simulation will start when all vehicles are ready (preFitnessEval).
		 * Result will be returned uppon vehicle destruction in the simulation
		 * engine.
		 */
		this.geneticEngine.fitness = async chromosome => {
			const [p_gain, i_gain, d_gain] = decodeFloatsFromBinaryStr(chromosome, 3);
			return await this.simulatorEngine.addVehicle(p_gain, i_gain, d_gain);
		};

		/**
		 * Launch simulation when all vehicle has been added to compute fitness.
		 */
		this.geneticEngine.preFitnessEval = () => {
			this.simulatorEngine.run();
		};
	}

	_runSimulation = () => {
		this.setState({
			avg_fitness_stat: [],
			best_fitness_stat: [],
			best_genomes: []
		});
		seedrandom(this.state.random_seed, { global: true });
		this.geneticEngine.run({
			iterations: 5000,
			population_size: parseFloat(this.state.population_size),
			mutation_rate: parseFloat(this.state.mutation_rate),
			crossover_rate: parseFloat(this.state.crossover_rate)
		});
		this.setState({
			simulationRunning: true
		});
	};

	_stopSimulation = () => {
		this.geneticEngine.stop();
		this.simulatorEngine.stop();
		this.setState({ simulationRunning: false });
	};

	_handleSettingChange = e =>
		this.setState({ [e.target.name]: e.target.value });

	_downloadStatsAsCSV = () => {
		const encodedCSV = statsToCSVFile(
			this.state.best_fitness_stat,
			this.state.avg_fitness_stat
		);
		const exportName = `GP_export_${this.state.indiv_selector}_${
			this.state.parent_selector
		}_${this.state.population_size}_${this.state.mutation_rate}_${
			this.state.crossover_rate
		}_${this.state.random_seed}_${Date.now()}.csv`;

		const link = document.createElement("a");
		link.setAttribute("href", encodedCSV);
		link.setAttribute("download", exportName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	render() {
		return (
			<>
				<Overlay>
					{(!this.isMobile || !this.state.simulationRunning) && (
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
					)}
					{this.state.simulationRunning && (
						<VisPanel>
							<StatLine>{`Generation: ${this.state.generation}`}</StatLine>
							<StatLine>
								{`Average fitness: ${getLastItem(
									this.state.avg_fitness_stat
								).fitness.toFixed(2)} (`}
								<EvolPercVis
									perc={getFitnessStatPercIncrease(this.state.avg_fitness_stat)}
								/>
								)
							</StatLine>
							<StatLine>
								{`Best fitness: ${getLastItem(
									this.state.best_fitness_stat
								).fitness.toFixed(2)} (`}
								<EvolPercVis
									perc={getFitnessStatPercIncrease(
										this.state.best_fitness_stat
									)}
								/>
								)
							</StatLine>
							<StatPlot
								best_fitness_data={this.state.best_fitness_stat}
								avg_fitness_data={this.state.avg_fitness_stat}
							/>
							{!this.isMobile ? (
								<>
									<GenomeEvolutionVis genomes={this.state.best_genomes} />
									<Button onClick={this._downloadStatsAsCSV}>
										Download CSV
									</Button>
								</>
							) : (
								<Button
									onClick={
										this.state.simulationRunning
											? this._stopSimulation
											: this._runSimulation
									}
								>
									{this.state.simulationRunning ? "Stop" : "Run"}
								</Button>
							)}
						</VisPanel>
					)}
				</Overlay>

				<SimulatorRenderer engine={this.simulatorEngine.engine} />
			</>
		);
	}
}
