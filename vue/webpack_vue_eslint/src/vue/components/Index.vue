<template>
  <div>
    <main>
      <div class="wrapper">
      
        <h1>Vue.jsカウンター</h1>
        <p v-html="count"></p>
        <button @click="btnClick()">
          カウントアップ
        </button>
        {{ $store.getters.count }}

      </div>
     </main>


    <form @submit.prevent="postAxiosForm" >
        <input type="text" name="hoge" >
        <button type="submit" >test</button>
    </form>
    
     <img src="/assets/img/db3ec985ddafea6bed1cb04b95337a95_600.jpg">

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
import Modal from "./Modal";
import axios from "axios";

export default {

  name: "Index",


  components: { Modal },


  mounted(){


  },


  data: function(){

    return {
      count : 0
    };

  },


  methods : {

    btnClick(){

      this.count++;
      this.$store.commit( "count", this.count );

      if( this.count % 10 == 0 ){
        this.$store.commit( "showModalFlag", true );
      }

    },

    postJson( e ){

      var data = {
        hoge : e.target.hoge.value
      };
      const headers = {
        "Content-Type": "application/json"
      };

      fetch("https://example.com/profile/avatar", {
        method: "POST",
        body: JSON.stringify(data),
        headers : headers
      })
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));

    },

    postForm( e ){

      var formData = new FormData();
      formData.append("hoge", e.target.hoge.value);

      fetch("https://example.com/profile/avatar", {
        method: "POST",
        body: formData
      })
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));

    },

    getJson( e ){

      let params = new URLSearchParams();
      params.set("hoge", e.target.hoge.value);

      fetch("https://example.com/profile/avatar?" + params.toString())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));

    },


    postAxiosJson( e ){
      
      var data = {
        hoge : e.target.hoge.value
      };

      axios.post("https://example.com/profile/avatar", data )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    },


    postAxiosForm( e ){
      
      var formData = new FormData();
      formData.append("hoge", e.target.hoge.value);

      axios.post("https://example.com/profile/avatar", formData )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    },


    getAxios( e ){
      
      let params = new URLSearchParams();
      params.set("hoge", e.target.hoge.value);

      axios.get("https://example.com/profile/avatar?" + params.toString())
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    },

  },

};

</script>

