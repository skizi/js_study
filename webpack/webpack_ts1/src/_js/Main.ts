import { PixiView } from "./PixiView";

class Main{

	protected pixiView:PixiView;
	protected timeoutId:number;

	constructor(){

		this.pixiView = new PixiView();

		this.resize();
		window.addEventListener( "resize", this.resize.bind( this ) );


		//type test
		//https://log.pocka.io/posts/typescript-builtin-type-functions/
		type NekoType = { //Neko型を作る
		  foo: string;
		  bar: number;
		  hoge: boolean;
		}
		type NekoType2 = Pick<NekoType, 'foo'> //NekoTypeのfooのみ持つ型を作る
		var a:NekoType2 = { foo:"yama" };
		console.log( a.foo );


		type NekoType3 = Omit<NekoType, 'bar'> //NekoTypeのbarを削除した型を作る
		var a2:NekoType3 = { foo:"yama", hoge:false };
		console.log( a2.hoge );
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