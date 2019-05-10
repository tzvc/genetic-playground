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

import PIDController from "./pid_controller";

// objects
import Vehicle from "./vehicle";
import Scene from "./scene";

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

		const scene = new Scene(window.innerWidth, window.innerHeight);

		let population = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(i => {
			const controller = new PIDController(
				Math.random(),
				Math.random(),
				Math.random(),
				1
			);
			controller.setTarget(0);
			return {
				vehicle: new Vehicle(
					window.innerWidth / 2,
					window.innerHeight / 2 - 25,
					300,
					160
				),
				controller: controller
			};
		});

		Events.on(engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				population.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.vehicle.collidableBodyId ||
						pair.bodyB.id === item.vehicle.collidableBodyId
					) {
						const ctr = item.controller;
						Composite.remove(this.world, item.vehicle.composite);
						object.splice(index, 1);
						console.log(this.world);
						console.log(ctr.k_p, ctr.k_i, ctr.k_d);
						const controller = new PIDController(
							Math.random(),
							Math.random(),
							Math.random(),
							1
						);
						controller.setTarget(0);
						const nn = {
							vehicle: new Vehicle(
								window.innerWidth / 2,
								window.innerHeight / 2 - 25,
								300,
								160
							),
							controller: controller
						};
						population.push(nn);
						World.add(this.world, [nn.vehicle.composite]);
						console.log(this.world);
					}
				});
			});
		});

		Events.on(engine, "beforeUpdate", event => {
			scene.rotateRandomly();
			population.forEach(pop =>
				pop.vehicle.setWheelAngularVelocity(
					pop.controller.update(pop.vehicle.getBodyAngle())
				)
			);
		});

		World.add(engine.world, [
			scene.composite,
			...population.map(pop => pop.vehicle.composite)
		]);

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

		Engine.run(engine);

		Render.run(render);
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
