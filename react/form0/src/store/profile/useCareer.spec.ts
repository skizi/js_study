import { useCareer } from "./useCareer";
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

describe("useCareer custom Hook", () => {
  it("値の変更がされているか", async () => {
    const { result } = renderHook(() =>
      useCareer(profile, recalculateValidation)
    );

    //handleAddCareer
    expect(result.current.careers).toEqual([]);
    act(() => {
      result.current.handleAddCareer();
    });
    const initCareer = {
      company: "",
      position: "",
      startAt: "",
      endAt: "",
    };
    expect(result.current.careers).toEqual([initCareer]);

    //handleChangeCareer
    expect(result.current.careers[0].company).toBe("");
    act(() => {
      result.current.handleChangeCareer({ company: "会社A" }, 0);
    });
    expect(result.current.careers[0].company).toBe("会社A");

    //handleDeleteCareer
    act(() => {
      result.current.handleDeleteCareer(0);
    });
    expect(result.current.careers).toEqual([]);
  });
});
