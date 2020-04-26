<template>
  <div class="container">
    <header-component></header-component>
    <section>
      <h2>Title1</h2>
      <p>texttexttexttexttexttexttext</p>
    </section>
    <functional-test detail-text="関数型コンポーネントで高速化！"></functional-test>
  </div>
</template>

<script>
import HeaderComponent from '~/components/Header.vue';
import FunctionalTest from '~/components/FunctionalTest.vue';

export default {
  components: {
    HeaderComponent,
    FunctionalTest
  }
}
</script>

<style>
  
</style>
