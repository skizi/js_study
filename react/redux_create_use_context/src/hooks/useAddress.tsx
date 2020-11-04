import { useState, useRef, useEffect } from 'react';
import axios from 'axios';


export const useAddress = () => {

	const [ loadingFlag, setLoadingFlag ] = useState( false );
	const [ address, setAddress ] = useState( "" );

	//メモリリーク対策
	const mountedRef = useRef<boolean>(false);
	useEffect(() => {
		mountedRef.current = true;
		return () => { mountedRef.current = false; };
	},[]);

	const getAddress = ( zipcode:string )=>{
		const load = async ():Promise<void> => {

			setLoadingFlag( true );

		    try {

				let response = await axios.get( "https://api.zipaddress.net", { params : { zipcode:zipcode } } ).then( response => {
 					return { status:"success", data:response };
				} )

		    	if( !mountedRef.current ) return;

				if( response.data && response.data.data.code === 200 ){
				  setAddress( response.data.data.data.address );
				}else{
				  setAddress( "その住所は存在しません");
				}

		    }catch(error){
			  setLoadingFlag( false );
		      throw error
		    }finally{
		    	console.log("finally");
		      setLoadingFlag( false );
		    }

		}
		void load();
	};

	return { loadingFlag, address, getAddress };
}