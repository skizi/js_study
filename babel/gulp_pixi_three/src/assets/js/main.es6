
import Pixi from './_pixi.es6'
import Three from './_three.es6'

class Main{


	constructor(){

		this.pixi = new Pixi();
		this.three = new Three();

		this.three.resize();
		this.pixi.resize();
	    window.addEventListener( 'resize', this.resizeWindow.bind( this ) );

	}


	resizeWindow(){

		clearInterval( this.resizeTimeOutId );
		this.resizeTimeOutId = setTimeout( () => {

			this.three.resize();
			this.pixi.resize();

		}, 300 );

	}


}


document.addEventListener("DOMContentLoaded", function(){

	new Main();

});