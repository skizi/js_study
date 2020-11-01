import React, { useState, useMemo } from "react";
import { User } from '../../store/user/actions';


type Props = {
	user:User;
	onChange:( member:Partial<User> ) => void;
	clickHandler:() => void;
}

const UserEditor:React.FC = ( props:Props ) => {
	
	return(
		<>
			<h3>ユーザー情報更新</h3>
			<label htmlFor="nameUpdateInput">名前：</label><input type="text" onChange={(e)=>props.changeHandler({ name:e.target.value })} id="nameUpdateInput" />
			<label htmlFor="outlineUpdateInput">紹介文：</label><input type="text" onChange={(e)=>props.changeHandler({ outline:e.target.value })} id="outlineUpdateInput" />
			<label htmlFor="idUpdateInput">id：</label><input type="text" onChange={(e)=>props.changeHandler({ id:e.target.value })} id="idUpdateInput" />
			<button onClick={props.clickHandler}>ユーザー登録</button>
		</>
	)

};


export default React.memo(UserEditor);