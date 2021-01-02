import React from "react";

type Props = {
	clickHandler:() => void,
	className:string
}

const TestBtn:React.FC = ( props:Props ) => {
	
	return (
		<>
			<button onClick={props.clickHandler} className={props.className}>hoge</button>
		</>
	);

}

export default TestBtn;