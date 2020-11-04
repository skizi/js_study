import React, { Component, useMemo } from 'react';
import { connect } from 'react-redux';
import { HogeState } from '../../store/hoge';

import Button from '../atoms/button';
import NewsText from '../atoms/news-text';



type Props = {
  address:string;
  clickHandler:(zipcode:string)=>void;
  loadingFlag:boolean;
}

const ShowNotificationButton:React.FC<Props> = (props:Props)=>{

	var zipcode = "";
	
  return useMemo(()=>{
  	return (
  		<div>
        <h4>郵便番号を入力してね！</h4>
  			<input type="text" required onBlur={(e)=> zipcode = e.target.value } />
        <Button getAddress={()=>props.clickHandler(zipcode)}>検索</Button>
        {props.loadingFlag ? <p>loading...</p> : <></> }
  			<p>{props.address}</p>
        <NewsText />
  		</div>
  	);
  }, [props.address, zipcode, props.loadingFlag]);

}



export default ShowNotificationButton;