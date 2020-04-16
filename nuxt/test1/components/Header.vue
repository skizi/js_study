<template>

    <header>
      <h1>Header1</h1>
      <button @click="clickBtn">btn</button>
      <input type="text" v-model="code">

	  <button @click="submit">submit</button>      
    </header>

</template>


<script>
import axios from "axios";

export default {

	name : "Header",


	data(){

		return {
			code:0,
			loadingFlag:false
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