<template>
    <!-- 各種サムネールを書き出すコンポーネント -->
  <div>

    <!-- 案件一覧 -->
    <ul class="thumbnails" v-bind:class="{'swiper-wrapper':swiperFlag==true}">
      <li v-for="( item, index ) in works" class="thumbnail" @click="clickThumbnail(index)">
        <router-link :to="{name:'workSingle', params: {id: item.id, title:item.title}}">
        </router-link>
          <p class="title">{{item.title}}</p>
          <p class="category">{{item.category}}</p>
      </li>
    </ul>


    <input type="text" v-model="inputText"></input>
    <p>{{inputText}}</p>
  </div>
</template>


<style lang="sass">
  .thumbnails{
    display: flex;
  }

  .thumbnail{
    width:100px;
    height: 100px;
    margin: 0 10px 10px 0;
    background-color: #ff0000;
    cursor:pointer;
  }
</style>



<script>
import axios from 'axios';

export default {

  name: 'thumbnails',

  data: function(){

    return {
      hoverElement:this.$_hoverElement,
      inputText:''
    }

  },


  computed : {


  },


  mounted : function(){

  },


  methods : {

    clickThumbnail( index ){

      console.log( "click thumbnail num is..." + index );

      this.getData().then( response => {
        console.log( response );

        if( response.status == 'error' ){
          console.log( "error!" );
        }else{
          console.log( "success" );
        }

      } );

    },


    async getData(){

      var response = await axios.get( 'http://hoge1111.jp', { params:{ name:this.inputText } } ).then( response => {
          return { status : 'success', data:response };
      } ).catch( error => {
        return { status:'error', data: error };
      } );


      if( response.status == 'success' && response.data.status >= 400 ){
        response.status = 'error';
      }

      return response;

    },

  },


  props : {
    members : Array,
    works : Array,
    cacheWorks : Array,
    privateWorks : Array,
    history : Array,
    swiperFlag : Boolean,
    componentName : String
  }

}
</script>
