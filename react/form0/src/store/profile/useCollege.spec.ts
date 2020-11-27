import { useCollege } from "./useCollege";
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


describe("useCollege custom Hook", () => {

  it("値の変更がされているか", async () => {

    const { result, waitForNextUpdate } = renderHook(() => useCollege( profile, recalculateValidation ));

    const initCollege = {
      name: "",
      faculty: "",
      department: "",
      result: []
    };
    expect(result.current.college).toEqual(initCollege);

    //handleSearchCollege
    expect(result.current.college.result).toEqual([]);
    act(() => {
      result.current.handleSearchCollege( "稚内" );
    });
    await waitForNextUpdate();
    expect(result.current.college.result.length).not.toBe(0);

    //handleChangeCollege
    expect(result.current.college.name).toEqual("");
    act(() => {
      result.current.handleChangeCollege({ name:"稚内北星学園" });
    });
    expect(result.current.college.name).toBe("稚内北星学園");

    //handleResetCollege
    expect(result.current.college.name).toBe("稚内北星学園");
    act(() => {
      result.current.handleResetCollege();
    });
    expect(result.current.college.name).toBe("");

  });

});