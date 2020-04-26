<template>

	<div :style="{ opacity:opacityNum }">
		<h2>Heavy</h2>
		<p>重たい処理を子に逃がして高速化</p>

		<!--ここで重たい処理を書くと、opacityが変更されるたび重たい処理が実行される-->
		<!--<p>{{heavyFunc()}}</p>-->

		<!--子供に処理を逃すことで、１度だけ重たい処理が実行される-->
		<heavy-child></heavy-child>
	</div>

</template>


<script>
import HeavyChild from "./HeavyChild";


export default{

	name:"HeavyTest",


	components : { HeavyChild },


	data(){

		return {
			opacityNum:0
		}

	},


	mounted(){

		setInterval( ()=>{
			this.opacityNum += 0.02;
		}, 1000 );

	},


	methods : {

		heavyFunc(){

			console.log( "heavy!" );
			
		}

	}

}	
</script>