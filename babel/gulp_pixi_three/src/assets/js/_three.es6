
var THREE = require('three');
THREE.OrbitControls = require( 'three-orbitcontrols' );
import RectAreaLightUniformsLib from './_RectAreaLightUniformsLib.js';



export default class Three{
	
	constructor(){

		this.toRad = Math.PI / 180;

		this.initScene();

	    const controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
	    controls.screenSpacePanning = true;
	    controls.target.set( 0.0, 0.88, 0.0 );
	    controls.update();

	    this.initObjects();


	    this.intervalId = setInterval(function(){
	      this.renderer.render( this.scene, this.camera );
	    }.bind( this ), 1000/60);


	    this.stageWidth = 0;

	}


	initScene(){

	    this.scene = new THREE.Scene();
	    let ele = document.getElementsByTagName( 'header' )[0];
	    
	    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	    ele.appendChild( this.renderer.domElement );

	    let w = 500;
	    let h = 500;
	    this.renderer.setSize( w, h );
	    this.renderer.shadowMap.enabled = true;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		// this.renderer.shadowMap.type = THREE.VSMShadowMap;	

	    this.camera = new THREE.PerspectiveCamera( 30.0, w/h, 0.1, 200.0 );
	    this.camera.position.set( 0.0, 2.0, -3.2 );
	    this.camera.lookAt(new THREE.Vector3(0, 1, 0));
	    this.scene.add( this.camera );


        // new THREE.RectAreaLight(色, 光の強さ, 幅, 高さ)
        const rectLight = new THREE.RectAreaLight(0xffffff, 5.0, 1, 1);
        rectLight.position.set( 1, 1, 1 );
      	rectLight.lookAt(new THREE.Vector3(0, 0, 0));
	    // rectLight.castShadow = true;
	    this.rectLight = rectLight;
        this.scene.add(rectLight);


	    const light = new THREE.DirectionalLight( 0xffffff, 0.2 );
	    light.position.set( 1.0, 2.0, 1.0 );
	    light.castShadow = true;
		light.shadow.camera.left = -2;// 描画範囲左範囲
		light.shadow.camera.right = 2;// 描画範囲右範囲
		light.shadow.camera.top = 2;// 描画範囲上範囲
		light.shadow.camera.bottom = -2;// 描画範囲下範囲
		// light.shadow.bias = -0.002;
		// light.shadow.radius = 4;
	    this.scene.add(light);

		var helper = new THREE.CameraHelper( light.shadow.camera );
		// this.scene.add( helper );

		THREE.RectAreaLightUniformsLib.init();
	}


	initObjects(){

		var m = new THREE.MeshStandardMaterial( { color: 0xA00000, roughness: 0, metalness: 0 } );

		var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
		rectLightMesh.scale.x = this.rectLight.width;
		rectLightMesh.scale.y = this.rectLight.height;
		this.rectLight.add( rectLightMesh );


        const meshKnot = new THREE.Mesh(
          new THREE.TorusKnotGeometry( 0.2, 0.06, 100, 16),
          m
        );
        meshKnot.position.set(0, 0.5, 0);
		meshKnot.castShadow = true;
		meshKnot.receiveShadow = true;
        this.scene.add(meshKnot);


	    var geometry = new THREE.PlaneGeometry( 20, 20, 1 );
        var material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 1.0 })
		var plane = new THREE.Mesh( geometry, m );
		plane.rotation.x = 270 * this.toRad;
		plane.receiveShadow = true;
		this.scene.add( plane );

	}


	resize(){
		
		let w = window.innerWidth;
		let h = 500;
		if( w != this.stageWidth ){
			this.stageWidth = w;
			this.renderer.setSize( this.stageWidth, 500 );
			this.renderer.setPixelRatio( window.devicePixelRatio );
			this.camera.aspect = w / h;
			this.camera.updateProjectionMatrix();
		}

	}

}