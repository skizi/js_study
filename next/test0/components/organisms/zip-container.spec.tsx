import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import {
  configureStore,
} from '@reduxjs/toolkit';

import ZipContainer from "./zip-container";
import currentUserReducer from "../../store/current-user";



describe( "createAsyncThunk of ReduxToolKit", () => {

	let store;
	beforeEach(()=>{
		store = configureStore({
			reducer:{
				currentUser:currentUserReducer
			}
		});
	});

	

	it( "createAsyncThunkのテスト", async () => {

		const {getByTestId, waitForNextUpdate} = render(
			<Provider store={store}>
				<ZipContainer />
			</Provider>
		);

        fireEvent.change(getByTestId('zipCodeInput'), { target: { value: '4250041' } });
        fireEvent.click(getByTestId('zipCodeBtn'));

	    await waitFor(() => {
		    expect( getByTestId('address').textContent).toBe( "静岡県焼津市石津" );
		});
	} );


});