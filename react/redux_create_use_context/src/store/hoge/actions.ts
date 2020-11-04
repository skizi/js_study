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
