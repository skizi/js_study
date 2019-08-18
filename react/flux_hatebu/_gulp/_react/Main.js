//https://mae.chab.in/archives/2747

var Dispatcher = require("flux").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var React = require("react");
var ReactDOM = require('react-dom');// 14.0 以降、React.render function は react-dom に移動した

var testDispatcher = new Dispatcher();

var testConstants = {
  CLICK: "click",
  ADD_ITEM: "addItem",
  DELETE_ITEM: "deleteItem"
};


// action
var TestAction = {

  click: function ( clickIndex, listIndex ) {
    testDispatcher.dispatch({
      actionType: testConstants.CLICK,
      clickIndex: clickIndex,
      listIndex:listIndex
    });
  },


  addItem : function( index ){
    testDispatcher.dispatch({
      actionType: testConstants.ADD_ITEM,
      value: index
    });
  },


  deleteItem : function( index ){
    testDispatcher.dispatch({
      actionType: testConstants.DELETE_ITEM,
      value: index
    });
  }

};

// -> es2015
//https://blog.kazu69.net/2016/02/04/rebuilding-react-app-to-using-es2015-classes-and-redux/

//http://dev.classmethod.jp/client-side/javascript/flux-introduction-for-beginner/

// store
var items = [[
  {id:1, title:'人気タイトル1', text:'テキストテキストテキスト1', fav:5, url:'url1.html'},
  {id:2, title:'人気タイトル2', text:'テキストテキストテキスト2', fav:3, url:'url2.html'},
  {id:3, title:'人気タイトル3', text:'テキストテキストテキスト3', fav:1, url:'url3.html'},
  {id:4, title:'人気タイトル4', text:'テキストテキストテキスト4', fav:1, url:'url3.html'},
  {id:5, title:'人気タイトル5', text:'テキストテキストテキスト5', fav:5, url:'url3.html'}
],
[
  {id:1, title:'新着タイトル1', text:'テキストテキストテキスト1', fav:5, url:'url1.html'},
  {id:2, title:'新着タイトル2', text:'テキストテキストテキスト2', fav:3, url:'url2.html'},
  {id:3, title:'新着タイトル3', text:'テキストテキストテキスト3', fav:1, url:'url3.html'},
  {id:4, title:'新着タイトル4', text:'テキストテキストテキスト4', fav:1, url:'url3.html'},
  {id:5, title:'新着タイトル5', text:'テキストテキストテキスト5', fav:5, url:'url3.html'}
],
[
  {id:1, title:'その他タイトル1', text:'テキストテキストテキスト1', fav:5, url:'url1.html'},
  {id:2, title:'その他タイトル2', text:'テキストテキストテキスト2', fav:3, url:'url2.html'},
  {id:3, title:'その他タイトル3', text:'テキストテキストテキスト3', fav:1, url:'url3.html'},
  {id:4, title:'その他タイトル4', text:'テキストテキストテキスト4', fav:1, url:'url3.html'},
  {id:5, title:'その他タイトル5', text:'テキストテキストテキスト5', fav:5, url:'url3.html'}
]];
var TestStore = assign({}, EventEmitter.prototype, {

  getState : function ( index ) {

    if( index != 0 && !index ){
      return items;
    }else{
      return items[index];
    }

  },


  dispatcherIndex : testDispatcher.register( function( payload ){

    switch( payload.actionType ) {
      
        case testConstants.CLICK:
          TestStore.emit( 'click', payload.clickIndex, payload.listIndex );
          break;

        case testConstants.ADD_ITEM:
          console.log( payload.value );
          TestStore.emit( 'addItem' );
          break;

        case testConstants.DELETE_ITEM:
          console.log( payload.value );
          TestStore.emit( 'deleteItem', payload.value );
          break;
          
    }

  })

});



// view
var List = require('./List.js');
List( React, ReactDOM, TestStore, TestAction, 0 );
List( React, ReactDOM, TestStore, TestAction, 1 );
List( React, ReactDOM, TestStore, TestAction, 2 );




//------------------------ui--------------------------
var stageHeight = window.innerHeight;
var listContainer = document.getElementById( 'listContainer' );
listContainer.style.height = stageHeight - 128 - 80 + 'px';

var timeoutId;


//mainMenu
var mainMenu = document.getElementById( 'mainMenu' );
var mainMenuBtn = document.getElementById( 'mainMenuBtn' );
var mainMenuInnter = mainMenu.getElementsByClassName( 'inner' )[0];
var mainMenuBg = mainMenu.getElementsByClassName( 'bg' )[0];

mainMenuBtn.addEventListener( 'click', function(){
  mainMenu.style.display = 'block'
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    mainMenuInnter.style.transform = 'translateX(0px)';
    mainMenuBg.style.opacity = 1;
  }, 100 );
} );


mainMenuBg.addEventListener( 'click', function(){
  mainMenuInnter.style.transform = 'translateX(-465px)';
  mainMenuBg.style.opacity = 0;
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    mainMenu.style.display = 'none'
  }, 300 );
} );



//searchBtn
var searchModal = document.getElementById( 'searchModal' );
var searchBtn = document.getElementById( 'searchBtn' );
var searchCloseBtn = searchModal.getElementsByClassName( 'close_btn' )[0];

searchBtn.addEventListener( 'click', function(){
  searchModal.style.display = 'block';
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    searchModal.style.transform = 'translateY(0%)';
  }, 100 );
} );

searchCloseBtn.addEventListener( 'click', function(){
  searchModal.style.transform = 'translateY(100%)';
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    searchModal.style.display = 'none';
  }, 500 );
} );



//lists
var listContainer = document.getElementById( 'listContainer' );
var lists = listContainer.getElementsByClassName( 'list' );


//subMenu
var subMenu = document.getElementById( 'subMenu' );
var subMenuBtns = subMenu.getElementsByTagName( 'li' );
var length = subMenuBtns.length;
for( var i = 0; i < length; i++ ){
  subMenuBtns[i].addEventListener( 'click', function( _i, e ){
    for( var j = 0; j < 3; j++ ){
      subMenuBtns[j].className = '';
    }
    e.target.className = 'active';
    listContainer.style.transform = 'translateX(' + _i * -640 + 'px)';
  }.bind( this, i ));
}