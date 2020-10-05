import React from "react";


type Props = {
	onClick:() => void;
}

const Button = (props:Props) => {
	
	return(
		<button onClick={props.onClick}>ボタン</button>
	);

}


export default Button;