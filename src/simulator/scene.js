import { Composite, Bodies } from "matter-js";

const createScene = (width, height) => {
	const rightWall = Bodies.rectangle(width + 1, height / 2, 2, height, {
		isSensor: true,
		isStatic: true
	});

	const leftWall = Bodies.rectangle(-1, height / 2, 2, height, {
		isSensor: true,
		isStatic: true
	});
	const floor = Bodies.rectangle(width / 2, height / 1.4, width, 50, {
		isStatic: true
	});
	const floorSensor = Bodies.rectangle(width / 2, height / 1.4, width, 50, {
		isSensor: true,
		isStatic: true
	});

	const sceneComposite = Composite.create({ label: "scene" });
	Composite.addBody(sceneComposite, leftWall);
	Composite.addBody(sceneComposite, rightWall);
	Composite.addBody(sceneComposite, floor);
	Composite.addBody(sceneComposite, floorSensor);
	return sceneComposite;
};

export default createScene;
