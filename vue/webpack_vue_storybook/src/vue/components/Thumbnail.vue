<template functional>
	<div class="thumbnail">
		<h3>{{props.title}}</h3>
		<p>{{props.innerText}}</p>
	</div>
</template>


<style lang="scss">

	.thumbnail{
		width:100px;
		min-height: 80px;
		margin:0 4px;
		padding:10px;
		background-color: #ddd;
		border-radius: 4px;
		cursor:pointer;
	}

</style>



<script>

export default{

	name : "Thumbnail",

	props : {
		title:String,
		innerText:String
	}

}

</script>