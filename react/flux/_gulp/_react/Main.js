//https://mae.chab.in/archives/2747

var Dispatcher = require("flux").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var React = require("react");
var ReactDOM = require('react-dom');// 14.0 以降、React.render function は react-dom に移動した

var testDispatcher = new Dispatcher();

var testConstants = {
  TEST: "test",
  ADD_ITEM: "addItem",
  DELETE_ITEM: "deleteItem"
};


// action
var TestAction = {

  test: function (testValue) {
    testDispatcher.dispatch({
      actionType: testConstants.TEST,
      value: testValue
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


// store
var TestStore = assign({}, EventEmitter.prototype, {

  getAll : function () {
    return [
      {id:1, text:"商品1"},
      {id:2, text:"商品2"},
      {id:3, text:"商品3"}
    ];
  },


  dispatcherIndex : testDispatcher.register( function( payload ){

    switch( payload.actionType ) {
      
        case testConstants.TEST:
          // console.log(payload.value);
          _test.value = payload.value;
          TestStore.emit( 'change' );
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
var TestApp = require('./TestApp.js');
TestApp( React, ReactDOM, TestStore, TestAction );
