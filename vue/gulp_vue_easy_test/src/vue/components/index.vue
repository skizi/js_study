<template>
  <div>
    <main>
      <div class="wrapper">
     
        <router-view name="common" />
        <router-view :works="$store.getters.works"" />

      </div>
     </main>
    
  </div>
</template>



<script>
import Vue from 'vue';


module.exports = {

  name: 'Index',

  mounted: function() {


  },


  watch: {
    

  },


  props : {
  }

};

</script>

