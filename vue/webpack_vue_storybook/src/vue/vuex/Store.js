/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';


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
