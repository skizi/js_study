import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNotificationWithTimeout } from '../../store/hoge/actions';
import { State } from '../../store/hoge';




interface ButtonsProps {
  onShowNotification?: () => void
}


class ShowNotificationButton extends Component<ButtonsProps> {

  constructor(props:ButtonsProps){

  	super(props);

  }

  render() {
    return (
      <button onClick={this.props.onShowNotification}>Show Notification</button>
    )
  }
}

const mapStateToProps = (state:State) => {
  return { state }
};


type DispatchProps = {
    onShowNotification: () => void;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    onShowNotification: () => dispatch(showNotificationWithTimeout('foo'))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ShowNotificationButton);