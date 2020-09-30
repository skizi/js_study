import React from 'react';
import { ResourceContext } from '../../store';


const NewsText:React.FC = () => {
	
	return(
	    <ResourceContext.Consumer>
	      { (newsText) => (
	        <p>{newsText}</p>
	      )}
	    </ResourceContext.Consumer>
	);

}


export default NewsText;