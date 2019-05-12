import { Composite, Body, Bodies } from "matter-js";

export default class Scene {
	constructor(width, height) {
		this.width = width;
		this.height = height;
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

		this.floor = Composite.create({ label: "floor" });

		Composite.addBody(
			this.floor,
			Bodies.polygon(width / 2, height * 1.7, 7, height, {
				isStatic: true,
				chamfer: { radius: 50 }
			})
		);
		Composite.addBody(
			this.floor,
			Bodies.polygon(width / 2, height * 1.7, 6, height, {
				isStatic: true,
				chamfer: { radius: 50 }
			})
		);
		Composite.addBody(
			this.floor,
			Bodies.polygon(width / 2, height * 1.7, 5, height, {
				isStatic: true,
				chamfer: { radius: 50 }
			})
		);

		this.angle = 0.0;

		this.composite = Composite.create({ label: "scene" });
		Composite.addBody(this.composite, leftWall);
		Composite.addBody(this.composite, rightWall);
		Composite.addBody(this.composite, topWall);
		Composite.addBody(this.composite, bottomWall);

		Composite.addComposite(this.composite, this.floor);
	}

	reset() {
		Composite.allBodies(this.floor).forEach(body => Body.setAngle(body, 0));
	}
	rotateRandomly() {
		Composite.rotate(this.floor, Math.random() / 100, {
			x: this.width / 2,
			y: this.height * 1.7
		});
	}
}
