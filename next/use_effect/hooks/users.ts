import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { User, getUsers, createUser } from '~/store/user/actions';
import { UserState } from '~/store/user';


// type ReturnValue = {
// 	users:User[];
// }


const useGetUser = () =>{

	console.log("useGetUser");

	let mounted = true;
	const dispatch = useDispatch();
	// const users = useSelector<UserState, User[]>((state) => state.users);


	useEffect(() => {

		const load = async ():Promise<void> => {

			//loading start
			if( !mounted ) return;

			try{

				const response = await axios.get( "/api/users" );
				
				if (mounted) {
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
		return () => { mounted = false; };

	},[dispatch]);




	// return {users};
}



export const usePostUser = () =>{

	console.log("usePostUser");

  	const mountedRef = useRef<boolean>(false);
	const dispatch = useDispatch();
	const [loadingFlag, setLoadingFlag] = useState(false);


	//メモリリーク対策
	useEffect(() => {

		mountedRef.current = true;
		return () => { mountedRef.current = false; };

	},[]);


	const postUser = useCallback(( name:string, outline:string )=>{

		const load = async ():Promise<void> => {

			//loading start
			if( !mountedRef.current ) return;

			setLoadingFlag( true );
			try{

				const response = await axios.post( "/api/users", { params:{ name, outline } } );
				const user:User = { name:response.data.name, outline:response.data.outline, id:response.data.id };
				dispatch(createUser( user ));

			}catch( error ){
				throw error;
			}finally{
				//loading end
				setLoadingFlag( false );
			}

		}

		void load();

	}, []);



	return { postUser, loadingFlag };
}

export default useGetUser;