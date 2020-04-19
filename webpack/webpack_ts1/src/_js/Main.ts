import { PixiView } from "./PixiView";

class Main{

	protected pixiView:PixiView;
	protected timeoutId:number;

	constructor(){

		this.pixiView = new PixiView();

		this.resize();
		window.addEventListener( "resize", this.resize.bind( this ) );

	}


	resize(){

		clearTimeout( this.timeoutId );
		this.timeoutId = window.setTimeout( () => {
	
			this.pixiView.resize();

		}, 300 );

	}


}

document.addEventListener('DOMContentLoaded', function(){
	new Main();
});