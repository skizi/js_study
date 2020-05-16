

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


    <form @submit.prevent="getAddress" >
        <input type="text" name="hoge" >
        <button type="submit" >test</button>
    </form>
    <p>{{address}}</p>

    <div class="thumbnails">
      <Thumbnail v-for="item in thumbnails" class="thumbnail" :title="item.title" :inner-text="item.innerText"></Thumbnail>
    </div>
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

  .thumbnails{
    display: flex;
  }
</style>


<script>
import Modal from './Modal'
import axios from 'axios';
import Thumbnail from './Thumbnail';

export default {

  name: 'Index',


  components: { Modal, Thumbnail },


  mounted(){


  },


  data: function(){

    return {
      count : 0,
      thumbnails : [
        { title:"hogeTitle0", innerText:"テキスト0" },
        { title:"hogeTitle1", innerText:"テキスト1" },
        { title:"hogeTitle2", innerText:"テキスト2" },
      ],
      address:""
    }

  },


  methods : {

    btnClick(){

      this.count++;
      this.$store.commit( 'count', this.count );

      if( this.count % 10 == 0 ){
        this.$store.commit( 'showModalFlag', true );
      }

    },
    

    getAddress( e ){

      this.$store.dispatch( "getAddress", { text:e.target.hoge.value } ).then( response => {

        if( response.status == "success" ){
          console.log( response.data );
          this.address = response.data.data.data.fullAddress;
        }else{
          alert( "error" );
        }

      } );

    },


  },

};

</script>

