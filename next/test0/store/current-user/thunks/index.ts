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
  async ( code:string, thunkApi:AppThunkApi) => {

    let api = new ZipAddressApi();

    try {

      const response = await api.zipcodeToAddress( code );

      if( response.data.data.code == "400" ){
        return thunkApi.rejectWithValue(response.data.data);
      }else{
        return { address:response.data.data.data.address }; //型はCurrentUser
      }
      
    } catch (error) {

      if (!error.response) { //通信エラーの時はresponseが帰ってこない。その時はerrorを送出
        throw error
      }

      return thunkApi.rejectWithValue( error.response.data );

    }
  }
);

export const mountZipcodeToAddressThunk = (
  builder: ActionReducerMapBuilder<CurrentUserState>
): void => {
  builder.addCase(zipcodeToAddress.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(zipcodeToAddress.fulfilled, (state, action) => { //第二引数のactionは、payload:CurrentUser、meta:object、Actionタイプ:stringを含む
    state.address = action.payload.address;
    state.isLoading = false;
  });
  builder.addCase(zipcodeToAddress.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload; //ReduxToolKitに用意されたSerializedErrorと言う型で、一致する値だけ返す。この場合、codeとmessage
    } else {
      state.error = action.error;
    }
  });
};