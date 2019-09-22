<template>
    <!-- 各種サムネールを書き出すコンポーネント -->

    <!-- 案件一覧 -->
    <ul class="thumbnails" v-bind:class="{'swiper-wrapper':swiperFlag==true}" v-else-if="works">
      <li v-for="item in works" class="thumbnail">
        <router-link :to="{name:'workSingle', params: {id: item.id, title:item.title}}">
          <p class="title">{{item.title}}</p>
          <p class="category">{{item.category}}</p>
        </router-link>
      </li>
    </ul>


</template>


<style lang="sass">
  @import "../../sass/import/_vars.scss";
  @import "../../sass/import/_thumbnails.scss";
</style>



<script>
export default {

  name: 'thumbnails',

  data: function(){

    return {
      hoverElement:this.$_hoverElement
    }

  },


  computed : {


  },


  mounted : function(){

  },


  methods : {

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
