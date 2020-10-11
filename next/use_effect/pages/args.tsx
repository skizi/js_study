import React from "react";
import { GetServerSideProps } from 'next';
import { User } from "~/store/user/actions";


type Props = {
	users:User[];
}

const Args:React.FC<Props> = ( props:Props ) =>{
	
	return(
		<>
			<h3>Args</h3>
			<pre>{JSON.stringify(props.users)}</pre>
		</>
	);

}


export default Args;


// 先に実行される
export const getServerSideProps:GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/users', { method: 'GET' });
  const json = await res.json();
  const users = json.users;
  return { props:{ users:users } };
}

