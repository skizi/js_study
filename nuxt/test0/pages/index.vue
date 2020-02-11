<template>
  <div class="container">
	 <Header :hoge="this.$store.getters.hoge"></Header>

    <main>
      <section>
        <h2>トップページ</h2>
        <p>
          texttexttexttexttext
        </p>
      </section>
    </main>
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
    width:500px;
    margin:0 auto;
  }  

</style>
