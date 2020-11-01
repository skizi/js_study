import React, { useState, useMemo } from "react";
import { User } from '../../store/user/actions';


type Props = {
	user:User;
	changeHandler:(member:Partial<User>)=>void;
	clickHandler:( name:string, outline:string ) => void;
}

const UserCreator:React.FC = React.memo(( props:Props ) => {

	return(
		<>
			<h3>ユーザー登録</h3>
			<label htmlFor="nameInput">名前：</label><input type="text" onChange={(e)=>props.changeHandler({ name:e.target.value })} id="nameInput" />
			<label htmlFor="outlineInput">紹介文：</label><input type="text" onChange={(e)=>props.changeHandler({ outline:e.target.value })} id="outlineInput" />
			<button onClick={props.clickHandler}>ユーザー登録</button>
		</>
	);

});


export default UserCreator;