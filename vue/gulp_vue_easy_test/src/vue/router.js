import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/Store'
import header from './components/header';
import work from './components/work';
import workSingle from './components/work-single';


Vue.use( VueRouter );




var is_debug_console = false; // コンソールのON/OFF
var is_devmode = Boolean(document.domain == 'localhost'); // VUEのモードを切り替える
var router_mode = (is_devmode)? 'hash' : 'history';



export default new VueRouter({
	mode: router_mode,
	// mode: 'hash',
  // mode: 'history',
	routes: [
		{
			path: "/",
			name: "index",
			components: {
				common: header,
				default: work,
			},
			props : true,
		},
		{
			path: "/work",
			name: "work",
			components: {
				common: header,
				default: work,
			},
			props : true,
		},
		{
			path: '/work/:id',
			name: "workSingle",
			props : true,
			components: {
				common: header,
				default: workSingle,
			},
		},
	],
});
