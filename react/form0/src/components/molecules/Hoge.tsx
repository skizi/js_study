import React, { useState } from "react";

const Hoge: React.FC = () => {
  type Fuga = {
    name: string;
    title: string;
  };

  const [fuga, setFuga] = useState<Fuga>({
    name: "",
    title: "",
  });

  const clickHandler = (member: Partial<Fuga>): void => {
    setFuga({ ...fuga, ...member });
  };

  return (
    <>
      <button
        onClick={(): void => clickHandler({ name: "よしお" })}
        data-testid="nameBtn"
      >
        nameボタン
      </button>
      <button
        onClick={(): void => clickHandler({ title: "いい天気" })}
        data-testid="titleBtn"
      >
        titleボタン
      </button>
      <input
        onChange={(e): void => clickHandler({ title: e.target.value })}
        data-testid="titleInput"
      />
      <p data-testid="nameText">{fuga.name}</p>
      <p data-testid="titleText">{fuga.title}</p>
    </>
  );
};

export default Hoge;
