import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import { Career } from "../../domain/entity/career";
import { College } from "../../domain/entity/college";
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
	},

	careers:[],

	college:{
	  name: "",
	  faculty: "",
	  department: ""
	}
};

const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: ""
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
})).case(profileActions.setCareer, ( state, payload ) => {

	const careers = state.careers.map(( item, i )=>{
		return i == payload.index ? { ...item, ...payload.career } : item;
	});

	return {
		...state,
		careers: careers
	}
}).case(profileActions.deleteCareer, (state, payload) => { 
	
	const careers = state.careers.filter(( item, i )=>{
		return i != payload;
	});

	return {
		...state,
		careers: careers
	}
}).case(profileActions.addCareer, (state, payload) => { 

	return {
		...state,
		careers: [ ...state.careers, initCareer ]
	}
}).case(profileActions.setCollege, (state, payload) => { 

	return {
		...state,
		college: { ...state.college, ...payload }
	}
}).case(profileActions.setCollege, (state, payload) => { 

	return {
		...state,
		college: { ...state.college, ...payload }
	}
});


export default profileReducers;