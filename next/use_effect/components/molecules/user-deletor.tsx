import React, { useState } from "react";


type Props = {
	clickHandler:( id:number ) => void;
}

const UserDeletor:React.FC = React.memo(( props:Props ) => {
	
	console.log("UserDeletor component render----------------");

	const [ id, setId ] = useState(0);

	return(
		<>
			<h3>ユーザー削除</h3>
			<label htmlFor="idDeleteInput">名前：</label><input type="text" onChange={(e)=>setId(e.target.value)} id="idDeleteInput" />
			<button onClick={()=>props.clickHandler(id)}>ユーザー削除</button>
		</>
	);

});


export default UserDeletor;