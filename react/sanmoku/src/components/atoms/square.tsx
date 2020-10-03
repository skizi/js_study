import React from "react";

interface Props{
	value:string,
	onClick:(i:string)=>void
}

const Square:React.FC<Props> = ( props:Props ) => {

	return (
	  <button className="square" onClick={() => props.onClick(props.value)}>
	    {props.value}
	  </button>
	);
}


export default Square;