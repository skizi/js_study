<template>
    <!-- 各種サムネールを書き出すコンポーネント -->
  <div>

    <!-- 案件一覧 -->
    <ul class="thumbnails" v-bind:class="{'add-class':classTestFlag==true}">
      <li v-for="( item, index ) in works" class="thumbnail" @click="clickThumbnail(index)">
        <router-link :to="{name:'workSingle', params: {id: item.id, title:item.title}}">
        </router-link>
          <p class="title">{{computedTitle( item.title )}}</p>
          <p class="category">{{item.category}}</p>
      </li>
    </ul>

    <input type="text" v-model="inputText"></input>
    <p>{{inputText}}</p>

    <hr>

    <div>
      <p v-html="htmlText"></p>
    </div>

    <ul v-for="item in errors" class="error-text">
      <li>{{item}}</li>
    </ul>
    <!--<button>test</button>-->
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

  .error-text{
    background-color: #ff0000;

    li{
      border-bottom: 1px solid #ddd;
    }
  }
</style>



<script>
import axios from 'axios';

export default {

  name: 'thumbnails',

  data: function(){

    return {
      hoverElement:this.$_hoverElement,
      inputText:'',
      classTestFlag : true,
      htmlText:'',
      errors:[]
    }

  },


  computed : {

    computedTitle(){

      return titleStr => {

        return titleStr + "99";

      };

    } 

  },


  mounted : function(){

    this.htmlText = "山田<br>田中"
    this.errors = [ "だめ", "NG", "ぼけ" ];

  },


  methods : {

    clickThumbnail( index ){

      console.log( "click thumbnail num is..." + index );

    },


  },


  props : {
    works : Array
  }

}
</script>
