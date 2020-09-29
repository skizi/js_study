import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../store/current-user';
import { RootState } from '../../store';

import Dispatcher from '../../store/current-user/dispatcher';




interface ButtonsProps {
  actions: Dispatcher
  name:string,
  address:string
}

class Button extends Component<ButtonsProps>{

	dispatcher:Dispatcher;
	zipcode:string;

	constructor(props:ButtonsProps){

		super(props);

	}


	render(){
		return(
			<>
				<button onClick={()=>this.props.actions.changeUserName( 'yoshida' )}>ボタン</button>
				<p>{this.props.name}</p>
				<button onClick={()=>this.props.actions.changeUserAddress( this.zipcode )}>住所変更</button>
				<input type="text" onChange={ e => this.zipcode = e.target.value } />
				<p>{this.props.address}</p>
			</>
		);
	}

}


type StateProps = {
	name : string,
	address : string
}

const mapStateToProps = (state:RootState):StateProps => {
  return {
  	name:state.user.name,
  	address:state.user.address
  }
};


type DispatchProps = {
    actions: Dispatcher
};

const mapDispatchToProps = (dispatch:(action: any) => any):DispatchProps => {
  return {
  	actions: new Dispatcher( dispatch )
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Button);

