import React from "react";
import Button from "../components/molecules/button";

import { User, getUsers } from '../store/user/actions';
import {GetServerSideProps} from "next";

import { UserState } from '~/store/user';
import { initializeStore } from '~/store'



type Props = {
	users:User[];
}


const Index:React.FC<Props> = ( props:Props ) =>{

	console.log("Index render-------------");

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

  //コンポーネント外なのでuseMemoを含むuseStoreは実行できないので、initializeStoreを直に実行している。
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  dispatch( getUsers( users ) );

  return { props:{ initialReduxState:{ user:{ users } } } };
}



export default Index;

