import React from 'react';
import { ResourceContext } from '../../store';


const NewsText:React.FC = () => {

	//ResourceContext.Consumerを利用して値を受け取る例
	return(
	    <ResourceContext.Consumer>
	      { (data) => (
	        <p>{data.newsText}</p>
	      )}
	    </ResourceContext.Consumer>
	);

}


export default NewsText;