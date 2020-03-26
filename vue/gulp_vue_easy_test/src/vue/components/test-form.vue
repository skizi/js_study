<template>
	<div class="form-container">
		<form @submit.prevent="submit">
			<input type="text" v-model="hoge">
			<button>submit</button>
		</form>
	</div>
</template>


<style>
.form-container{
	width:800px;
	margin:0 auto;
}
</style>


<script>

import axios from 'axios';

export default{

	data(){
		return {
			hoge:""
		}
	},


	methods:{

		submit(){

			this.getJson().then( response => {
				if( response.status == 'success' ){
					console.log( response );
				}else{
					console.log( response.data );
				}
			} );

		},


		async getJson(){

			var response = await axios.get( 'http://hogeo.jp', { params : { name:this.hoge } } ).then( response => {
				return { status : 'success', data : response };
			} ).catch( error => {
				return { status : 'error', data : error };
			} );


			if( response.status == 'success' && response.data.status >= 400 ){
				response.status = 'error';
			}

			return response;

		}

	}


}

</script>