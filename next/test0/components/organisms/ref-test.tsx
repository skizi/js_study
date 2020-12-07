import React, { useRef } from 'react';

const RefTest: React.FC = () => {
  const ref = useRef();

  const onClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <style jsx>
        {`
          h3 {
            padding-left: 4px;
            border-left: 2px solid #333;
          }
        `}
      </style>
      <h3>Ref Test</h3>
      <button onClick={onClick}>Set Focus</button>
      <input type="text" ref={ref}></input>
    </>
  );
};

export default RefTest;
