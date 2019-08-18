import {Sub} from './Sub';
import {SuperSub} from './SuperSub';


$( window ).load( function(){
	new Main();
} );

class Main {
    
    constructor() {

    	var sub = new Sub();
    	$( document.body ).append( sub.element );
    	console.log( sub.name );

    	var superSub = new SuperSub();
    	$( document.body ).append( superSub.element );

    }

}