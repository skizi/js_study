<template>

    <header>
      <h1>Header1</h1>
      <button @click="clickBtn">btn</button>
      <form @submit.prevent>
	      <input type="text" v-model="code">
		  <button type="submit" value="submit" @click="submit"></button>
	  </form>

	  <ul v-for="item in address">
	  	<li><span>{{item.pref}}</span><span>{{item.city}}</span><span>{{item.town}}</span></li>
	  </ul>   
    </header>

</template>


<script>
import axios from "axios";

export default {

	name : "Header",


	data(){

		return {
			code:0,
			loadingFlag:false,
			address:[]
		}

	},


	mounted(){

		console.log("header");

	},


	methods : {

		clickBtn(){

			console.log( "clickBtn" );

		},


		submit(){

			if( this.loadingFlag ) return;
			this.loadingFlag = true;


      		this.$store.dispatch( 'getData', { zipcode:this.code } ).then( response => {
				if( response.status == "success" ){
					console.log( response );
					this.address.push( response.data.data.data );
				}else{
					console.log( response );
					console.log( "error!!" );
				}
				this.loadingFlag = false;
			} );

		},

	}
	
}

</script>