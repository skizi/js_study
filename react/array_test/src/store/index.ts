import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import hogeReducer, {HogeState, initialState} from './hoge';


export type RootState = {
  hoge:HogeState
}

const reducers = combineReducers<RootState>({
    hoge:hogeReducer
})

const store = createStore(
  reducers,
  { hoge:initialState },
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;


export default store;