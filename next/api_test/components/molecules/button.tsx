import React, { useState } from "react";
import { connect } from 'react-redux';
import { getAddress } from '../../store/hoge/actions';
import { RootState } from '../../store';

import axios from "axios";


type Props = {
	getAddress:() => void;
	address:string;
}

const Button:React.FC<Props> = (props:Props) =>{

	const [ address, setAddress ] = useState("");

	axios.get( "/api/users" ).then( response => {
		console.log(response);
	} ).catch( error => {
		console.log(error);
	} );


	axios.post( "/api/users", { params:{ name:"hogeo", outline:"mouyada" } } ).then( response => {
		console.log(response);
	} ).catch( error => {
		console.log(error);
	} );


	axios.put( "/api/users", { params:{ name:"hogeo2", outline:"mouyada2" } } ).then( response => {
		console.log(response);
	} ).catch( error => {
		console.log(error);
	} );


	axios.delete( "/api/users", { params:{ id:11 } } ).then( response => {
		console.log(response);
	} ).catch( error => {
		console.log(error);
	} );


	return(
		<>
			<input type="text" onChange={ (e)=>setAddress( e.target.value ) } />
			<button onClick={()=>props.getAddress(address)}>アドレス取得</button>
			<p>{props.address}</p>
		</>
	);

}


const mapStateToProps = (state:RootState) => {
  return { address:state.hoge.address }
};


type DispatchProps = {
    getAddress: () => any;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    getAddress:() => dispatch(getAddress('4250041'))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Button);