import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import profileReducers from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";
import thunk from "redux-thunk";


const store = createStore(
	combineReducers<RootState>({
		profile:profileReducers
	}),
	compose(
	    applyMiddleware(thunk),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
);


export default store;