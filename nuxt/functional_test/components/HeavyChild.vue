<template>
</template>


<script>
export default{

	//子供に処理を逃すことで、１度だけ重たい処理が実行される
	mounted(){

		this.heavyFunc();

	},


	methods:{

		heavyFunc(){

			console.log( "heavy!" );

		}

	}

}	
</script>