import React, { useEffect, useState, useCallback } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import { asyncGetUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser, User } from '../../store/user/actions';
import { RootState } from '../../store';

import UserList from "~/components/molecules/user-list";
import UserCreator from "~/components/molecules/user-creator";
import UserEditor from "~/components/molecules/user-editor";
import UserDeletor from "~/components/molecules/user-deletor";

import useGetUser, { usePostUser } from '~/hooks/users';



const UserManager:React.FC = () =>{

	const dispatch = useDispatch();
	const users = useSelector( state => state.user.users );


	//カスタムフックの例
	useGetUser();
	const {postUser, loadingFlag } = usePostUser();


	//ユーザー作成
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


	//ユーザー情報更新
	const [ updateUser, setUpdateUser ] = useState<User>({
		name:"",
		outline:"",
		id:""
	});
	const changeEditUserHandler = useCallback(( member:Partial<User> ) =>{
		setUpdateUser({ ...updateUser, ...member });
	}, [updateUser.name, updateUser.outline, updateUser.id]);

	const clickEditUserHandler = useCallback(() =>{
		dispatch(asyncUpdateUser( updateUser.name, updateUser.outline, updateUser.id ));
	}, [updateUser.name, updateUser.outline, updateUser.id]);


	//ユーザー削除
	const [ deleteUserId, setDeleteUserId ] = useState(0);
	const clickDeleteUserHandler = useCallback(() => {
		dispatch(asyncDeleteUser(deleteUserId));
	}, [deleteUserId]);
	const changeDeleteUserHandler = useCallback((id:number) => {
		setDeleteUserId( id );
	}, [deleteUserId]);



	return(
		<div>

			{loadingFlag?(<p>loading...</p>):null}
			<button onClick={()=>postUser( "hoge", "fuga" )} >postボタン</button>
		
			<UserList users={users} clickHandler={()=>dispatch(asyncGetUsers())} />

			<UserCreator changeHandler={changeCreateUserHandler} clickHandler={clickCreateUserHandler} />

			<UserEditor changeHandler={changeEditUserHandler} clickHandler={clickEditUserHandler} />
			
			<UserDeletor changeHandler={changeDeleteUserHandler} clickHandler={clickDeleteUserHandler} />			

		</div>
	);

}

export default UserManager;