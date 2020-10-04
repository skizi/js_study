import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNotificationWithTimeout, getAddress } from '../../store/hoge/actions';
import { RootState } from '../../store';




interface ButtonsProps {
  onShowNotification?: () => void,
  getAddress?: () => any,
  address:string
}


class ShowNotificationButton extends Component<ButtonsProps> {

  constructor(props:ButtonsProps){

  	super(props);

  }

  render() {
    return (
      <>
	      <button onClick={this.props.onShowNotification}>Show Notification</button>
	      <button onClick={this.props.getAddress}>Get Address</button>
	      <p>{this.props.address+""}</p>
      </>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return { address:state.hoge.address }
};


type DispatchProps = {
    onShowNotification: () => void;
    getAddress: () => any;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    onShowNotification: () => dispatch(showNotificationWithTimeout('foo')),
    getAddress:() => dispatch(getAddress('4250041'))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ShowNotificationButton);