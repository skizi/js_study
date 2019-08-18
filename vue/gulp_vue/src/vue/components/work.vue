
<template>
  <div class="container container-workTop">
    <div class="container__inner">
      <div class="container__lists__drag">

        <h2>work</h2>
        <thumbnails :works="$store.getters.works" />

      </div>
    </div>
    
  </div>
</template>


<style lang="sass">
</style>


<script>

import thumbnails from './thumbnails.vue'

export default {

  name: 'work',

  components: { thumbnails },
  
  data: function(){
    return {
    }
  },


  mounted : function(){

  },




  methods:{

  },


  watch: {


  },


  props : {
    works : Array,
    componentName : String,
    initLogoAnimStatus : String,
    workFilter : Object,
    showWorkThumbnailLength : Number,
    cacheWorkMaxLength : Number
  }
  
}
</script>
