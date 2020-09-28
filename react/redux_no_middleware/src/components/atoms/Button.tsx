import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../store/current-user';
import { RootState } from '../../store';
import { changeUserName } from '../../store/current-user/actions';




interface ButtonsProps {
  changeUserName?: () => void,
  name:string
}

class Button extends Component<ButtonsProps>{

	render(){
		return(
			<>
				<button onClick={this.props.changeUserName}>ボタン</button>
				<p>{this.props.name}</p>
			</>
		);
	}

}


const mapStateToProps = (state:RootState) => {
  return { name:state.user.name }
};


type DispatchProps = {
    changeUserName: () => void;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    changeUserName:() => dispatch(changeUserName('yoshio'))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Button);

