import React, { useEffect, useState, useCallback } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import { asyncGetUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser, User } from '../../store/user/actions';
import { RootState } from '../../store';

import UserList from "~/components/molecules/user-list";
import UserCreator from "~/components/molecules/user-creator";
import UserEditor from "~/components/molecules/user-editor";
import UserDeletor from "~/components/molecules/user-deletor";

import { useGetUser, usePostUser, useCreateUser, useEditUser, useDeleteUser } from '~/hooks/users';



const UserManager:React.FC = () =>{

	const dispatch = useDispatch();
	const users = useSelector( state => state.user.users );


	//初期ユーザー一覧ロード
	const { loadingFlag } = useGetUser();
	const {postUser } = usePostUser();


	//ユーザー作成
	const { changeCreateUserHandler, clickCreateUserHandler } = useCreateUser();

	//ユーザー情報更新
	const { changeEditUserHandler, clickEditUserHandler } = useEditUser();

	//ユーザー削除
	const { clickDeleteUserHandler, changeDeleteUserHandler } = useDeleteUser();



	return(
		<div>

			<button onClick={()=>postUser( "hoge", "fuga" )} >postボタン</button>
		
			<UserList users={users} clickHandler={()=>dispatch(asyncGetUsers())} />
			{loadingFlag?(<p>loading...</p>):null}

			<UserCreator changeHandler={changeCreateUserHandler} clickHandler={clickCreateUserHandler} />

			<UserEditor changeHandler={changeEditUserHandler} clickHandler={clickEditUserHandler} />
			
			<UserDeletor changeHandler={changeDeleteUserHandler} clickHandler={clickDeleteUserHandler} />			

		</div>
	);

}

export default UserManager;