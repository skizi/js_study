import React, { useState } from "react";


type Props = {
	clickHandler:( id:number ) => void;
}

const UserDeletor:React.FC = React.memo(( props:Props ) => {
	
	return(
		<>
			<h3>ユーザー削除</h3>
			<label htmlFor="idDeleteInput">名前：</label><input type="text" onChange={(e)=>props.changeHandler(e.target.value)} id="idDeleteInput" />
			<button onClick={props.clickHandler}>ユーザー削除</button>
		</>
	);

});


export default UserDeletor;