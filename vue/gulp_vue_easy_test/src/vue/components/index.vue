<template>
  <div>
    <main>
      <section class="wrapper">
        <Header></Header>
        <!--<router-view name="common" />-->
        <router-view :works="$store.getters.works"" />
        <TestForm></TestForm>
        <Footer name="hogege"></Footer>
      </section>
     </main>
    
  </div>
</template>



<script>
import Vue from 'vue';
import Header from './header';
import Footer from './footer';
import TestForm from './test-form';

module.exports = {

  name: 'Index',

  components : { Header, Footer, TestForm },

  mounted: function() {


  },


  watch: {
    

  },


  props : {
  }

};

</script>

