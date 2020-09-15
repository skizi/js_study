import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';


export interface CurrentUserState {
  isRegistered: boolean;
  isLoading: boolean;
  error?: Error | SerializedError;
}

const initialState: CurrentUserState = {
  isRegistered: false,
  isLoading: false,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
      toggleLoading (state: State, action: PayloadAction<string>) {
          state.isLoading = !state.isLoading;
      },
  },
  extraReducers: (builder) => {
  },
});


export const {
    toggleLoading
} = currentUserSlice.actions


export default currentUserSlice.reducer;
