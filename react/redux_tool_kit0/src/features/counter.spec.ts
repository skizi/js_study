import { counterSlice } from "./counter";

const { add, decremented, incremented } = counterSlice.actions;

describe( "Reducer of ReduxToolKit", () => {

	describe( "incremented action", () => {

		let initialState = {
			count:0
		}

		it( "incrementedによる変更", () => {
			const action = { type:incremented.type };
			const state = counterSlice.reducer( initialState, action );
			expect( state.count ).toEqual( 1 );
		} );

	} );


	describe( "decremented action", () => {

		let initialState = {
			count:0
		}

		it( "decrementedによる変更", () => {
			const action = { type:decremented.type };
			const state = counterSlice.reducer( initialState, action );
			expect( state.count ).toEqual( -1 );
		} );

	} );


	describe( "add action", () => {

		let initialState = {
			count:0
		}

		it( "addによる変更", () => {
			const action = { type:add.type, payload:10 };
			const state = counterSlice.reducer( initialState, action );
			expect( state.count ).toEqual( 10 );
		} );

	} );

});