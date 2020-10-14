import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";

const initializeState:Profile = {
	name:"",
	description:"",
	birthday:"",
	gender:""
};


const profileReducers = reducerWithInitialState(initializeState).case(
	profileActions.setProfile,
	( state, payload ) => ({
		...state,
		...payload
	})
);


export default profileReducers;