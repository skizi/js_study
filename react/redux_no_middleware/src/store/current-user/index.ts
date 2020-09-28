import { ActionType } from 'redux-actions-type'
import { CHANGE_USER_NAME } from './actions'
import * as actions from './actions'


export type UserAction = ActionType<typeof actions>

export type UserState = {
  name: string
}

export const initialState: UserState = {
  name: "",
}

const userReducer/*: Reducer<HogeState, HogeAction>*/ = (
  state:UserState = initialState,
  action: any
) => {
  switch (action.type) {

  	case CHANGE_USER_NAME:
		console.log("CHANGE_USER_NAME");
		return Object.assign({}, state, {
			name:action.name
		});
		break;

  	default:
  		return state;
  		break;
  }

}


export default userReducer;