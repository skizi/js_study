
import axios from "axios";


export const state = () => ({
  loading: true
})

export const actions = {

      async getAddress( context, params ){

        let response = await axios.get( "https://api.zipaddress.net", { params : { zipcode:params.code } } ).then( response => {

          return { status : "success", data:response };

        } ).catch( error => {

          return { status : "error", data:error };

        } );

        return response;

      },

}

export default {
  state,
  actions,
  namespaced: true
}
