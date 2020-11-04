import React, { useContext } from 'react';
import { ResourceContext } from '../../store';


const NewsText:React.FC = React.memo( () => {

	const { newsText } = useContext(ResourceContext);
	
	return(
        <p>{newsText}</p>
	);

} );


export default NewsText;