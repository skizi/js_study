export default class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	get magnitude() {
		const { x, y } = this;
		return Math.sqrt(x ** 2 + y ** 2);
	}

	get normalized() {
		const { x, y, magnitude } = this;
		return new Vector2(x / magnitude, y / magnitude);
	}
}
