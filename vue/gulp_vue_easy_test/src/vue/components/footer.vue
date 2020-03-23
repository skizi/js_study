<template>
	<footer>
		<p>フッター{{name}}</p>
	</footer>
</template>


<style lang="sass" scoped>
footer{
	width:800px;
	height:100px;
	margin:0 auto;
}
</style>

<script>

export default {

	name : 'Footer',

	data(){

		return {

		}

	},

	mounted(){


	},


	methods : {


	},


	props : {

		name : String

	}

}

</script>