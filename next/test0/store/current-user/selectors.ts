import { AppState } from "..";

export const isLoadingSelector = (state: AppState): boolean =>
  state.currentUser.isLoading;

export const addressSelector = (state: AppState): string =>
  state.currentUser.address;
