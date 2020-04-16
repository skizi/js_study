
/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
// import {router} from "../app.js"
import axios from 'axios';


Vue.use(Vuex);

const store = () => {

	return new Vuex.Store({



		actions: {
			async getData( context, params ){


				var response = await axios.get( "https://api.zipaddress.net", { params : { zipcode:params.zipcode } } ).then( response => {
					return { status:"success", data:response };
				} ).catch( error => {
					return { status:"error", data:error };
				} );


				if( response.status == "success" && response.data.data.code >= 400 ){
					response.status = "error";
				}

				return response;

			}
		}


	});

}
export default store;