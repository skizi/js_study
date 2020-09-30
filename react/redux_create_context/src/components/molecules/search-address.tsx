import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNotificationWithTimeout, getAddress } from '../../store/hoge/actions';
import { HogeState } from '../../store/hoge';
import { RootState } from '../../store';

import Button from '../atoms/button';
import NewsText from '../atoms/news-text';



interface ButtonsProps {
  onShowNotification: () => void,
  getAddress: (zipcode:string) => void,
  address:string
}


const ShowNotificationButton:React.FC<ButtonsProps> = (props)=>{

	var zipcode = "";
	
	return (
		<>
      <h4>郵便番号を入力してね！（ハイフン無しで）</h4>
			<input type="text" required onChange={(e)=> zipcode = e.target.value } />
      <Button getAddress={()=>props.getAddress(zipcode)}>検索</Button>
			<p>{props.address}</p>
      <NewsText />
		</>
	);

}


const mapStateToProps = (state:RootState) => {
  return { address:state.hoge.address }
};


type DispatchProps = {
    onShowNotification: () => void;
    getAddress: (zipcode:string) => void;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    onShowNotification: () => dispatch(showNotificationWithTimeout('foo')),
    getAddress:(zipcode:string) => dispatch(getAddress(zipcode))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ShowNotificationButton);