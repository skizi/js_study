import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { User, getUsers, createUser, asyncCreateUser, asyncEditUser, asyncDeleteUser } from '~/store/user/actions';
import { UserState } from '~/store/user';



export const useCreateUser = () => {

	const dispatch = useDispatch();

	const [ createUser, setCreateUser ] = useState({
		name:"",
		outline:""
	});
	const changeCreateUserHandler = useCallback(( member:Partial<User> ) =>{
		setCreateUser({ ...createUser, ...member });
	}, [createUser.name, createUser.outline] );

	const clickCreateUserHandler = useCallback(() =>{
		dispatch(asyncCreateUser( createUser.name, createUser.outline ));
	}, [createUser.name, createUser.outline]);


	return { changeCreateUserHandler, clickCreateUserHandler };

}


export const useEditUser = () => {

	const dispatch = useDispatch();

	const [ editUser, setEditUser ] = useState<User>({
		name:"",
		outline:"",
		id:""
	});
	const changeEditUserHandler = useCallback(( member:Partial<User> ) =>{
		setEditUser({ ...editUser, ...member });
	}, [editUser.name, editUser.outline, editUser.id]);

	const clickEditUserHandler = useCallback(() =>{
		dispatch(asyncEditUser( editUser.name, editUser.outline, editUser.id ));
	}, [editUser.name, editUser.outline, editUser.id]);


	return { changeEditUserHandler, clickEditUserHandler };
}


export const useDeleteUser = () => {

	const dispatch = useDispatch();

	const [ deleteUserId, setDeleteUserId ] = useState(0);
	const clickDeleteUserHandler = useCallback(() => {
		dispatch(asyncDeleteUser(deleteUserId));
	}, [deleteUserId]);

	const changeDeleteUserHandler = useCallback((id:number) => {
		setDeleteUserId( id );
	}, [deleteUserId]);

	return { clickDeleteUserHandler, changeDeleteUserHandler };
}


export const useGetUser = () =>{

	console.log("useGetUser");

	let mounted = true;
	const dispatch = useDispatch();
	const [loadingFlag, setLoadingFlag] = useState(false);
	// const users = useSelector<UserState, User[]>((state) => state.users);


	useEffect(() => {

		const load = async ():Promise<void> => {

			//loading start
			if( !mounted ) return;
			setLoadingFlag( true );

			try{

				const response = await axios.get( "/api/users" );
				
				if (mounted) {
			      const users:User[] = response.data.users;
			      dispatch(getUsers( users ));
				}

			}catch( error ){
				throw error;
			}finally{
				setLoadingFlag( false );
			}

		}

		void load();

		//メモリリーク対策
		//この戻り値の関数は、コンポーネントがアンマウントされた時に実行される
		return () => { mounted = false; };

	},[dispatch]);




	return { loadingFlag };
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

