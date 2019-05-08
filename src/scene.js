import React from "react";

import Matter from "matter-js";

// objects
import createVehicle from "./vehicle";

export default class Scene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		var Engine = Matter.Engine,
			Render = Matter.Render,
			World = Matter.World,
			Bodies = Matter.Bodies,
			Mouse = Matter.Mouse,
			MouseConstraint = Matter.MouseConstraint;

		var engine = Engine.create({
			// positionIterations: 20
		});

		let canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener("resize", () => {
			this.canvasRef.current.width = window.innerWidth;
			this.canvasRef.current.height = window.innerHeight;
		});

		var render = Render.create({
			canvas: this.canvasRef.current,
			engine: engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				wireframes: true,
				showAngleIndicator: true
			}
		});

		const rightWall = Bodies.rectangle(
			window.innerWidth + 1,
			window.innerHeight / 2,
			2,
			window.innerHeight,
			{ isStatic: true }
		);

		const leftWall = Bodies.rectangle(
			-1,
			window.innerHeight / 2,
			2,
			window.innerHeight,
			{
				isStatic: true
			}
		);
		const floor = Bodies.rectangle(
			window.innerWidth / 2,
			window.innerHeight / 1.4,
			window.innerWidth,
			50,
			{ isStatic: true }
		);

		const car = createVehicle(
			window.innerWidth / 2,
			window.innerHeight / 2 - 25,
			300,
			160
		);

		World.add(engine.world, [
			floor,
			leftWall,
			rightWall,
			// Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true }),
			// Bodies.rectangle(400, 535, 20, 80, {
			// 	isStatic: true,
			// 	collisionFilter: { group: group }
			// }),
			car
		]);

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

		Matter.Events.on(mouseConstraint, "mousedown", function(event) {
			World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
		});

		Engine.run(engine);

		Render.run(render);
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
