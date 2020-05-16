/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);
const store = new Vuex.Store({


	/**
	 * state
	 *
	 * 実際の状態（最新のデータ）が入ったもの。
	 * コンポーネントでいうデータのようなもの。
	 * ミューテーション以外から直接書き換えてはいけない。
	 */
	state : {
		count : 0,
		showModalFlag : false
	},


	/**
	 * mutations
	 *
	 * ステートを更新・変更させる処理を書く場所。
	 * 非同期処理を含めない。
	 */
	mutations: {

	    count( state, count ){
	    	
	      state.count = count;
	    
	    },

	    showModalFlag( state, showModalFlag ){
	    	
	      state.showModalFlag = showModalFlag;
	    
	    },

	},


	/**
	 * actions
	 *
	 * 非同期処理を行うロジック。
	 * API との通信して結果をコミットしたりコンポーネントに返すなど。
	 * ステートを操作したい場合はここからミューテーションにコミットする。
	 */
	actions: {

		async getAddress( context, params ){

			var response = await axios.get('https://api.zipaddress.net', { params:{ 'zipcode': params.zipcode } })
			.then(response => {
				return { data:response, status:"success" };
			})
			.catch(error => {
				return { data:error, status:"error" };
			});

			if( response.status == "success" && response.data.code >= 400 ){
				response.status = "error";
			}

	        return response;

		}

	},


	getters: {
	
		count: ( state ) => {
			return state.count;
		},
	
		showModalFlag: ( state ) => {
			return state.showModalFlag;
		},

	}
});
export default store;
