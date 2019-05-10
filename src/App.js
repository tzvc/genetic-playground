import React, { Component } from "react";
// engine
import SimulatorEngine from "./simulator/simulator_engine";
// components
import SimulatorRenderer from "./simulator/simulator_renderer";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.simulatorEngine = new SimulatorEngine();
	}
	render() {
		return <SimulatorRenderer engine={this.simulatorEngine.engine} />;
	}
}
