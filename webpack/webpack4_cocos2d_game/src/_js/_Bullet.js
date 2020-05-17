import Utils from './_Utils.js';
import Vector2 from './_Vector2.js';

export default class Bullet extends cc.Sprite {
	constructor(x = 0, y = 0) {
		super(Utils.resources[1]);

		this.x = x;
		this.y = y;
		this.vec = new cc.Point();

		this.scheduleUpdate();
	}

	add(x, y, vec) {
		this.x = x;
		this.y = y;
		this.vec = vec;
	}

	update() {
		this.x += this.vec.x * 5;
		this.y += this.vec.y * 5;
	}
}
