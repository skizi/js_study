import {useState} from 'react';


const UseStateTest: React.FC = () => {

  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount( count + 1 );
  };


  return (
    <>
      <style jsx>
        {`
          h3{
            padding-left:4px;
            border-left:2px solid #333;
          }

          primitive, yamada{
            display:block;
            width:100px;
            height:100px;
            background-color:#f00;
          }

          yamada{
            background-color:#0f0;
          }
        `}
      </style>
      <h3>useState Test</h3>
    	<button onClick={onClick}>カウントアップ</button>
		  <p>{count}</p>

      <h3>適当な名前のDOM</h3>
      <primitive dispose={null}>primitive</primitive>
      <yamada>yamada</yamada>
    </>
  );

};

export default UseStateTest;