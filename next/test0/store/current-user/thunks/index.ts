import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  CurrentUser
} from '~/vendor/zipaddress';
import { AppThunkApi } from '../..';
import { AxiosError } from 'axios';
import ZipAddressApi from '~/vendor/zipaddress';

import { CurrentUserState } from '..';



export const zipcodeToAddress = createAsyncThunk<CurrentUser, string, AppThunkApi>(
  'currentUser/address',
  async ( code, thunkApi) => {

    let api = new ZipAddressApi();

    try {

      const response = await api.zipcodeToAddress( code );

      if( response.data.data.code == "400" ){
        return thunkApi.rejectWithValue(response.data.data);
      }else{
        return response.data.data.data.address;
      }
    } catch (error) {

      if (!error.isAxiosError && !error.response?.title) {
        return thunkApi.rejectWithValue(error);
      }

      return thunkApi.rejectWithValue(
        error.response.data
      );

    }
  }
);

export const mountZipcodeToAddressThunk = (
  builder: ActionReducerMapBuilder<CurrentUserState>
): void => {
  builder.addCase(zipcodeToAddress.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(zipcodeToAddress.fulfilled, (state, { payload }) => {

    state.address = payload;
    state.isLoading = false;
  });
  builder.addCase(zipcodeToAddress.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = action.error;
    }
  });
};