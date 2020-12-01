import React from "react";
import { Provider } from "react-redux";
import Redux, { createStore, combineReducers } from "redux";
import { render, fireEvent } from '@testing-library/react';

import Profile from "./Profile";
import profileReducers from "../../store/profile/reducer";



describe( "Reducer of ReduxToolKit", () => {

	let store;
	beforeEach(()=>{
		store = createStore(
			combineReducers({
				profile:profileReducers
			})
		);
	});

	

	it( "initialStateの値の確認", () => {

		const {getByTestId} = render(
			<Provider store={store}>
				<Profile />
			</Provider>
		);

        fireEvent.click(getByTestId('saveBtn'));
		// expect( state.basic.name ).toEqual( "" );
	} );


});