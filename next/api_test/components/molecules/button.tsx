import React, { useState } from "react";
import { connect } from 'react-redux';
import { asyncGetUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser, User } from '../../store/user/actions';
import { RootState } from '../../store';

import axios from "axios";


type Props = {
	asyncGetUsers:() => void;
	asyncCreateUser:() => void;
	asyncUpdateUser:() => void;
	asyncDeleteUser:() => void;
	users:User[];
}

const Button:React.FC<Props> = (props:Props) =>{

	const [ name, setName ] = useState("");
	const [ outline, setOutline ] = useState("");
	const [ id, setId ] = useState(0);

	return(
		<>
			<button onClick={()=>props.asyncGetUsers()}>ユーザー一覧取得</button>
			<ul>
			{(()=>{
				return props.users.map(( item, i ) => {
					return (<li key={i}>name:{item.name} outline:{item.outline} id:{item.id}</li>);
				})
			})()}
			</ul>


			<h3>ユーザー登録</h3>
			<label htmlFor="nameInput">名前：</label><input type="text" onChange={(e)=>setName(e.target.value)} id="nameInput" />
			<label htmlFor="outlineInput">紹介文：</label><input type="text" onChange={(e)=>setOutline(e.target.value)} id="outlineInput" />
			<button onClick={()=>props.asyncCreateUser(name, outline)}>ユーザー登録</button>


			<h3>ユーザー情報更新</h3>
			<label htmlFor="nameUpdateInput">名前：</label><input type="text" onChange={(e)=>setName(e.target.value)} id="nameUpdateInput" />
			<label htmlFor="outlineUpdateInput">紹介文：</label><input type="text" onChange={(e)=>setOutline(e.target.value)} id="outlineUpdateInput" />
			<label htmlFor="idUpdateInput">id：</label><input type="text" onChange={(e)=>setId(e.target.value)} id="idUpdateInput" />
			<button onClick={()=>props.asyncUpdateUser(name, outline, id)}>ユーザー登録</button>


			<h3>ユーザー削除</h3>
			<label htmlFor="idDeleteInput">名前：</label><input type="text" onChange={(e)=>setId(e.target.value)} id="idDeleteInput" />
			<button onClick={()=>props.asyncDeleteUser(id)}>ユーザー削除</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Button);