// import { Reducer } from 'redux'
import { ActionType } from 'redux-actions-type'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, SET_ADDRESS } from './actions'
import * as actions from './actions'


export type HogeAction = ActionType<typeof actions>

export type HogeState = {
  showFlag: boolean,
  text : string,
  address : string
}

export const initialState: HogeState = {
  showFlag: false,
  text: "",
  address : ""
}

const hogeReducer/*: Reducer<HogeState, HogeAction>*/ = (
  state:HogeState = initialState,
  action: any
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      console.log("SHOW_NOTIFICATION");
      return { ...state, showFlag:true };
      break;
    case HIDE_NOTIFICATION:
      console.log("HIDE_NOTIFICATION");
      return { ...state, showFlag:false };
      break;
    case SET_ADDRESS:
      console.log("SET_ADDRESS");
      return { ...state, address:action.address };
      break;

    default:
      return state;
      break;
  }

}

export default hogeReducer