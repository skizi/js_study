import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer, {UserState, initialState} from './current-user';


export type RootState = {
  user:UserState
}

const reducers = combineReducers<RootState>({
    user:userReducer
})

const store = createStore(
  reducers,
  applyMiddleware()
)

export type AppDispatch = typeof store.dispatch;


export default store;