import React from "react";
import { Provider } from "react-redux";
import Redux, { createStore, combineReducers } from "redux";
import { render, fireEvent } from '@testing-library/react';

import Profile from "./Profile";
import profileReducers from "../../store/profile/reducer";



describe( "Reducer of ReduxToolKit", () => {

	const initialState = {
		profile:{
			basic:{
				name:"よしお",
				description:"",
				birthday:"",
				gender:"",
			},

			address:{
				postalcode:"4250001",
				prefecture:"静岡県",
				city:"焼津市",
				restAddress:""
			},

			careers:[],

			college:{
			  name: "ワクワク学校",
			  faculty: "不安学部",
			  department: "陽気学科",
			  result:[{
		    		name:"北海道大学",
		    		faculty:[{ name:"普通学部", department:["普通学科"] }],
		    		department:["普通学科"]
		    	}]
			}
		}
	};

	let store;
	beforeEach(()=>{
		store = createStore(
			combineReducers({
				profile:profileReducers
			}),
			initialState
		);
	});

	

	it( "initialStateの値の確認", () => {

		const {getByTestId} = render(
			<Provider store={store}>
				<Profile />
			</Provider>
		);

        // fireEvent.click(getByTestId('saveBtn'));
		// expect( state.basic.name ).toEqual( "" );
	} );


});