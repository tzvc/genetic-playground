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
		this.simulationWidth = window.innerWidth;
		this.simulationHeight = window.innerHeight;

		Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				this.vehicles.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.vehicle.collidableBodyId ||
						pair.bodyB.id === item.vehicle.collidableBodyId
					) {
						item.resolver(item.stepCount);
						object.splice(index, 1);
					}
				});
			});
		});

		Events.on(this.engine, "beforeUpdate", event => {
			this.scene.rotateRandomly();
			this.vehicles.forEach(pop => {
				pop.stepCount += 1;
				pop.vehicle.setWheelAngularVelocity(
					pop.controller.update(pop.vehicle.getBodyAngle())
				);
			});
		});

		this.scene = new Scene(this.simulationWidth, this.simulationHeight);
		World.add(this.engine.world, [this.scene.composite]);
		Engine.run(this.engine);
	}

	removeVehicule(vehicle) {
		// remove vehicle from simulation
		Composite.remove(this.engine.world, vehicle.composite);
	}

	resetSimulation() {
		this.scene.reset();
	}

	async runSimulation(p, i, d) {
		const vehicle = new Vehicle(
			this.simulationWidth / 2,
			this.simulationHeight / 2,
			this.simulationHeight / 5,
			this.simulationHeight / 3
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
			resolver: promiseResolver,
			stepCount: 0
		});

		World.add(this.engine.world, [vehicle.composite]);
		const stepCount = await resPromise;
		Composite.remove(this.engine.world, vehicle.composite);
		this.vehicles = this.vehicles.filter(function(item) {
			return item !== vehicle;
		});
		return stepCount;
	}
}
