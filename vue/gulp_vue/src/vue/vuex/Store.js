/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {router} from "../app.js"
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
		works : [
			{ id:0, title:'ガンスターヒーローズ', category:'action' },
			{ id:1, title:'サンダーフォース', category:'shooting' },
		],
		work : {}, //作品詳細データ
	},


	/**
	 * mutations
	 *
	 * ステートを更新・変更させる処理を書く場所。
	 * 非同期処理を含めない。
	 */
	mutations: {

	    get_works( state, works ){
	    	
	      state.works = works;
	      state.cacheWorks = works;
	    
	    },

	    get_work( state, work ){
	    
	      state.work = work;
	    
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

	    async ajax( context, property ){

	      const payload = {
	        get_works: [],
	        get_work: {},
	        get_members: {},
	        get_member: {}
	      };

	      var params = {
		  	action : property.wpActionName,
		    //secure : '<?php echo wp_create_nonce('text_test_ajax ') ?>'
		  };
		  if( property.wpActionName == 'get_work' || property.wpActionName == 'get_member' ){
		  	params.id = property.id;
		  }

	      await axios.get(
	      	Vue.prototype.$_wpAjaxUrl, {
			  params: params
			},
			{ headers: { 'Content-Type': 'application/json' } }
	      ).then((res) => {

			payload[property.wpActionName] = res.data;

	      });

		  context.commit( property.wpActionName, payload[property.wpActionName] );

	    },

	},


	getters: {
	
		works: ( state ) => {
			return state.works;
		},

		work: ( state ) => {
			return state.work;
		},

	}
});
export default store;
