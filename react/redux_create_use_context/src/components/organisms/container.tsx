import React, {useCallback} from 'react';
import SearchAddress from '../molecules/search-address';
import Title from '../atoms/title';
import { useAddress } from '../../hooks/useAddress';

import { ResourceContext } from '../../store';

const Container:React.FC = (props) =>{

	const { loadingFlag, address, getAddress } = useAddress();
	const clickHandler = useCallback((zipcode:string)=>getAddress(zipcode), [getAddress]);


	const newsText:string = "〜Containerから渡された値:ReactContextの練習〜";

	return(
		<div>
			<Title>郵便番号から住所検索</Title>
		    <ResourceContext.Provider value={{newsText:newsText}}>
				<SearchAddress clickHandler={clickHandler} address={address} loadingFlag={loadingFlag} />
		    </ResourceContext.Provider>
		</div>
	);

}


export default Container;