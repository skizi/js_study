import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Address from "./Address";
import { ProfileContext } from "../../store/profile/contexts";

describe("<Address>", () => {
  const validation = {
    message: {
      address: {
        name: "",
        description: "",
        gender: "",
        birthday: "",
      },
    },
  };

  const handlePostalcodeChange = jest.fn();
  const handleAddressChange = jest.fn();
  const theme = {
    prefecture: "",
    city: "",
    handlePostalcodeChange: handlePostalcodeChange,
    handleAddressChange: handleAddressChange,
    validation: validation,
  };

  it("イベントハンドラが4回呼ばれるか", () => {
    const { getByTestId } = render(
      <ProfileContext.Provider value={theme}>
        <Address />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByTestId("postalcode"), {
      target: { value: "4210201" },
    });
    fireEvent.change(getByTestId("prefecture"), {
      target: { value: "静岡県" },
    });
    fireEvent.change(getByTestId("city"), { target: { value: "焼津市" } });
    fireEvent.blur(getByTestId("restAddress"), {
      target: { value: "焼津1丁目" },
    });
    expect(handlePostalcodeChange).toHaveBeenCalledTimes(1);
    expect(handleAddressChange).toHaveBeenCalledTimes(3);
  });

  it("validationのアラート文が表示されるか", () => {
    theme.validation.message.address.postalcode =
      "郵便番号を入力してください。";
    theme.validation.message.address.prefecture =
      "都道府県を入力してください。";
    theme.validation.message.address.city = "市区町村を入力してください。";
    theme.validation.message.address.restAddress =
      "番地以下を入力してください。";
    const { queryByText } = render(
      <ProfileContext.Provider value={theme}>
        <Address />
      </ProfileContext.Provider>
    );
    expect(queryByText("郵便番号を入力してください。")).not.toBeUndefined();
    expect(queryByText("都道府県を入力してください。")).not.toBeUndefined();
    expect(queryByText("市区町村を入力してください。")).not.toBeUndefined();
    expect(queryByText("番地以下を入力してください。")).not.toBeUndefined();
  });
});
