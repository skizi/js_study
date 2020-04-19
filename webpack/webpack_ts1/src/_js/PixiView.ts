import * as PIXI from 'pixi.js'


export class PixiView{

	protected app: PIXI.Application;
	protected container : PIXI.Container;

	
	constructor(){

		let container = document.getElementsByClassName( 'pixi-view' )[0];
		this.app = new PIXI.Application();
		container.appendChild( this.app.view );


		this.initObjects();


		this.app.ticker.add( this.animate.bind( this ) );

	}


	initObjects(){

		this.container = new PIXI.Container();
		this.container.position = new PIXI.Point( 200, 200 );
		this.app.stage.addChild( this.container );

		var g : PIXI.Graphics = new PIXI.Graphics();
		g.beginFill( 0xFF3300 );
		g.drawRect( -50, -50, 100, 100);
		g.endFill();
		this.container.addChild( g );


        var urls:string[] = ['./assets/img/SpriteSheet.json'];
        PIXI.Loader.shared.add( 'burn', urls[0] ).load(( loader, resources )=>{

        	var textuers:PIXI.Texture[] = [];
        	for( var i:number = 1; i < 28; i++ ){
        		textuers.push( resources.burn.textures[ 'Explosion_Sequence_A ' + i + '.png' ] );
        	}

        	for( var i:number = 1; i < 28; i++ ){
	    		let burn:PIXI.AnimatedSprite = new PIXI.AnimatedSprite( textuers );
	    		burn.x = window.innerWidth * Math.random();
	    		burn.y = 600 * Math.random();
	    		burn.play();
				this.app.stage.addChild( burn );
			}

        });

	}


	public resize():void{

		let w:number = window.innerWidth;
		this.app.renderer.resize( w, 600 );

	}


	animate(){

		this.container.rotation += 0.1;

	}

}