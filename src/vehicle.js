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
const createVehicle = (xx, yy, height, width) => {
	const wheelToBodyRatio = 2.3;
	const group = Body.nextGroup(true),
		wheelXOffset = 0,
		wheelYOffset = height / 2;

	const vehicle = Composite.create({ label: "vehicle" });
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
			density: 0.0002
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
			friction: 0.8
		}
	);

	const axelA = Constraint.create({
		bodyB: body,
		pointB: { x: wheelXOffset, y: wheelYOffset },
		bodyA: wheelA,
		stiffness: 1,
		length: 0
	});

	Composite.addBody(vehicle, body);
	Composite.addBody(vehicle, wheelA);
	Composite.addConstraint(vehicle, axelA);

	return vehicle;
};

export default createVehicle;
