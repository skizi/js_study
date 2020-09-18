import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { mountZipcodeToAddressThunk } from './thunks';


export * from './thunks';


export interface CurrentUserState {
  isRegistered: boolean;
  isLoading: boolean;
  address: string;
  error?: Error | SerializedError;
}

const initialState: CurrentUserState = {
  isRegistered: false,
  isLoading: false,
  address: ""
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
    mountZipcodeToAddressThunk(builder);
  },
});


export const {
    toggleLoading
} = currentUserSlice.actions


export default currentUserSlice.reducer;
