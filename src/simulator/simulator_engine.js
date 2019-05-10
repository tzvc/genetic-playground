import { Engine, Events, World, Composite } from "matter-js";
import PIDController from "./pid_controller";

// objects
import Vehicle from "./vehicle";
import Scene from "./scene";

export default class SimulatorEngine {
	constructor() {
		this.engine = Engine.create({
			// positionIterations: 20
		});

		let population = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(i => {
			const controller = new PIDController(
				Math.random(),
				Math.random(),
				Math.random(),
				1
			);
			controller.setTarget(0);
			return {
				vehicle: new Vehicle(
					window.innerWidth / 2,
					window.innerHeight / 2 - 25,
					300,
					160
				),
				controller: controller
			};
		});
		World.add(this.engine.world, [
			...population.map(pop => pop.vehicle.composite)
		]);

		Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				population.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.vehicle.collidableBodyId ||
						pair.bodyB.id === item.vehicle.collidableBodyId
					) {
						const ctr = item.controller;
						Composite.remove(this.world, item.vehicle.composite);
						object.splice(index, 1);
						console.log(this.world);
						console.log(ctr.k_p, ctr.k_i, ctr.k_d);
						const controller = new PIDController(
							Math.random(),
							Math.random(),
							Math.random(),
							1
						);
						controller.setTarget(0);
						const nn = {
							vehicle: new Vehicle(
								window.innerWidth / 2,
								window.innerHeight / 2 - 25,
								300,
								160
							),
							controller: controller
						};
						population.push(nn);
						World.add(this.world, [nn.vehicle.composite]);
						console.log(this.world);
					}
				});
			});
		});

		Events.on(this.engine, "beforeUpdate", event => {
			scene.rotateRandomly();
			population.forEach(pop =>
				pop.vehicle.setWheelAngularVelocity(
					pop.controller.update(pop.vehicle.getBodyAngle())
				)
			);
		});

		const scene = new Scene(window.innerWidth, window.innerHeight);
		World.add(this.engine.world, [scene.composite]);

		Engine.run(this.engine);
	}
}
