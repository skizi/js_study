import React, { useState } from "react";
import { connect } from 'react-redux';
import { getAddress } from '../../store/hoge/actions';
import { RootState } from '../../store';


type Props = {
	getAddress:() => void;
	address:string;
}

const Button:React.FC<Props> = (props:Props) =>{

	const [ address, setAddress ] = useState("");
	
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