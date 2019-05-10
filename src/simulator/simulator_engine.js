import { Engine, Events, World, Composite } from "matter-js";
import PIDController from "./pid_controller";

// objects
import Vehicle from "./vehicle";
import Scene from "./scene";

export default class SimulatorEngine {
	constructor() {
		this.vehicules = [];
		this.engine = Engine.create({
			// positionIterations: 20
		});

		Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				this.vehicules.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.vehicle.collidableBodyId ||
						pair.bodyB.id === item.vehicle.collidableBodyId
					) {
						Composite.remove(this.engine.world, item.vehicle.composite);
						object.splice(index, 1);
					}
				});
			});
		});

		Events.on(this.engine, "beforeUpdate", event => {
			scene.rotateRandomly();
			this.vehicules.forEach(pop =>
				pop.vehicle.setWheelAngularVelocity(
					pop.controller.update(pop.vehicle.getBodyAngle())
				)
			);
		});

		const scene = new Scene(window.innerWidth, window.innerHeight);
		World.add(this.engine.world, [scene.composite]);

		Engine.run(this.engine);
	}

	runSimulation(p, i, d) {
		const vehicule = new Vehicle(
			window.innerWidth / 2,
			window.innerHeight / 2 - 25,
			300,
			160
		);
		const controller = new PIDController(p, i, d, 1);
		controller.setTarget(0);
		this.vehicules.push({
			vehicle: vehicule,
			controller: controller
		});
		World.add(this.engine.world, [vehicule.composite]);
	}
}
