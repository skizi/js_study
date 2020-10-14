import React, { useEffect } from "react";
import { connect, useSelector } from 'react-redux';
import { asyncGetUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser, User } from '../../store/user/actions';
import { RootState } from '../../store';

import UserList from "~/components/molecules/user-list";
import UserCreator from "~/components/molecules/user-creator";
import UserEditor from "~/components/molecules/user-editor";
import UserDeletor from "~/components/molecules/user-deletor";


type Props = {
	asyncGetUsers:() => void;
	asyncCreateUser:() => void;
	asyncUpdateUser:() => void;
	asyncDeleteUser:() => void;
	users:User[];
}

const UserManager:React.FC<Props> = (props:Props) =>{

	console.log("UserManager component render----------------");

	useEffect(() => {
		//ユーザー登録,更新,削除するたびprops.usersが変更されると実行される
		console.log("useEffect:change users");
	}, [ props.users ]);

	const users = useSelector<UserState, User[]>((state) => state.user.users );
	useEffect(() => {
		//ユーザー登録,更新,削除するたびprops.usersが変更されると実行される
		console.log("useEffect:change users2");
	}, [ users ]);


	return(
		<>
			{/*
			<button onClick={()=>props.asyncGetUsers()}>ユーザー一覧取得</button>
			*/}
			<UserList users={props.users} />

			<UserCreator clickHandler={props.asyncCreateUser} />

			<UserEditor clickHandler={props.asyncUpdateUser} />
			
			<UserDeletor clickHandler={props.asyncDeleteUser} />			


			{/*<p>{JSON.stringify(users)}</p>*/}
		</>
	);

}


const mapStateToProps = (state:RootState) => {
  return { users:state.user.users }
};


type DispatchProps = {
    asyncGetUsers: () => any,
    asyncCreateUser: () => any,
    asyncUpdateUser: () => any,
    asyncDeleteUser: () => any
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    asyncGetUsers:() => dispatch(asyncGetUsers()),
	asyncCreateUser:(name:string, outline:string) => dispatch(asyncCreateUser( name, outline )),
	asyncUpdateUser:(name:string, outline:string, id:number) => dispatch( asyncUpdateUser( name, outline, id ) ),
	asyncDeleteUser:(id:number) => dispatch(asyncDeleteUser(id))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
