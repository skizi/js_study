/* -----------------------------------------------
 * Vue本処理
 * ----------------------------------------------- */
import Vue from 'vue';
import store from './vuex/Store';
import router from './router';
import Index from './components/index';

  
const app = new Vue({
  el: '#app',
  router : router,
  store : store,
  render: h => h(Index),
});


