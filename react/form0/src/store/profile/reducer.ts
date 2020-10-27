import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import { Career } from "../../domain/entity/career";
import { College } from "../../domain/entity/college";
import profileActions from "./actions";

const initializeState:Profile = {
	basic:{
		name:"",
		description:"",
		birthday:"",
		gender:"",
	},

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
	  department: "",
	  result:[]
	}
};

const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: ""
};


const profileReducers = reducerWithInitialState(initializeState).case(
profileActions.setCareer, ( state, payload ) => {

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
}).case(
	profileActions.searchCollege.done, (state, payload) => ({
    ...state,
    college: { ...state.college, result : payload.result }
  })
);


export default profileReducers;