import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import HogeReducer, { HogeState } from "./hoge";

export type RootState = {
	hoge:HogeState
};

const reducers = combineReducers<RootState>({
	hoge:HogeReducer
});

const store = createStore(
	reducers,
	applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;


export default store;