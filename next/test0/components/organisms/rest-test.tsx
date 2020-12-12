import React from "react";

type Props = {
  hoge0: string;
  hoge1: string;
};

const RestTest: React.FC<Props> = ({ hoge1, ...rest }: Props) => {
  return (
    <>
      <h3>{rest.hoge0}</h3>

      {/*hoge1以外がrestでpに渡される*/}
      <p {...rest}>{hoge1}</p>
    </>
  );
};

export default RestTest;
