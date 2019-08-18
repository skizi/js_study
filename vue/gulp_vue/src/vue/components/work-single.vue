<template>
  <div class="container container-workSingle">
    <h2 class="container__title">{{works[$route.params.id].title}}</h2>
    <p>{{works[$route.params.id].category}}</p>
  </div>
</template>


<style lang="sass">
  @import "../../sass/import/_vars.scss";
</style>


<script>
  
import thumbnails from './thumbnails.vue'
import Vue from 'vue';
// var loadFlag = false;


export default {

  name: 'workSingle',

  components: {  },


  data: function(){
    return {
      hoverElement:this.$_hoverElement
    }
  },


  computed : {


  },


  mounted : function(){

  },

  methods: {



  },


  watch: {

    work : function( to, from ){

    },


  },


  props : {
    works : Array,
  }


}
</script>
