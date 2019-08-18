
export default class Sub{

  constructor( num ){

    this.num = num;

    this.ele = $( '<div>Element<div>' );
    this.ele.css({
      margin:'10px 0 0 10px',
      padding:'10px',
      border:'1px solid #ddd',
      borderRadius:'10px',
      display:'inline-block',
      cursor:'pointer'
    });


    this.ele.on( 'mouseover', this.mouseOverHandler.bind( this ) );
    this.ele.on( 'mouseout', this.mouseOutHandler.bind( this ) );

  }

  mouseOverHandler(){

    this.ele.css({
      backgroundColor:'#ddd'
    });

  }

  mouseOutHandler(){

    this.ele.css({
      backgroundColor:'#fff'
    });

  }

  static subAlert(){

    alert( this.num );

  }

}