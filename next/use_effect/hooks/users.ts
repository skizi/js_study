import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { User, getUsers } from '~/store/user/actions';
import { UserState } from '~/store/user';


// type ReturnValue = {
// 	users:User[];
// }


const useGetUser = () =>{

	console.log("useGetUser");

	let isUnmounted = false;
	const dispatch = useDispatch();
	const users = useSelector<UserState, User[]>((state) => state.users);


	useEffect(() => {

		const load = async ():Promise<void> => {

			//loading start

			try{

				const response = await axios.get( "/api/users" );
				
				if (!isUnmounted) {
			      const users:User[] = response.data.users;
			      dispatch(getUsers( users ));
				}

			}catch( error ){
				throw error;
			}finally{
				//loading end
			}

		}

		void load();

		//メモリリーク対策
		//この戻り値の関数は、コンポーネントがアンマウントされた時に実行される
		return () => { isUnmounted = true; };

	},[]);


	return {users};
}

export default useGetUser;