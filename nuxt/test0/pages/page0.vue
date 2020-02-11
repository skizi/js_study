<template>
  <div class="container">
	 <Header :hoge="this.$store.getters.hoge"></Header>
  	<p>page0</p>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">

  .container{
    text-align: center;
  }  

</style>
