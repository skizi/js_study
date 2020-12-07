import { zipcodeToAddress } from './index';
import { currentUserSlice } from '../';

describe('createAsyncThunk of ReduxToolKit', () => {
  describe('zipcodeToAddress action', () => {
    it('zipcodeToAddressの値の確認 fulfilled', () => {
      const initialState = {
        address: '',
        error: '',
      };
      const action = { type: zipcodeToAddress.fulfilled.type, payload: { address: '北海道' } };
      const state = currentUserSlice.reducer(initialState, action);
      expect(state.address).toEqual('北海道');
    });

    it('zipcodeToAddressの値の確認 rejected', () => {
      const initialState = {
        address: '',
        error: '',
      };
      const action = { type: zipcodeToAddress.rejected.type, payload: 'エラー！' };
      const state = currentUserSlice.reducer(initialState, action);
      expect(state.error).toEqual('エラー！');
    });
  });
});
