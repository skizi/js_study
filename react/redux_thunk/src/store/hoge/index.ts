// import { Reducer } from 'redux'
import { ActionType } from 'redux-actions-type'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actions'
import * as actions from './actions'


export type HogeAction = ActionType<typeof actions>

export type State = {
  showFlag: boolean,
  text : string
}

export const initialState: State = {
  showFlag: false,
  text: ""
}

const hogeReducer/*: Reducer<State, HogeAction>*/ = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      console.log("SHOW_NOTIFICATION");
      return { showFlag: true, text:action.payload }
    case HIDE_NOTIFICATION:
      console.log("HIDE_NOTIFICATION");
      return { showFlag: false, text:action.payload }
    default:
      return state
  }
}

export default hogeReducer