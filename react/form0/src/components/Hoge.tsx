import React, { useState } from "react";


const Hoge:React.FC = () =>{

	console.log("hoge------------");
	type Fuga = {
		name:string;
		title:string;
	}

	const [ fuga, setFuga ] = useState<Fuga>( {
		name:"",
		title:""
	} );


	const clickHandler = ( member:Partial<Fuga> ) => {
		
		setFuga({ ...fuga, ...member })

	}

	
	return(
		<>
			<button onClick={e=>clickHandler({ name:"よしお" })}>nameボタン</button>
			<button onClick={e=>clickHandler({ title:"いい天気" })}>titleボタン</button>
			<input onChange={e=>clickHandler({ title:e.target.value })} />
			<p>{JSON.stringify(fuga)}</p>
		</>
	);

}



export default Hoge;