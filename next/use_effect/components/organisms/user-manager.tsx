import React, { useEffect, useState, useCallback } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import { asyncGetUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser, User } from '../../store/user/actions';
import { RootState } from '../../store';

import UserList from "~/components/molecules/user-list";
import UserCreator from "~/components/molecules/user-creator";
import UserEditor from "~/components/molecules/user-editor";
import UserDeletor from "~/components/molecules/user-deletor";



const UserManager:React.FC = () =>{

	const dispatch = useDispatch();
	const users = useSelector( state => state.user.users );


	//ユーザー作成
	const [ createUser, setCreateUser ] = useState({
		name:"",
		outline:""
	});
	const changeCreateUserHandler = useCallback(( member:Partial<User> ) =>{
		setCreateUser({ ...createUser, ...member });
	}, [createUser.name, createUser.outline] );
	const createUserHandler = useCallback(() =>{
		dispatch(asyncCreateUser( createUser.name, createUser.outline ));
	}, [createUser.name, createUser.outline]);


	//ユーザー情報更新
	const [ updateUser, setUpdateUser ] = useState<User>({
		name:"",
		outline:"",
		id:""
	});
	const changeUpdateUserHandler = useCallback(( member:Partial<User> ) =>{
		setUpdateUser({ ...updateUser, ...member });
	}, [updateUser.name, updateUser.outline, updateUser.id]);

	const updateUserHandler = useCallback(() =>{
		dispatch(asyncUpdateUser( updateUser.name, updateUser.outline, updateUser.id ));
	}, [updateUser.name, updateUser.outline, updateUser.id]);


	//ユーザー削除
	const [ deleteId, setDeleteId ] = useState(0);
	const deleteUserHandler = useCallback(() => {
		dispatch(asyncDeleteUser(deleteId));
	}, [deleteId]);
	const deleteChangeHandler = useCallback((id:number) => {
		setDeleteId( id );
	}, [deleteId]);


	return(
		<div>

			<button onClick={()=>dispatch(asyncGetUsers())}>ユーザー一覧取得</button>

			<UserList users={users} />

			<UserCreator changeHandler={changeCreateUserHandler} clickHandler={createUserHandler} />

			<UserEditor changeHandler={changeUpdateUserHandler} clickHandler={updateUserHandler} />
			
			<UserDeletor clickHandler={deleteUserHandler} changeHandler={deleteChangeHandler} />			

		</div>
	);

}

export default UserManager;