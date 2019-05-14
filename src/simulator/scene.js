import { Composite, Body, Bodies } from "matter-js";

export default class Scene {
	constructor(width, height) {
		const rightWall = Bodies.rectangle(width + 1, height / 2, 2, height, {
			isSensor: true,
			isStatic: true
		});
		const leftWall = Bodies.rectangle(-1, height / 2, 2, height, {
			isSensor: true,
			isStatic: true
		});
		const topWall = Bodies.rectangle(width / 2, 0, width, 2, {
			isSensor: true,
			isStatic: true
		});
		const bottomWall = Bodies.rectangle(width / 2, height, width, 2, {
			isSensor: true,
			isStatic: true
		});
		rightWall.render.visible = false;
		leftWall.render.visible = false;
		topWall.render.visible = false;
		bottomWall.render.visible = false;

		this.rotationFactor = 0.0;

		this.composite = Composite.create({ label: "scene" });
		Composite.addBody(this.composite, leftWall);
		Composite.addBody(this.composite, rightWall);
		Composite.addBody(this.composite, topWall);
		Composite.addBody(this.composite, bottomWall);
		this.groundWheel = Bodies.circle(
			width / 2,
			height * 1.8,
			height,
			{
				isStatic: true,
				friction: 0.5
			},
			100
		);
		Composite.addBody(this.composite, this.groundWheel);
	}

	reset() {
		Body.setAngle(this.groundWheel, 0);
		this.rotationFactor = 0;
	}
	rotateRandomly(ts) {
		const stepSpeed = Math.sin(this.rotationFactor) * 0.02;
		Body.rotate(this.groundWheel, stepSpeed);
		Body.setAngularVelocity(this.groundWheel, stepSpeed);
		this.rotationFactor += 0.01;
		console.log(Math.sin(this.rotationFactor));
	}
}
