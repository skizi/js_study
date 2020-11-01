import React from "react";
import UserManager from "../components/organisms/user-manager";

import axios from "axios";


type Props = {
	users:User[];
}


const Index:React.FC<Props> = ( props:Props ) =>{

	return(
		<>
			<UserManager />
		</>
	);
}


export default Index;

