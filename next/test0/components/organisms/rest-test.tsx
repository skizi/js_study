import React from "react";


const RestTest:React.FC = ( { hoge1, ...rest } ) => {
	
	return(
		<>
			<h3>{rest.hoge0}</h3>

			{/*hoge1以外がrestでpに渡される*/}
			<p {...rest}>{hoge1}</p>
		</>
	);

}

export default RestTest;