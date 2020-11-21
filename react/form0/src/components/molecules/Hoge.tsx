import React, { useState } from "react";




const Hoge:React.FC = () =>{

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
			<button onClick={e=>clickHandler({ name:"よしお" })} data-testid="nameBtn">nameボタン</button>
			<button onClick={e=>clickHandler({ title:"いい天気" })} data-testid="titleBtn">titleボタン</button>
			<input onChange={e=>clickHandler({ title:e.target.value })} data-testid="titleInput" />
			<p data-testid="nameText">{fuga.name}</p>
			<p data-testid="titleText">{fuga.title}</p>
		</>
	);

}



export default Hoge;