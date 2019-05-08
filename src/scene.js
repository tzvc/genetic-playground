import React from "react";

import Matter from "matter-js";

// objects
import Vehicle from "./vehicle";

export default class Scene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.canvasRef = React.createRef();
		this.world = null;
	}

	componentDidMount() {
		const engine = Matter.Engine.create({
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

		const render = Matter.Render.create({
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

		const rightWall = Matter.Bodies.rectangle(
			window.innerWidth + 1,
			window.innerHeight / 2,
			2,
			window.innerHeight,
			{ isSensor: true, isStatic: true }
		);

		const leftWall = Matter.Bodies.rectangle(
			-1,
			window.innerHeight / 2,
			2,
			window.innerHeight,
			{
				isSensor: true,
				isStatic: true
			}
		);
		const floor = Matter.Bodies.rectangle(
			window.innerWidth / 2,
			window.innerHeight / 1.4,
			window.innerWidth,
			50,
			{ isStatic: true }
		);
		const floorSensor = Matter.Bodies.rectangle(
			window.innerWidth / 2,
			window.innerHeight / 1.4,
			window.innerWidth,
			50,
			{ isSensor: true, isStatic: true }
		);

		const vehicle = new Vehicle(
			window.innerWidth / 2,
			window.innerHeight / 2 - 25,
			300,
			160
		);

		Matter.Events.on(engine, "collisionStart", event => {
			var pairs = event.pairs;
			console.log(event);
			for (var i = 0, j = pairs.length; i != j; ++i) {
				var pair = pairs[i];

				console.log(pair);
				if (
					pair.bodyA.id === vehicle.collidableBodyId ||
					pair.bodyB.id === vehicle.collidableBodyId
				) {
					console.log("car collided");
					Matter.World.remove(this.world, vehicle.composite);
					console.log("car removed");
				}
			}
			// 			for (var i = 0, j = pairs.length; i != j; ++i) {
			// 				var pair = pairs[i];
			// 				conso
			// // con
			// 				// ir.bodyA.render.strokeStyle = redColor;
			// 				}
			// 			}
		});

		Matter.World.add(engine.world, [
			floor,
			floorSensor,
			leftWall,
			rightWall,
			// Matter.Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
			// Matter.Bodies.rectangle(400, 535, 20, 80, {
			// 	isStatic: true,
			// 	collisionFilter: { group: group }
			// }),
			vehicle.composite
		]);

		//World.add(engine.world, [ballA, ballB]);

		// add mouse control
		var mouse = Matter.Mouse.create(render.canvas),
			mouseConstraint = Matter.MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				}
			});

		Matter.World.add(engine.world, mouseConstraint);

		// Matter.Events.on(mouseConstraint, "mousedown", function(event) {
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

		Matter.Engine.run(engine);

		Matter.Render.run(render);
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
