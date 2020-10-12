import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import UserReducer, { UserState, initialUserState } from "./user";

export type RootState = {
	user:UserState
};

const reducers = combineReducers<RootState>({
	user:UserReducer
});

let store;

const initialState = { user:initialUserState }

function initStore(preloadedState = initialState) {
  return createStore(
	reducers,
	preloadedState,
	applyMiddleware(thunk)
  );
}



export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // 対象のPageでgetServerSidePropsを実行し、
  // そのstateをstore内の現在のstateとマージし、
  // 新しいstoreを作成します
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // SSGおよびSSRの場合は新しいstoreを作成する
  if (typeof window === 'undefined') return _store
  // クライアントサイドで一度だけstoreを作成する
  if (!store) store = _store

  return _store
}


export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}