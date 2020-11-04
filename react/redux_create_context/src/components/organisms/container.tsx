import React from 'react';
import SearchAddress from '../molecules/search-address';

import { ResourceContext } from '../../store';

const Container:React.FC = (props) =>{
	
	return(
	    <ResourceContext.Provider value={{newsText:"〜Containerから渡された値:ReactContextの練習〜"}}>
			<div>
				<h3>郵便番号から住所検索</h3>
				<SearchAddress />
			</div>
	    </ResourceContext.Provider>
	);

}


export default Container;