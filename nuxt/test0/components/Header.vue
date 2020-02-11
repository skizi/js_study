<template>
  <header>
    <h1>Header</h1>
    <!--
  	<p>{{hoge}}</p>
  	<button @click="clickBtn">btn</button><br><br>

  	<input type="text" v-model="code"></input>
  	<button @click="clickBtn2">btn2</button>
  	<ul v-for="item in address">
  		<li>{{item.address1+item.address2+item.address3}}</li>
  	</ul>
    -->

    <button class="main-menu-open-btn" @click="clickMenuOpenBtn">Menu</button>
    <div class="main-menu" v-bind:class="{ active: isMenuActive }">
      <ul>
        <li>
          <router-link to="/"><span>Top</span></router-link>
        </li>
        <li>
          <router-link to="/page0"><span>page0</span></router-link>
        </li>
        <li>
          <router-link to="/page1"><span>page1</span></router-link>
        </li>
      </ul>

      <button class="close-btn" @click="clickMenuCloseBtn">×</button>
    </div>
  </header>
</template>
<style lang="scss">
  header{
    margin-bottom: 50px;

    .main-menu{
      width: 100%;
      position:absolute;
      top:0px;
      left:0px;
      background-color: rgba(255,255,255,0.8);
      display: none;

      &.active{
        display: block;
      }

      ul{
        width: 300px;
        margin: 0 auto;
        padding-top: 100px;

        li{
          list-style: none;
          margin:0 0 20px 0;
          padding:0;

          a{
            color:#000;
            text-align: center;
            display: block;
            font-size:20px;
            position:relative;

            span{
              position: relative;
            }

            &:before{
              content:'';
              width: 100%;
              height: 4px;
              background-color: #ffff00;
              display: block;
              position: absolute;
              bottom: 0px;
              transform:scaleX(0);
              transition-duration: 0.3s;
              transition-property: transform;
              transform-origin: 0% 100%;
            }

            &:hover{

              &:before{
                transform:scaleX(1);
              }

            }
          }
        }
      }

      .close-btn{
        border: none;
        background-color: #ddd;
        border-radius: 100px;
        width: 30px;
        height: 30px;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
</style>



<script>
	
export default {

  name: 'Header',

  data: function () {
    return {
      code:"",
      address:"",
      isMenuActive:false
    }
  },


  mounted() {



  },


  methods : {

    clickMenuOpenBtn(){

      this.isMenuActive = true;

    },


    clickMenuCloseBtn(){

      this.isMenuActive = false;

    },


  	clickBtn(){

	    this.$store.commit( 'hoge', this.hoge+1 );

  	},


  	clickBtn2(){

      this.$store.dispatch( 'getMessage', { zipcode:this.code } ).then( result => {
          
        if( result == 'error' ){
	    	this.address = [result];
        }else{
        	this.address = result.results;
        }

      });

  	}

  },

  props : {
  	hoge : String
  }

};

</script>