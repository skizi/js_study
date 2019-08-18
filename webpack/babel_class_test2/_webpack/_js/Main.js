'use strict'

import SuperSub from './SuperSub';
import UtilTest from './UtilTest';


$( window ).load(function(){

  var main = new Main();
  main.nowIndex = 10;
  console.log( "get : " + main.nowIndex );

});


class Main{

  constructor(){

    this.index = 4;

    //インスタンス化    
    for( var i = 0; i < 100; i++ ){
      var superSub = new SuperSub( 100 );
      $( document.body ).append( superSub.ele );
    }

    superSub.subAlert();


    //モジュール テスト
    console.log( 'rad:' + UtilTest.deg2rad( 40 ) );
    console.log( 'deg:' + UtilTest.rad2deg( 3.14 ) );


    //各種イベント テスト
    window.onresize = this.resize;
    window.onkeydown = this.keyDown;

    var input = document.body.getElementsByTagName( 'input' );
    input[0].onfocus = function(){
      console.log( 'focus' );
    }

    input[0].onblur = function(){
      console.log( 'blur' );
    }

    //setInterval( function(){ console.log( 'interval' ); }, 1000 );

  }

  alertNum(){

    alert( this.index );

  }

  get nowIndex(){

    return this.index;

  }

  set nowIndex( _num ){

    this.index = _num;

  }

  resize (){

    console.log( 'window resize' );

  }


  keyDown( e ){

    console.log( e.key );

  }

}