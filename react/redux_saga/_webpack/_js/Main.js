import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import ReduxSaga from 'redux-saga';
import { call, put, take, fork, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from "redux-saga";
import 'babel-polyfill';


'use strict';


// INCREMENTが来たら 文字列を足す reducer
function counterReducer(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign( {}, state, {
        value: action.value + "_1秒後",
      });
    default:
      return state;
  }
}


//const effects = ReduxSaga.effects; //なぜかundefined

//コールバック用にPromiseをインスタンス化
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// INCREMENT_ASYNCを受け取った1秒後にINCREMENTを発生させる。
function* counterSaga() {
  while(1) {
    var action = yield take('INCREMENT_ASYNC');
    yield call(delay, 1000);
    yield put({ type: 'INCREMENT', value:action.value });
  }
}


//  redux-sagaの初期化
const initialState = {
  value: null,
};
const sagaMiddleware = createSagaMiddleware();
var store = createStore(
    counterReducer,
    initialState,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(counterSaga);




// render
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")  
);
