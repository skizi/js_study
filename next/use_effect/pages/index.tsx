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

	const dispatch = useDispatch();
	// dispatch(getUsers( props.users ));

	const users = useSelector<UserState, User[]>((state) => state.user.users );
	// useGetUser( props.users );

	// const users = useSelector<UserState, User[]>((state) => state.user.users );
	// useEffect(() => {
	// 	//ユーザー登録,更新,削除するたびprops.usersが変更されると実行される
	// 	console.log("useEffect:users useSelector2");
	// }, [ users ]);

	console.log("Index render");

	return(
		<>
			<Button />
		</>
	);
}


// 先に実行される
export const getServerSideProps:GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/users', { method: 'GET' });
  const json = await res.json();
  const users = json.users;
  return { props:{ users:users } };
}



export default Index;

