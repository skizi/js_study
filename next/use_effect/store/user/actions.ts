import axios from 'axios';

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";


export type User = {
  name:string;
  outline:string;
  id:number;
}


export function getUsers( users:User[] ){
  return{
    type:"GET_USERS",
    users
  }
}

export function asyncGetUsers(){

  return async ( dispatch:Function ) => {

    try{
      const response = await axios.get( "/api/users" );

      console.log( response );
      const users:User[] = response.data.users;
      dispatch(getUsers(users));

    }catch( error ){
      throw error;
    }finally {
      //loading:false
    }

  }

}

export function createUser(user:User){
  return{
    type:"CREATE_USER",
    user
  }
}

export function asyncCreateUser( name:string, outline:string ){

  return async ( dispatch:Function ) =>{

    try{        
      const response = await axios.post( "/api/users", { params:{ name:name, outline:outline } } );

      console.log( response );

      const user:User = { name:response.data.name, outline:response.data.outline, id:response.data.id };
      dispatch(createUser( user ));

    }catch( error ){
      throw error;
    }finally {
      //loading:false
    }

  }

}



export function editUser(user:User) {
  return {
    type: 'EDIT_USER',
    user
  }
}


export function asyncEditUser(name:string, outline:string, id:number){

  return async ( dispatch:Function ) => {

    try{
      const response = await axios.put( "/api/users", { params:{ name, outline, id } } );

      console.log( response );
      const _user:User = { name:response.data.name, outline:response.data.outline, id:response.data.id };
      dispatch( editUser(_user) );

    }catch( error ){
      throw error;
    }finally {
      //loading:false
    }

  }

}


export function deleteUser(id:number){
  return {
    type:"DELETE_USER",
    id
  }
}

export function asyncDeleteUser( id:number ){
  return async ( dispatch:Function ) => {

    try{
      const response = await axios.delete( "/api/users", { params:{ id } } );

      console.log( response.data );
      dispatch( deleteUser( id ) );

    }catch(error){
      throw error;
    }finally{
      //loading:false
    }

  }

}