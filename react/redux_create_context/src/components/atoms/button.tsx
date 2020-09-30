import React from 'react';



interface Props {
  getAddress: () => void,
}

const Button:React.FC<Props> = (props) =>{
	
	return(<button onClick={props.getAddress}>{props.children}</button>);

}


export default Button;