import React, {useMemo, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchAddress from '../molecules/search-address';
import { RootState } from '../../store';
import { showNotificationWithTimeout } from '../../store/hoge/actions';
import Title from '../atoms/title';
import { useAddress } from '../../hooks/useAddress';

import { ResourceContext } from '../../store';

const Container:React.FC = (props) =>{

	const dispatch = useDispatch();
	const { loadingFlag, address, getAddress } = useAddress();
	const clickHandler = (zipcode:string)=>getAddress(zipcode);


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