import Player from './_Player.js';

class MainSceneLayer extends cc.Layer {
	constructor() {
		super();

		this.player = new Player();
		this.addChild(this.player, 10);
	}
}

export default class MainScene extends cc.Scene {
	constructor() {
		super();

		this.sprite = null;
		var layer = new MainSceneLayer();
		this.addChild(layer);
	}
}
