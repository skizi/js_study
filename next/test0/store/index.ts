import {
  configureStore,
  getDefaultMiddleware,
  SerializedError,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import currentUser from './current-user';

const store = configureStore({
  reducer: {
    currentUser
  },
  devTools: true,
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export interface AppThunkApi {
  dispatch: AppDispatch;
  state: AppState;
  rejectValue: Error | SerializedError;
  extra: {
  };
}