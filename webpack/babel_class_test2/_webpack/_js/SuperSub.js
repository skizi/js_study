import Sub from './Sub';

export default class SuperSub extends Sub{

  constructor( num ){

  	super( num );

  }

  subAlert(){

    alert( this.num + 2 );
    
  }

}