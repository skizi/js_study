import { useAddress } from "./useAddress";
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


describe("useAddress custom Hook", () => {

  it("値の変更がされているか", async () => {

    const { result, waitForNextUpdate } = renderHook(() => useAddress( profile, recalculateValidation ));

    //postalcode
    expect(result.current.address.postalcode).toBe("");
    act(() => {
      result.current.handlePostalcodeChange( "4250001" );
    });
    await waitForNextUpdate();
    expect(result.current.address.postalcode).toBe("4250001");

    //prefecture
    expect(result.current.address.prefecture).toBe("静岡県");
    act(() => {
      result.current.handleAddressChange({ prefecture:"北海道" });
    });
    expect(result.current.address.prefecture).toBe("北海道");

    //city
    expect(result.current.address.city).toBe("焼津市花沢");
    act(() => {
      result.current.handleAddressChange({ city:"稚内市" });
    });
    expect(result.current.address.city).toBe("稚内市");

    //restAddress
    expect(result.current.address.restAddress).toBe("");
    act(() => {
      result.current.handleAddressChange({ restAddress:"末広町" });
    });
    expect(result.current.address.restAddress).toBe("末広町");
  });

});