import { configureStore, SerializedError } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import currentUserReducer from "./current-user";

//reducerをまとめる
const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
  devTools: true,
});

export default store;

// コンポーネント側でstate参照する時に、型注釈に使用するのでexportする
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export interface AppThunkApi {
  dispatch: AppDispatch;
  state: AppState;
  rejectValue: Error | SerializedError; //rejectWithValueで返す値の型
  extra: null;
}
