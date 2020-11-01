import React from "react";
import {User} from "~/store/user/actions";


type Props = {
	users:User[]
}


const UserList:React.FC = ( props:Props ) => {
	
	return(
		<>
			<h3>ユーザー一覧</h3>
			<button onClick={props.clickHandler}>ユーザー一覧取得</button>
			<ul>
			{(()=>{
				return props.users.map(( item, i ) => {
					return (<li key={i}>name:{item.name} outline:{item.outline} id:{item.id}</li>);
				})
			})()}
			</ul>
		</>
	);

};


export default React.memo(UserList);