import { Engine, Runner, Events, World, Composite } from "matter-js";
import PIDController from "./pid_controller";

// objects
import Vehicle from "./vehicle";
import Scene from "./scene";

export default class SimulatorEngine {
	constructor() {
		this.vehicles = [];
		this.engine = Engine.create();
		this.simulationWidth = window.innerWidth;
		this.simulationHeight = window.innerHeight;

		Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				this.vehicles.forEach((item, index, object) => {
					if (
						pair.bodyA.id === item.obj.collidableBodyId ||
						pair.bodyB.id === item.obj.collidableBodyId
					) {
						item.resolver(item.stepCount);
						object.splice(index, 1);
					}
				});
			});
		});

		Events.on(this.engine, "beforeUpdate", event => {
			this.scene.rotateRandomly();
			this.vehicles.forEach(vehicle => {
				vehicle.stepCount += 1;
				vehicle.obj.setWheelAngularVelocity(
					vehicle.controller.update(vehicle.obj.getBodyAngle())
				);
			});
		});

		this.scene = new Scene(this.simulationWidth, this.simulationHeight);
		World.add(this.engine.world, [this.scene.composite]);
		this.runner = Runner.create({ isFixed: true });
		Runner.run(this.runner, this.engine);
		console.log(this.runner.isFixed);
	}

	reset() {
		this.scene.reset();
	}

	stop() {
		// resolve all running vehicles
		this.vehicles.forEach(vehicle => vehicle.resolver(vehicle.stepCount));
	}

	async addVehicle(p, i, d) {
		const vehicleObj = new Vehicle(
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
		const vehicle = {
			obj: vehicleObj,
			controller: controller,
			resolver: promiseResolver,
			stepCount: 0
		};
		this.vehicles.push(vehicle);

		const stepCount = await resPromise;
		Composite.remove(this.engine.world, vehicle.obj.composite);
		this.vehicles = this.vehicles.filter(item => item !== vehicle);
		return stepCount;
	}

	run() {
		this.runner.enabled = false;
		this.scene.reset();
		this.vehicles.forEach(vehicle => {
			World.add(this.engine.world, [vehicle.obj.composite]);
		});
		this.runner.enabled = true;
	}
}
