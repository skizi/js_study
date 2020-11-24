import { useBasic } from "./useBasic";
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());


const profile = {
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
const recalculateValidation = jest.fn();

describe("useBasic custom Hook", () => {

  it("", () => {

    const { result } = renderHook(() => useBasic( profile, recalculateValidation ));
    // expect(result.current.count).toBe(3);
    // act(() => {
    //   result.current.increment();
    // });
    // expect(result.current.count).toBe(4);
  });

});