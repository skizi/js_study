<template>
  <header class="header" v-bind:class="componentName">
    <router-link to="/">
      <h1>メガドライブ　データベース</h1>
    </router-link>
  </header>
</template>


<style lang="sass" scoped>
  @import "../../sass/import/_vars.scss";
  @import "../../sass/import/_header.scss";
</style>


<script>

var menuOpenFlag = false;
var menuBtnEnabledFlag = true;
var $tagContainer;
var $tags;

export default {
  name: 'CommonHeader',

  data: function(){
    return {
      searchText : ''
    }
  },

  mounted : function(){

  },




  methods : {


  },


  watch : {


  },


  props : {
  }


}

</script>


