import React, { useContext } from 'react';
import { ResourceContext } from '../../store';


const NewsText:React.FC = () => {

	//useContextを利用して値を受け取る例
	const { newsText } = useContext(ResourceContext);
	
	return(
        <p>{newsText}</p>
	);

}


export default NewsText;