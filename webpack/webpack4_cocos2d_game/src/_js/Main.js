import MainScene from './_MainScene.js';
import Utils from './_Utils.js';

class Main {
	constructor() {
		cc.game.onStart = () => {
			cc.view.adjustViewPort(true);
			cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
			cc.view.resizeWithBrowserSize(true);
			cc.view.setResizeCallback(this.resizeScreen);
			//load resources
			cc.LoaderScene.preload(
				Utils.resources,
				() => {
					this.mainScene = new MainScene();
					cc.director.runScene(this.mainScene);
					this.resizeScreen();
				},
				this
			);
		};
		cc.game.run();
	}

	resizeScreen() {
		this.mainScene.resize();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	new Main();
});
