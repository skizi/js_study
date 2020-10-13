import React, { useState } from "react";


type Props = {
	clickHandler:( name:string, outline:string, id:number ) => void;
}

const UserEditor:React.FC = React.memo(( props:Props ) => {
	
	console.log("UserEditor component render----------------");

	const [ id, setId ] = useState(0);
	const [ name, setName ] = useState("");
	const [ outline, setOutline ] = useState("");
	
	return(
		<>
			<h3>ユーザー情報更新</h3>
			<label htmlFor="nameUpdateInput">名前：</label><input type="text" onChange={(e)=>setName(e.target.value)} id="nameUpdateInput" />
			<label htmlFor="outlineUpdateInput">紹介文：</label><input type="text" onChange={(e)=>setOutline(e.target.value)} id="outlineUpdateInput" />
			<label htmlFor="idUpdateInput">id：</label><input type="text" onChange={(e)=>setId(e.target.value)} id="idUpdateInput" />
			<button onClick={()=>props.clickHandler(name, outline, id)}>ユーザー登録</button>
		</>
	);

});


export default UserEditor;