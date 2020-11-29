import profileReducers from "./reducer";
import profileActions from "./actions";

const { setProfile } = profileActions;


const initialState = {
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


describe( "Reducer of ReduxToolKit", () => {

	describe( "incremented action", () => {

		it( "initialStateの値の確認", () => {
			const action = { type:setProfile.type };
			const state = profileReducers( initialState, action );
			expect( state.basic.name ).toEqual( "" );
		} );

	} );


	describe( "setProfile action", () => {

		it( "setProfileによる変更", () => {
			let obj = { basic:{ ...initialState.basic } };
			obj.basic.name = "hogeo";
			const action = { type:setProfile.type, payload:obj };
			const state = profileReducers( initialState, action );
			expect( state.basic.name ).toBe( "hogeo" );
		} );

	} );

});