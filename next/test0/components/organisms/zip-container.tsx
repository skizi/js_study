import { Component } from 'react';
import { useAppDispatch } from '~/store';
import { zipcodeToAddress } from '~/store/current-user'
import { toggleLoading } from '~/store/current-user'

import {useSelector} from "react-redux";


const ZipContainer: React.FC = (props) => {

	var code:string = "";
  
	const dispatch:Function = useAppDispatch();
	const exportCode = () => {
		dispatch(zipcodeToAddress(code));
	}


	return (
		<>
	        <style jsx>
	        {`
	          h3{
	            padding-left:4px;
	            border-left:2px solid #333;
	          }

	          input{
	          	margin-right:20px;
	          }
	        `}
	        </style>
			<h3>郵便番号から住所を取得</h3>
			<input type="text" name="zip-code" placeholder="郵便番号を入力" pattern="\d{3}-?\d{4}" onChange={ e => code = e.target.value }></input>
			<button onClick={exportCode}>変換</button>
			<p>{useSelector(state => state.currentUser.address)}</p>
		</>
	);

}


export default ZipContainer;