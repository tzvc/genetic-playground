import { Composite, Body, Bodies } from "matter-js";

export default class Scene {
	constructor(width, height) {
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

		this.composite = Composite.create({ label: "scene" });
		Composite.add(this.composite, [leftWall, rightWall, topWall, bottomWall]);
		this.groundWheel = Bodies.circle(
			width / 2,
			height * 1.3,
			height / 2,
			{
				isStatic: true,
				friction: 0.5
			},
			100
		);
		Body.setAngle(this.groundWheel, -Math.PI / 2);
		Composite.addBody(this.composite, this.groundWheel);
	}

	reset() {
		Body.setAngle(this.groundWheel, -Math.PI / 2);
		this.sineStep = 0;
		this.rotationFactor = 0;
	}
	rotateRandomly(ts) {
		const stepSpeed = Math.sin(this.sineStep) * this.rotationFactor;
		Body.rotate(this.groundWheel, stepSpeed);
		Body.setAngularVelocity(this.groundWheel, stepSpeed);
		this.sineStep += 0.023;
		this.rotationFactor += 0.00001;
	}
}
