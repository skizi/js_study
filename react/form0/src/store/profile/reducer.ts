import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";

const initializeState:Profile = {
	name:"",
	description:"",
	birthday:"",
	gender:"",

	address:{
		postalcode:"",
		prefecture:"",
		city:"",
		restAddress:""
	}
};


const profileReducers = reducerWithInitialState(initializeState).case(
	profileActions.setProfile,
	( state, payload ) => ({
		...state,
		...payload
	})
).case(profileActions.setAddress,( state, payload ) => ({
	...state,
	address:{ ...state.address, ...payload }
})).case(profileActions.searchAddress.done, (state, payload) => ({
	...state,
	address: { ...state.address, ...payload.result }
}));


export default profileReducers;