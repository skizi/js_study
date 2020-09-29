import { ActionType } from 'redux-actions-type'
import { CHANGE_USER_NAME, CHANGE_USER_ADDRESS } from './actions'
import * as actions from './actions'


export type UserAction = ActionType<typeof actions>

export type UserState = {
  name: string,
  address: string
}

export const initialState: UserState = {
  name: "",
  address: ""
}

const userReducer/*: Reducer<HogeState, HogeAction>*/ = (
  state:UserState = initialState,
  action: any
) => {
  switch (action.type) {

  	case CHANGE_USER_NAME:
		console.log("CHANGE_USER_NAME");
		return { ...state, name:action.name };
		break;

  	case CHANGE_USER_ADDRESS:
		console.log("CHANGE_USER_ADDRESS");
		return { ...state, address:action.address };
		break;

  	default:
  		return state;
  		break;
  }

}


export default userReducer;