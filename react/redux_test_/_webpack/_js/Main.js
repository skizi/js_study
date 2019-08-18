import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import App from './App'
import { createStore } from 'redux';


'use strict';


/* Reducersの実装 */
function formReducer(state, action) {

  switch( action.type ){
  
    case 'SEND':
      return Object.assign( {}, state, {
        value: action.value,
      });
  
    default:
      return state;
  
  }

}


/* Storeの実装 */
const initialState = {
  value: null,
};
const store = createStore(formReducer, initialState);



// render
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")  
)