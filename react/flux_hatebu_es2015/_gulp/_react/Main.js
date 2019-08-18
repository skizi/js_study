//https://mae.chab.in/archives/2747

// npm install browserify
// npm install vinyl-source-stream
// npm install babelify
// npm install babel-preset-es2015
// npm install --save-dev babel-preset-react
// npm install react ?
// npm install react-dom
// npm install flux

//http://qiita.com/sl2/items/ff7a07c00f545d245a5c


var items = [];
var activeIndex = 0;
var news = [
  { title:'IT速報', url:'http://blog.livedoor.jp/itsoku/index.rdf' },
  { title:'暇つぶしニュース', url:'http://blog.livedoor.jp/rbkyn844/index.rdf' },
  { title:'(*ﾟ∀ﾟ)ゞカガクニュース隊', url:'http://www.scienceplus2ch.com/index.rdf' },
  { title:'カラパイア', url:'http://karapaia.livedoor.biz/index.rdf' },
  { title:'まとめたニュース', url:'http://matometanews.com/index.rdf' },
  { title:'あじゃじゃしたー', url:'http://blog.livedoor.jp/chihhylove/index.rdf' },
  { title:'まめ速', url:'http://mamesoku.com/index.rdf' },
  { title:'妹はVIPPER', url:'http://vipsister23.com/index.rdf' },
  { title:'キニ速', url:'http://blog.livedoor.jp/kinisoku/index.rdf' }
];
for( var i = 0; i < news.length; i++ ) news[i].id = i;




//------------------flux----------------------------
var Dispatcher = require("flux").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var ReduceStore = require("flux/utils").ReduceStore;

//import PropTypes from 'prop-types';
var PropTypes = require('prop-types');


var testDispatcher = new Dispatcher();

var testConstants = {
  MAIN_MENU_CLICK : 'MainMenuClick',

  SUB_MENU_CLICK : 'subMenuClick',
  SUB_MENU_CLOSE_CLICK : 'subMenuCloseBtnClick',

  CLICK: "click",
  ADD_ITEM: "addItem",
  DELETE_ITEM: "deleteItem"
};




// action
var TestAction = {

  //mainMenu
  mainMenuClick: function( clickIndex ){
    addItem( news[clickIndex].url, function( data ){
      data.id = items.length;
      console.log( "addItem!!!" );
      testDispatcher.dispatch({
        actionType: testConstants.MAIN_MENU_CLICK,
        addNews: data
      });

      $( '#subMenu' ).animate({scrollLeft:9999});
      hideMainMenu();
    } );
  },

  //subMenu
  subMenuClick: function( clickIndex ){
    testDispatcher.dispatch({
      actionType: testConstants.SUB_MENU_CLICK,
      clickIndex: clickIndex
    });
  },

  subMenuCloseBtnClick: function( clickIndex ){
    testDispatcher.dispatch({
      actionType: testConstants.SUB_MENU_CLOSE_CLICK,
      clickIndex: clickIndex
    });
  },

  //list
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
class TestStore extends ReduceStore {

  getInitialState(){

    return {
      items:items,
      activeIndex:activeIndex,
      news:news
    };

  }


  reduce( state, action ){

    //Storeのstateを更新
    switch( action.actionType ) {
        
        //mainMenu
        case testConstants.MAIN_MENU_CLICK:
          items = state.items.concat();
          items.push( action.addNews );
          activeIndex = items.length - 1;
          return { items:items, activeIndex:activeIndex, news:news };
          break;

        //subMenu
        case testConstants.SUB_MENU_CLICK:
          items = state.items.concat();
          var length = state.items.length;
          
          activeIndex = action.clickIndex;
          return { items:items, activeIndex:action.clickIndex, news:news };
          break;
        

        case testConstants.SUB_MENU_CLOSE_CLICK:
          console.log("action.clickIndex:" + action.clickIndex);

          items = state.items.concat();
          items.splice( action.clickIndex, 1 );

          var length = items.length;
          for( var i = 0; i < length; i++ ) items[ i ].id = i;
          
          if( action.clickIndex == activeIndex || action.clickIndex < activeIndex ){
            activeIndex--;
          }
          if( activeIndex < 0 ) activeIndex = 0;
          return { items:items, activeIndex:activeIndex, news:news };
          break;


        //list
        case testConstants.CLICK:
          //配列を新規に作らないとstateが更新されたことにならない
          //https://stackoverflow.com/questions/39513753/my-redux-state-has-changed-why-doesnt-react-trigger-a-re-render
          items = state.items.concat();
          items[ action.listIndex ].contents[ action.clickIndex ].text = 'クリック！';
          var id = items[ action.listIndex ].contents.length + 1;
          var data = { id:id, title:'人気タイトル' + id, text:'テキストテキストテキスト' + id, subject:5, url:'url3.html'};
          items[ action.listIndex ].contents.push( data );
          return { items:items, activeIndex:activeIndex, news:news };
          break;


        case testConstants.ADD_ITEM:
          //console.log( payload.value );
          //TestStore.emit( 'addItem' );
          break;


        case testConstants.DELETE_ITEM:
          //console.log( payload.value );
          //TestStore.emit( 'deleteItem', payload.value );
          break;
          
    }

  }

};


var List = require('./List.js');
var MainMenu = require('./MainMenu.js');
var SubMenu = require('./SubMenu.js');
var loadCount = 0;
var firstLoadLength = 3;

for( var i = 0; i < firstLoadLength; i++ ){
  addItem( news[i].url, firstLoadComp );
}


function firstLoadComp( data ){

    data.id = items.length;
    items.push( data );

    loadCount++;
    if( loadCount == firstLoadLength ){
      console.log( "comp!!" );
      const testStore = new TestStore(testDispatcher);
      List( testStore, TestAction );
      MainMenu( testStore, TestAction );
      SubMenu( testStore, TestAction );
    }
    console.log( "loadCount:" + loadCount );

}


function addItem( url, callback ){

  $.ajax({
    url: url,
    data: {},
    type: 'GET',
    dataType: 'xml',
    success: function( _callback, response ) {

      var title = $( response ).find( 'channel title' ).html();
      var contents = getItems( response );

      var data = {
        title:title,
        contents:contents
      };

      _callback( data );

    }.bind( this, callback )
  });

}


function getItems( response ){

  var _items = $( response ).find( 'item' );
  var items = [];
  var length = _items.length;
  
  for( var i = 0; i < length; i++ ){
    var _item = $( _items[i] );
    var item = {
      id:i+1,
      title:_item.find( 'title' ).html(),
      text:escapeHTML( _item.find( 'description' ).html() ),
      subject:_item.find( 'subject' ).html(),
      url:_item.attr( 'rdf:about' )
    };
    items.push( item );
  }

  return items;
}

//http://qiita.com/hrdaya/items/4beebbdb57009b405d2d
var escapeHTML = function (str) {
    return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
};




//------------------------ui--------------------------
var stageHeight = window.innerHeight;
var listContainer = $( '#listContainer' );
listContainer.css({ height: stageHeight - 128 - 80 + 'px' });

var newsContainer = $( '#mainMenu .news' );
newsContainer.css({ height: stageHeight - 194 + 'px' });



var timeoutId;

//mainMenu
var mainMenu = $( '#mainMenu' );
var mainMenuBtn = $( '#mainMenuBtn' );
var mainMenuInnter = mainMenu.find( '.inner' );
var mainMenuBg = mainMenu.find( '.bg' );

mainMenuBtn.on( 'click', function(){
  mainMenu.show();
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    mainMenuInnter.css({ transform : 'translateX(0px)' });
    mainMenuBg.css({ opacity : 1 });
  }, 100 );
} );


mainMenuBg.on( 'click', hideMainMenu );
function hideMainMenu(){
  mainMenuInnter.css({ transform : 'translateX(-465px)' });
  mainMenuBg.css({ opacity : 0 });
  clearTimeout( timeoutId );
  timeoutId = setTimeout(function(){
    mainMenu.hide();
  }, 300 );
}


//searchBtn
/*
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
*/




/*[
  [
    {id:1, title:'人気タイトル1', text:'テキストテキストテキスト1', subject:5, url:'url1.html'},
    {id:2, title:'人気タイトル2', text:'テキストテキストテキスト2', subject:3, url:'url2.html'},
    {id:3, title:'人気タイトル3', text:'テキストテキストテキスト3', subject:1, url:'url3.html'},
    {id:4, title:'人気タイトル4', text:'テキストテキストテキスト4', subject:1, url:'url3.html'},
    {id:5, title:'人気タイトル5', text:'テキストテキストテキスト5', subject:5, url:'url3.html'}
  ],
  [
    {id:1, title:'新着タイトル1', text:'テキストテキストテキスト1', subject:5, url:'url1.html'},
    {id:2, title:'新着タイトル2', text:'テキストテキストテキスト2', subject:3, url:'url2.html'},
    {id:3, title:'新着タイトル3', text:'テキストテキストテキスト3', subject:1, url:'url3.html'},
    {id:4, title:'新着タイトル4', text:'テキストテキストテキスト4', subject:1, url:'url3.html'},
    {id:5, title:'新着タイトル5', text:'テキストテキストテキスト5', subject:5, url:'url3.html'}
  ],
  [
    {id:1, title:'その他タイトル1', text:'テキストテキストテキスト1', subject:5, url:'url1.html'},
    {id:2, title:'その他タイトル2', text:'テキストテキストテキスト2', subject:3, url:'url2.html'},
    {id:3, title:'その他タイトル3', text:'テキストテキストテキスト3', subject:1, url:'url3.html'},
    {id:4, title:'その他タイトル4', text:'テキストテキストテキスト4', subject:1, url:'url3.html'},
    {id:5, title:'その他タイトル5', text:'テキストテキストテキスト5', subject:5, url:'url3.html'}
  ]
]*/