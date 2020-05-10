import MainScene from './_MainScene.js';
import Utils from './_Utils.js';

class Main {
	constructor() {
		cc.game.onStart = () => {
			cc.view.adjustViewPort(true);
			cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
			cc.view.resizeWithBrowserSize(true);
			//load resources
			cc.LoaderScene.preload(
				Utils.resources,
				function() {
					cc.director.runScene(new MainScene());
				},
				this
			);
		};
		cc.game.run();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	new Main();
});
