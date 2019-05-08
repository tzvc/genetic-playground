import React from "react";

import {
	Engine,
	Events,
	World,
	Mouse,
	MouseConstraint,
	Render
} from "matter-js";

// objects
import Vehicle from "./vehicle";
import createScene from "./scene";

export default class Simulator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.canvasRef = React.createRef();
		this.world = null;
	}

	componentDidMount() {
		const engine = Engine.create({
			// positionIterations: 20
		});
		this.world = engine.world;

		let canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener("resize", () => {
			this.canvasRef.current.width = window.innerWidth;
			this.canvasRef.current.height = window.innerHeight;
		});

		const render = Render.create({
			canvas: this.canvasRef.current,
			engine: engine,
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

		const scene = createScene(window.innerWidth, window.innerHeight);

		const vehicle = new Vehicle(
			window.innerWidth / 2,
			window.innerHeight / 2 - 25,
			300,
			160
		);

		Events.on(engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				if (
					pair.bodyA.id === vehicle.collidableBodyId ||
					pair.bodyB.id === vehicle.collidableBodyId
				) {
					World.remove(this.world, vehicle.composite);
				}
			});
		});

		Events.on(engine, "beforeUpdate", event => {
			vehicle.setWheelAngularVelocity(0.02);
		});

		World.add(engine.world, [scene, vehicle.composite]);

		//World.add(engine.world, [ballA, ballB]);

		// add mouse control
		var mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				}
			});

		World.add(engine.world, mouseConstraint);

		// Events.on(mouseConstraint, "mousedown", function(event) {
		// 	console.log(event);
		// 	World.add(
		// 		engine.world,
		// 		createVehicle(
		// 			event.mouse.mousedownPosition.x,
		// 			event.mouse.mousedownPosition.x,
		// 			300,
		// 			160
		// 		)
		// 	);
		// });

		Engine.run(engine);

		Render.run(render);
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
