import { useBasic } from "./useBasic";
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

const profile = {
  basic: {
    name: "",
    description: "",
    birthday: "",
    gender: "",
  },

  address: {
    postalcode: "",
    prefecture: "",
    city: "",
    restAddress: "",
  },

  careers: [],

  college: {
    name: "",
    faculty: "",
    department: "",
    result: [],
  },
};
const recalculateValidation = jest.fn();

describe("useBasic custom Hook", () => {
  it("値の変更がされているか", () => {
    const { result } = renderHook(() =>
      useBasic(profile, recalculateValidation)
    );

    //name
    expect(result.current.basic.name).toBe("");
    act(() => {
      result.current.handleBasicProfileChange({ name: "hogeo" });
    });
    expect(result.current.basic.name).toBe("hogeo");

    //description
    expect(result.current.basic.description).toBe("");
    act(() => {
      result.current.handleBasicProfileChange({
        description: "初めましてhogeoです",
      });
    });
    expect(result.current.basic.description).toBe("初めましてhogeoです");

    //birthday
    expect(result.current.basic.birthday).toBe("");
    act(() => {
      result.current.handleBasicProfileChange({ birthday: "2020-12-24" });
    });
    expect(result.current.basic.birthday).toBe("2020-12-24");

    //gender
    expect(result.current.basic.gender).toBe("");
    act(() => {
      result.current.handleBasicProfileChange({ gender: "male" });
    });
    expect(result.current.basic.gender).toBe("male");
  });
});
