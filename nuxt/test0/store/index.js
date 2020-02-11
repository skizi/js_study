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

		/**
		 * state
		 *
		 * 実際の状態（最新のデータ）が入ったもの。
		 * コンポーネントでいうデータのようなもの。
		 * ミューテーション以外から直接書き換えてはいけない。
		 */
		state : {
			hoge : 'hogeStr',
		},


		/**
		 * mutations
		 *
		 * ステートを更新・変更させる処理を書く場所。
		 * 非同期処理を含めない。
		 */
		mutations: {

			hoge( state, hoge ){
				
		      state.hoge = hoge;

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

		    async getMessage( context, params ){

		      // params.callback = "jsonData";

		      const response = await axios.get( '/api/search', 
		        {
		          headers: {
		            'content-type': 'multipart/form-data',
		          },
		          params : params,
		          validateStatus: status => {
		            return status < 300;
		          },
		        }
		      ).catch( err => {
				return 'error';
			  });

	          if( response.status < 300 ){
	            return response.data;
	          }else{
	            return 'error';
	          }

		    },

		},


		getters: {

			hoge: ( state ) =>{
				return state.hoge;
			},

		}
	});
}
export default store;
