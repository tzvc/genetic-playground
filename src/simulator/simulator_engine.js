import { Engine, Events, World, Composite } from "matter-js";
import PIDController from "./pid_controller";

// objects
import Vehicle from "./vehicle";
import Scene from "./scene";

export default class SimulatorEngine {
	constructor() {
		this.vehicles = [];
		this.engine = Engine.create({
			// positionIterations: 20
		});

		Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				this.vehicles.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.vehicle.collidableBodyId ||
						pair.bodyB.id === item.vehicle.collidableBodyId
					) {
						item.resolver(Date.now());
						object.splice(index, 1);
					}
				});
			});
		});

		Events.on(this.engine, "beforeUpdate", event => {
			scene.rotateRandomly();
			this.vehicles.forEach(pop =>
				pop.vehicle.setWheelAngularVelocity(
					pop.controller.update(pop.vehicle.getBodyAngle())
				)
			);
		});

		const scene = new Scene(window.innerWidth, window.innerHeight);
		World.add(this.engine.world, [scene.composite]);

		Engine.run(this.engine);
	}

	removeVehicule(vehicle) {
		// remove vehicle from simulation
		Composite.remove(this.engine.world, vehicle.composite);
	}

	async runSimulation(p, i, d) {
		const vehicle = new Vehicle(
			window.innerWidth / 2,
			window.innerHeight / 2 - 25,
			300,
			160
		);
		const controller = new PIDController(p, i, d, 1);
		controller.setTarget(0);
		let promiseResolver;
		var resPromise = new Promise(function(resolve, reject) {
			promiseResolver = resolve;
		});

		this.vehicles.push({
			vehicle: vehicle,
			controller: controller,
			resolver: promiseResolver
		});

		const startTime = Date.now();
		World.add(this.engine.world, [vehicle.composite]);
		setTimeout(() => promiseResolver(Date.now()), 10000);
		const endTime = await resPromise;
		Composite.remove(this.engine.world, vehicle.composite);
		this.vehicles = this.vehicles.filter(function(item) {
			return item !== vehicle;
		});
		return endTime - startTime;
	}
}
