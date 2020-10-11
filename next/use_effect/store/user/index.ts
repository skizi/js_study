// import { Reducer } from 'redux'
import { ActionType } from 'redux-actions-type'
import * as actions from './actions'
import { CREATE_USER, GET_USERS, UPDATE_USER, DELETE_USER } from './actions'


export type UserAction = ActionType<typeof actions>


export type UserState = {
  users:User[]
}


export const initialState: UserState = {
  users:[]
}


const userReducer/*: Reducer<HogeState, HogeAction>*/ = (
  state:UserState = initialState,
  action: any
) => {

  let name:string, outline:string, id:number, users:User;
  
  switch (action.type) {

    case CREATE_USER:
      console.log("CREATE_USER");
      return { users:[ ...state.users, action.user ] };
      break;
    
    case GET_USERS:
      console.log("GET_USERS");
      return { users:[ ...action.users] };
      break;

    case UPDATE_USER:
      console.log("UPDATE_USER");
      let { name, outline, id } = action.user;
      console.log("update id:" + id);
      users = state.users.map((item, i)=>{
        if( item.id == id ){
          item.name = name;
          item.outline = outline;
        }
        return item;
      });
      console.log(users);
      return { users:users };
      break;
    
    case DELETE_USER:
      console.log("DELETE_USER");
      id = action.id;
      users = state.users.filter((item, i)=>{
        return item.id != id;
      });
      return { users:users };
      break;

    default:
      return state;
      break;
  }

}


export default userReducer