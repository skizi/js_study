import React from "react";
import { useDispatch } from "react-redux";
import Button from "../components/molecules/button";

import { User, getUsers } from '../store/user/actions';
import {GetServerSideProps} from "next";


type Props = {
	users:User[];
}


const Index:React.FC<Props> = ( props:Props ) =>{

	const dispatch = useDispatch();
	dispatch(getUsers( props.users ));

	return(
		<>
			<button>hoge</button><br />
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

