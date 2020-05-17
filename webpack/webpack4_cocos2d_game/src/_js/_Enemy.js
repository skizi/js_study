import Utils from './_Utils.js';

export default class Enemy extends cc.Sprite {
	constructor() {
		super(Utils.resources[0]);

		this.anchorX = 0.5;
		this.anchorY = 0.5;
		let x = Utils.stage.width * Math.random();
		let y = Utils.stage.height * Math.random();
		this.setPosition(x, y);
		this.scale = 0.5;
		this.rot = 0;

		this.score = 100;
		this.deadFlag = false;

		this.scheduleUpdate();
	}

	destory() {
		this.x = -200;
		this.y = -100;
		this.deadFlag = true;
	}

	update() {}
}
