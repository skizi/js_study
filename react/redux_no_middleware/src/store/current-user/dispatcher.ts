import axios from 'axios';
import {
  CHANGE_USER_ADDRESS_START,
  CHANGE_USER_ADDRESS_FINISH,
  CHANGE_USER_ADDRESS,
  changeUserAddress,
  changeUserName
} from './actions';


export default class Dispatcher {

  dispatch: (action: any) => any;


  constructor(dispatch: (action: any) => any) {
    this.dispatch = dispatch
  }


  changeUserName( name:string ){

    this.dispatch(changeUserName( name ));
  
  }


  async changeUserAddress( zipcode:string ): Promise<void> {

    this.dispatch({type: CHANGE_USER_ADDRESS_START});

    try {

      let response = await axios.get( "https://api.zipaddress.net", { params : { zipcode:zipcode } } ).then( response => {
        return { status:"success", data:response };
      } ).catch( error => {
        return { status:"error", data:error };
      } );

      if( response.status == "success" && response.data.data.code == "200" ){
        console.log( changeUserAddress(response.data.data.data.address) );
        this.dispatch(changeUserAddress(response.data.data.data.address));
      }else{
        console.log( "その住所は存在しません" );
      }

    }catch(error){
      throw error
    } finally {
      this.dispatch({type: CHANGE_USER_ADDRESS_FINISH})
    }

  }

}