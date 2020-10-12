import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/molecules/button";

import { User, getUsers, createUser } from '../store/user/actions';
import {GetServerSideProps} from "next";

import useGetUser from '~/hooks/users';
import { UserState } from '~/store/user';

import axios from "axios";


type Props = {
	users:User[];
}


const Index:React.FC<Props> = ( props:Props ) =>{

	console.log("Index render----------------");

	useGetUser();

	let [ count, setCount ] = useState( 0 );
	useEffect(() => {
		console.log("useEffect:count up");
	}, [ count ]);


	return(
		<>
			<button onClick={()=>setCount(count+1)} >Effectボタン</button>
			<Button />
		</>
	);
}


export default Index;

