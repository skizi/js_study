<template>
  <div>
    <main>
      <div class="wrapper">
      
        <h1>Vue.jsカウンター</h1>
        <p v-html="count"></p>
        <button @click="btnClick()">カウントアップ</button>
        {{$store.getters.count}}

      </div>
     </main>


     <Modal v-if="$store.getters.showModalFlag"></Modal>
    
  </div>
</template>


<style lang="scss">
  .wrapper{
    padding:50px;

    h1{
      margin-bottom:20px;
    }

  }
</style>


<script>
import Modal from './Modal'

module.exports = {

  name: 'Index',


  components: { Modal },


  mounted(){


  },


  data: function(){

    return {
      count : 0
    }

  },


  methods : {

    btnClick(){

      this.count++;
      this.$store.commit( 'count', this.count );

      if( this.count % 10 == 0 ){
        this.$store.commit( 'showModalFlag', true );
      }

    }

  },

};

</script>

