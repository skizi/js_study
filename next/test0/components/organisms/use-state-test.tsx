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
        `}
      </style>
      <h3>useState Test</h3>
    	<button onClick={onClick}>カウントアップ</button>
		  <p>{count}</p>
    </>
  );

};

export default UseStateTest;