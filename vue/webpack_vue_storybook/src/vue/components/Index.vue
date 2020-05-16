

<template>
  <div class="wrapper">
    <main>
      <section>
      
        <h2>Vue.jsカウンター</h2>
        <p>{{count}}</p>
        <button @click="btnClick()">カウントアップ</button>
        {{$store.getters.count}}

      </section>

      <section>
        <h2>郵便番号 to 住所</h2>
        <form @submit.prevent="getAddress" >
            <input type="text" name="zipcode" v-model="zipcode">
            <button type="submit" >submit</button>
        </form>
        <p>{{address}}</p>
      </section>

      <section>
        <h2>サムネールコンポーネント</h2>
        <div class="thumbnails">
          <Thumbnail v-for="item in thumbnails" class="thumbnail" :title="item.title" :inner-text="item.innerText"></Thumbnail>
        </div>
      </section>
     </main>
    <Modal v-if="$store.getters.showModalFlag"></Modal>

    
  </div>
</template>


<style lang="scss">
  .wrapper{
    section{
      margin-bottom: 50px;
    }

    .thumbnails{
      display: flex;
    }
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

    var array = [ 3, 1, 2 ];
    var array2 = array.sort(( a, b )=>{
      return a - b;
    });
    console.log( array2 );



    var array3 = [ { time:4 }, { time:1 }, { time:3 } ];
    var array4 = array3.sort(( a, b )=>{
      return a.time - b.time;
    });
    console.log( array4 );

  },


  data: function(){

    return {
      count : 0,
      thumbnails : [
        { title:"hogeTitle0", innerText:"テキスト0" },
        { title:"hogeTitle1", innerText:"テキスト1" },
        { title:"hogeTitle2", innerText:"テキスト2" },
      ],
      zipcode:"",
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

      //e.target.zipcode.value
      this.$store.dispatch( "getAddress", { zipcode:this.zipcode } ).then( response => {

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

