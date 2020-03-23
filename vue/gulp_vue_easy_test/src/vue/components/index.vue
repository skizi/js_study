<template>
  <div>
    <main>
      <section class="wrapper">
        <Header></Header>
        <router-view name="common" />
        <router-view :works="$store.getters.works"" />
        <Footer name="hogege"></Footer>
      </section>
     </main>
    
  </div>
</template>



<script>
import Vue from 'vue';
import Header from './header';
import Footer from './footer';


module.exports = {

  name: 'Index',

  components : { Header, Footer },

  mounted: function() {


  },


  watch: {
    

  },


  props : {
  }

};

</script>

