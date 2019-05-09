import { Body, Bodies, Composite, Constraint } from "matter-js";

/**
 * Creates a composite with simple vehicle setup of bodies and constraints.
 * @method vehicle
 * @param {number} xx
 * @param {number} yy
 * @param {number} width
 * @param {number} height
 * @param {number} wheelSize
 * @return {composite} A new composite vehicle body
 */
export default class vehicle {
	constructor(xx, yy, height, width) {
		const wheelToBodyRatio = 2.3;
		const wheelXOffset = 0;
		const wheelYOffset = height / 2;

		this.body = Bodies.rectangle(
			xx,
			yy - width / wheelToBodyRatio,
			width,
			height,
			{
				collisionFilter: {
					group: -1
				},
				chamfer: {
					radius: 10
				},
				density: 0.0002,
				label: "vehicle_body"
			}
		);

		this.wheel = Bodies.circle(
			xx + wheelXOffset,
			yy + wheelYOffset,
			width / wheelToBodyRatio,
			{
				collisionFilter: {
					group: -1
				},
				friction: 0.8,
				label: "vehicle_wheel"
			}
		);

		const axelA = Constraint.create({
			bodyB: this.body,
			pointB: { x: wheelXOffset, y: wheelYOffset },
			bodyA: this.wheel,
			stiffness: 1,
			length: 0
		});

		this.composite = Composite.create({
			label: "vehicle"
		});
		Composite.addBody(this.composite, this.body);
		Composite.addBody(this.composite, this.wheel);
		Composite.addConstraint(this.composite, axelA);
		this.collidableBodyId = this.body.id;
	}

	setWheelAngularVelocity(correctionFactor) {
		//console.log(correctionFactor);
		Body.setAngularVelocity(this.wheel, -correctionFactor);
	}

	getBodyAngle() {
		return this.body.angle;
	}
}
