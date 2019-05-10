import React from "react";

import {
	Engine,
	Events,
	World,
	Mouse,
	MouseConstraint,
	Render,
	Composite
} from "matter-js";

export default class SimulatorRenderer extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		let canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener("resize", () => {
			this.canvasRef.current.width = window.innerWidth;
			this.canvasRef.current.height = window.innerHeight;
		});

		const render = Render.create({
			canvas: this.canvasRef.current,
			engine: this.props.engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				wireframes: true,
				showAngleIndicator: true,
				showCollisions: true,
				showIds: true,
				showDebug: true
			}
		});
		// add mouse control
		var mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(this.props.engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				}
			});

		World.add(this.props.engine.world, mouseConstraint);
		Render.run(render);
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
