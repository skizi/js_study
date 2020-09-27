import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import hogeReducer, {State as notificationState} from './hoge';


export type RootState = {
  hoge:notificationState
}

const reducers = combineReducers<RootState>({
    hoge:hogeReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;


export default store;