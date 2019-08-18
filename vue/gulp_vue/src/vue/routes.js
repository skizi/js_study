import header from './components/header';
import work from './components/work';
import workSingle from './components/work-single';

import store from './vuex/Store'


export default [
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
]
