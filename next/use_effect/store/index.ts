import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import UserReducer, { UserState } from "./user";

export type RootState = {
	user:UserState
};

const reducers = combineReducers<RootState>({
	user:UserReducer
});

const store = createStore(
	reducers,
	applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;


export default store;