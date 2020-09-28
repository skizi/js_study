import axios from 'axios';

export const CHANGE_USER_NAME = "CHANGE_USER_NAME";


export function changeUserName(name:string) {
  return {
    type: 'CHANGE_USER_NAME',
    name
  }
}