import React from 'react';

const Title:React.FC = React.memo((props) =>{
	
	return(
		<h3>{props.children}</h3>
	);

});


export default Title;