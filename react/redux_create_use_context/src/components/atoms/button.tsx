import React from 'react';



interface Props {
  getAddress: () => void,
}

const Button:React.FC<Props> = React.memo((props) =>{
	
	return(<button onClick={props.getAddress}>{props.children}</button>);

});


export default Button;