import * as PIXI from 'pixi.js'


export default class Pixi{
	
	constructor(){

		let header = document.getElementsByClassName( 'intro' )[0];
		
		const app = new PIXI.Application();
		this.app = app;
		header.appendChild(app.view);


		var container = new PIXI.Container();
		container.position = new PIXI.Point( 200, 200 );
		app.stage.addChild( container );

		var g = new PIXI.Graphics();
		g.beginFill(0xFF3300);
		g.drawRect( -50, -50, 100, 100);
		g.endFill();
		container.addChild( g );


		app.ticker.add(() => {

			container.rotation += 0.1;

		});



        var urls = ['./assets/img/SpriteSheet.json'];
        PIXI.Loader.shared.add( 'burn', urls[0] ).load(( loader, resources )=>{

        	console.log(resources.burn);

        	var textuers = [];
        	for( var i = 1; i < 28; i++ ){
        		textuers.push( resources.burn.textures[ 'Explosion_Sequence_A ' + i + '.png' ] );
        	}

        	for( var i = 1; i < 28; i++ ){
	    		let burn = new PIXI.AnimatedSprite( textuers );
	    		burn.x = window.innerWidth * Math.random();
	    		burn.y = 600 * Math.random();
	    		burn.play();
				app.stage.addChild( burn );
			}

        });

	}


	resize(){

		let w = window.innerWidth;
		this.app.renderer.resize( w, 600 );

	}


}