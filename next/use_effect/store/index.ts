import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import UserReducer, { UserState, initialUserState } from "./user";

export type RootState = {
	user:UserState
};

const reducers = combineReducers<RootState>({
	user:UserReducer
});

const initialState = { user:initialUserState }

let store = createStore(
	reducers,
	initialState,
	applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;



export default store;