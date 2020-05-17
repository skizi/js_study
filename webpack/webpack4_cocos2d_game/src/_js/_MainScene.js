import Utils from './_Utils.js';
import Player from './_Player.js';
import Bullet from './_Bullet.js';
import Enemy from './_Enemy.js';
import Vector2 from './_Vector2.js';

class MainSceneLayer extends cc.Layer {
	constructor() {
		super();

		this.resize();

		//プレイヤー
		this.player = new Player();
		this.addChild(this.player, 10);

		//プレイヤーの弾
		this.bullets = [];
		this.bulletLength = 10;
		for (var i = 0; i < this.bulletLength; i++) {
			let bullet = new Bullet(-100, -100);
			this.bullets.push(bullet);
			this.addChild(bullet, 9);
		}
		this.nowBullet = 0;

		//敵
		this.enemies = [];
		this.enemyLength = 3;
		for (var i = 0; i < this.enemyLength; i++) {
			let enemy = new Enemy();
			this.enemies.push(enemy);
			this.addChild(enemy, 10);
		}

		//UI
		this.gameClearText = new cc.LabelTTF('Game Clear!', 'Arial', 38);
		this.gameClearText.x = Utils.stage.width * 0.5;
		this.gameClearText.y = Utils.stage.height * 0.5;
		this.gameClearText.visible = false;
		this.addChild(this.gameClearText, 11);

		this.nowScore = 0;
		this.scoreText = new cc.LabelTTF('Score : 0', 'Arial', 30);
		this.scoreText.x = 20;
		this.scoreText.y = Utils.stage.height - 20;
		this.scoreText.anchorX = 0;
		this.scoreText.anchorY = 1;
		this.addChild(this.scoreText, 11);

		this.outlineText = new cc.LabelTTF(
			'Bキーで弾を打ち敵を倒せ！',
			'Arial',
			10
		);
		this.outlineText.x = 20;
		this.outlineText.y = 20;
		this.outlineText.anchorX = 0;
		this.outlineText.anchorY = 0;
		this.addChild(this.outlineText, 11);

		this.setInputControl();

		this.scheduleUpdate();

		console.log(cc.rectContainsPoint);
	}

	setInputControl() {
		const listener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: (keyCode, event) => {
				switch (keyCode) {
					case cc.KEY.b:
						this.addBullet();
						break;
				}
			}
		});
		cc.eventManager.addListener(listener, 1);
	}

	addBullet() {
		var vec = new Vector2(
			this.player.x - Utils.stage.width * 0.5,
			this.player.y - Utils.stage.height * 0.5
		).normalized;
		this.bullets[this.nowBullet].add(this.player.x, this.player.y, vec);
		this.nowBullet++;
		if (this.nowBullet >= this.bulletLength) this.nowBullet = 0;
	}

	checkHit() {
		for (var i = 0; i < this.enemyLength; i++) {
			for (var j = 0; j < this.bulletLength; j++) {
				let b = this.bullets[j];
				let pos = new cc.Point(b.x, b.y);
				let flag = cc.rectContainsPoint(this.enemies[i].getBoundingBox(), pos);
				if (flag && !this.enemies[i].deadFlag) {
					this.enemies[i].destory();
					this.nowScore += this.enemies[i].score;
					this.scoreText.setString('Score : ' + this.nowScore);
					this.checkGameClear();
				}
			}
		}
	}

	checkGameClear() {
		var deadLength = 0;
		for (var i = 0; i < this.enemyLength; i++) {
			if (this.enemies[i].deadFlag) deadLength++;
		}
		if (deadLength == this.enemyLength) {
			this.gameClearText.visible = true;
		}
	}

	update() {
		this.checkHit();
	}

	resize() {
		var stageSize = cc.director.getWinSize();
		Utils.stage.width = stageSize.width;
		Utils.stage.height = stageSize.height;
	}
}

export default class MainScene extends cc.Scene {
	constructor() {
		super();

		this.sprite = null;
		this.layer = new MainSceneLayer();
		this.addChild(this.layer);
	}

	resize() {
		this.layer.resize();
	}
}
