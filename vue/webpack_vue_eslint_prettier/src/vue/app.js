/* -----------------------------------------------
 * Vue本処理
 * ----------------------------------------------- */
import Vue from "vue";
import store from "./vuex/Store";
import Index from "./components/Index";

require("../sass/base.scss");

new Vue({
  el: "#app",
  store: store,
  render: (h) => h(Index),
});
