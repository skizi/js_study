// import { Reducer } from 'redux'
// import { ActionType } from 'redux-actions-type'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, SET_ADDRESS, DELETE_ADDRESS, SWITCH_ADDRESS, SORT_ADDRESS } from './actions'
import * as actions from './actions'


//ActionType : actionTypeを作るためのショートカット
// export type HogeAction = ActionType<typeof actions>

export type HogeState = {
  showFlag: boolean,
  text : string,
  addresses : string[]
}

export const initialState: HogeState = {
  showFlag: false,
  text: "",
  addresses : []
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
      var addresses:string[] = [...state.addresses, action.address];
      return { ...state, addresses:addresses };
      break;

    case DELETE_ADDRESS:
      console.log("DELETE_ADDRESS");
      let _array = state.addresses.filter((address, i)=>{
        return i != action.index
      });
      return { ...state, addresses:_array };
      break;

    case SWITCH_ADDRESS:
      console.log("SWITCH_ADDRESS");
      const addressA = state.addresses[action.a];
      const addressB = state.addresses[action.b];
      var addresses:string[] = [ ...state.addresses ];
      addresses.splice( action.a, 1, addressB );
      addresses.splice( action.b, 1, addressA );
      return { ...state, addresses:addresses };
      break;

    case SORT_ADDRESS:
      var addresses:string[] = [ ...state.addresses ];
      addresses.sort((a, b)=>{
        if( a < b ){
          return -1;
        }
        if( a > b ){
          return 1;
        }
        return 0;
      });
      return { ...state, addresses:addresses };
      break;

    default:
      return state;
      break;
  }

}

export default hogeReducer