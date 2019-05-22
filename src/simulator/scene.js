import { Composite, Body, Bodies } from "matter-js";

export default class Scene {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		const wallOptions = {
			isSensor: true,
			isStatic: true
		};
		const rightWall = Bodies.rectangle(
			width / 2 + height / 2,
			height / 2,
			1,
			height,
			wallOptions
		);
		const leftWall = Bodies.rectangle(
			width / 2 - height / 2,
			height / 2,
			1,
			height,
			wallOptions
		);
		const topWall = Bodies.rectangle(width / 2, 0, height, 1, wallOptions);
		const bottomWall = Bodies.rectangle(
			width / 2,
			height,
			height,
			1,
			wallOptions
		);
		rightWall.render.visible = false;
		leftWall.render.visible = false;
		topWall.render.visible = false;
		bottomWall.render.visible = false;

		this.sineStep = 0.0;
		this.rotationFactor = 0.0;

		this.walls = Composite.create({ label: "walls" });
		Composite.add(this.walls, [leftWall, rightWall, topWall, bottomWall]);

		this.wheel = Composite.create({ label: "wheel" });
		this.mainWheel = Bodies.polygon(width / 2, height * 1.3, 100, height / 2, {
			isStatic: true,
			friction: 0.8,
			chamfer: 500
		});
		this.spike = Bodies.polygon(width / 2, height * 1.3, 5, height / 1.8, {
			isStatic: true,
			friction: 0.8,
			chamfer: 200
		});
		this.spike2 = Bodies.polygon(width / 2, height * 1.3, 4, height / 1.9, {
			isStatic: true,
			friction: 0.8,
			chamfer: 200
		});
		Body.setAngle(this.mainWheel, -Math.PI / 2);
		Composite.add(this.wheel, [this.mainWheel, this.spike, this.spike2]);
		this.composite = Composite.create({ label: "scene" });
		Composite.add(this.composite, [this.walls, this.wheel]);
	}

	reset() {
		//Body.setAngle(this.groundWheel, -Math.PI / 2);
		this.sineStep = 0;
		this.rotationFactor = 0;
	}
	rotateRandomly(ts) {
		const stepSpeed = this.rotationFactor; //Math.sin(this.sineStep) * this.rotationFactor;

		Composite.allBodies(this.wheel).map(body => {
			Body.rotate(body, stepSpeed);
			Body.setAngularVelocity(body, stepSpeed);
		});
		//Composite.rotate(this.wheel, stepSpeed);
		//Body.setAngularVelocity(this.groundWheel, stepSpeed);
		this.sineStep += 0.023;
		this.rotationFactor += 0.00003;
	}
}
