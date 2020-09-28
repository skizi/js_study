import axios from 'axios';

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";
export const SET_ADDRESS = "SET_ADDRESS";


function showNotification(id:any, text:string) {
  return {
    type: 'SHOW_NOTIFICATION',
    id,
    text
  }
}
function hideNotification(id:any) {
  return {
    type: 'HIDE_NOTIFICATION',
    id
  }
}
function setAddress(address:string) {
  return {
    type: 'SET_ADDRESS',
    address
  }
}

let nextNotificationId = 0;
export function showNotificationWithTimeout(text:string) {
  return function (dispatch:Function):void {
    const id:number = nextNotificationId++;
    dispatch(showNotification(id, text));

    setTimeout(() => {
      dispatch(hideNotification(id));
    }, 1000)
  }
}


export function getAddress( zipcode:string ){

  return async (dispatch:Function) => {

    try {

      let response = await axios.get( "https://api.zipaddress.net", { params : { zipcode:zipcode } } ).then( response => {
        return { status:"success", data:response };
      } ).catch( error => {
        return { status:"error", data:error };
      } );

      if( response.status == "success" ){
        console.log( setAddress(response.data.data.data.address) );
        dispatch(setAddress(response.data.data.data.address));
      }else{
        //
      }

    }catch(error){
      throw error
    }

  }

}