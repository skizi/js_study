import axios from 'axios';

export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_USER_ADDRESS_START = "CHANGE_USER_ADDRESS_START";
export const CHANGE_USER_ADDRESS_FINISH = "CHANGE_USER_ADDRESS_FINISH";
export const CHANGE_USER_ADDRESS = "CHANGE_USER_ADDRESS";


export function changeUserName(name:string) {
  return {
    type: 'CHANGE_USER_NAME',
    name
  }
}


export function changeUserAddress(address:string) {
  return {
    type: 'CHANGE_USER_ADDRESS',
    address
  }
}