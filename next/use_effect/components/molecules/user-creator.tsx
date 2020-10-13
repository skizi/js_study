import React, { useState } from "react";


type Props = {
	clickHandler:( name:string, outline:string ) => void;
}

const UserCreator:React.FC = React.memo(( props:Props ) => {

	console.log("UserCreator component render----------------");

	const [ name, setName ] = useState("");
	const [ outline, setOutline ] = useState("");


	return(
		<>
			<h3>ユーザー登録</h3>
			<label htmlFor="nameInput">名前：</label><input type="text" onChange={(e)=>setName(e.target.value)} id="nameInput" />
			<label htmlFor="outlineInput">紹介文：</label><input type="text" onChange={(e)=>setOutline(e.target.value)} id="outlineInput" />
			<button onClick={()=>{
				props.clickHandler(name, outline);
			} }>ユーザー登録</button>
		</>
	);

});


export default UserCreator;