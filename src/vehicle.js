import { Body, Bodies, Composite, Constraint } from "matter-js";
import { tsConstructorType } from "@babel/types";

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
		const group = Body.nextGroup(true),
			wheelXOffset = 0,
			wheelYOffset = height / 2;

		const body = Bodies.rectangle(
			xx,
			yy - width / wheelToBodyRatio,
			width,
			height,
			{
				collisionFilter: {
					group: group
				},
				chamfer: {
					radius: 10
				},
				density: 0.0002,
				label: "vehicle_body"
			}
		);

		const wheelA = Bodies.circle(
			xx + wheelXOffset,
			yy + wheelYOffset,
			width / wheelToBodyRatio,
			{
				collisionFilter: {
					group: group
				},
				friction: 0.8,
				label: "vehicle_wheel"
			}
		);

		const axelA = Constraint.create({
			bodyB: body,
			pointB: { x: wheelXOffset, y: wheelYOffset },
			bodyA: wheelA,
			stiffness: 1,
			length: 0
		});

		this.composite = Composite.create({ label: "vehicle" });
		Composite.addBody(this.composite, body);
		Composite.addBody(this.composite, wheelA);
		Composite.addConstraint(this.composite, axelA);
		this.collidableBodyId = body.id;
	}
}
