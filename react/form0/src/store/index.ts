import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import profileReducers from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";
import thunk from "redux-thunk";
import validationReducer from "./validation/reducer";
import alertReducer from "./alert/reducer";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducers,
    validation: validationReducer,
    alert: alertReducer,
  }),
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
