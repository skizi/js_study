import Vue from "vue"
import addressStore from "./store"
import AddressContainer from "./AddressContainer"
import nuxtConfig from "~/nuxt.config"

export default async function(context, inject) {

  let Address = Vue.extend({
    
    data() {
      return {
      }
    },

    mounted() {
    },
    methods: {

      // async getAddress( code ){

      //   let result = await context.store.dispatch( 'address/getAddress', { code:this.code } ).then( result => {
            
      //       return result;

      //   });

      //   return result;

      // },

    },

    // render(h) {
    //   return h("div")
    // }
  });
  

  context.app.router.addRoutes([
    {
      path: "/address",
      component: Address
    }
  ])

  context.store.registerModule("address", addressStore)
  inject("address", new Address())

  Vue.component("AddressContainer", AddressContainer)
}
