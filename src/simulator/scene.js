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
		// rightWall.render.visible = false;
		// leftWall.render.visible = false;
		// topWall.render.visible = false;
		// bottomWall.render.visible = false;

		this.sineStep = 0.0;
		this.rotationFactor = 0.0;

		this.walls = Composite.create({ label: "walls" });
		Composite.add(this.walls, [leftWall, rightWall, topWall, bottomWall]);

		this.wheel = Composite.create({ label: "wheel" });
		// this.mainWheel = Bodies.polygon(width / 2, height * 1.3, 100, height / 2.2, {
		// 	isStatic: true,
		// 	friction: 0.8
		// });
		// this.spike = Bodies.polygon(width / 2, height * 1.3, 5, height / 1.6, {
		// 	isStatic: true,
		// 	friction: 0.8,
		// 	chamfer: { radius: 100 }
		// });
		this.spike2 = Bodies.polygon(width / 2, height * 1.7, 4, height, {
			isStatic: true,
			friction: 0.8,
			chamfer: { radius: 50 }
		});
		this.spike3 = Bodies.polygon(width / 2, height * 1.7, 6, height, {
			isStatic: true,
			friction: 0.8,
			chamfer: { radius: 70 }
		});
		this.spike4 = Bodies.polygon(width / 2, height * 1.7, 7, height, {
			isStatic: true,
			friction: 0.8,
			chamfer: { radius: 100 }
		});
		//Body.setAngle(this.mainWheel, -Math.PI / 2);
		Composite.add(this.wheel, [
			// this.mainWheel,
			// this.spike,
			this.spike2,
			this.spike3,
			this.spike4
		]);
		this.composite = Composite.create({ label: "scene" });
		Composite.add(this.composite, [this.walls, this.wheel]);
	}

	reset() {
		Composite.allBodies(this.wheel).forEach(body => {
			Body.setAngle(body, -Math.PI / 2);
		});
		this.sineStep = 0;
		this.rotationFactor = 0;
	}
	rotateRandomly(ts) {
		const stepSpeed = this.rotationFactor;

		Composite.allBodies(this.wheel).forEach(body => {
			Body.rotate(body, stepSpeed);
			Body.setAngularVelocity(body, stepSpeed);
		});
		this.sineStep += 0.023;
		this.rotationFactor += 0.00003;
	}
}
