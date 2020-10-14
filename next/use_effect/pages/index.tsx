import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import UserManager from "../components/organisms/user-manager";

import { User, getUsers, createUser } from '../store/user/actions';
import {GetServerSideProps} from "next";

import useGetUser, { usePostUser } from '~/hooks/users';
import { UserState } from '~/store/user';

import axios from "axios";


type Props = {
	users:User[];
}


const Index:React.FC<Props> = ( props:Props ) =>{

	console.log("Index render----------------");

	useGetUser();
	const {postUser, loadingFlag } = usePostUser();

	let [ count, setCount ] = useState( 0 );
	useEffect(() => {
		console.log("useEffect:count up");
	}, [ count ]);


	return(
		<>
			{loadingFlag?(<p>loading...</p>):null}
			<button onClick={()=>postUser( "hoge" + count, "fuga" )} >postボタン</button>
			<button onClick={()=>setCount(count+1)} >Effectボタン</button>
			<UserManager />
		</>
	);
}


export default Index;

