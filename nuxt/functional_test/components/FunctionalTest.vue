<template functional>
  <div>
    <h2>FunctionalComponent</h2>
    <!-- detailTextではなく、props.detailTextという書き方 -->
    <p>props.detailText:{{props.detailText}}</p>
  </div>
</template>

<script>
//functionalコンポーネントでは、mountedも書いてあるとエラー
export default{

  name : "FunctionalComponent",

  props:{
    "detailText":String
  }

}

</script>
