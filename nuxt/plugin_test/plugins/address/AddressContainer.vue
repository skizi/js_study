<template>
  <div>
    <h2>Address Container</h2>
    <button @click="btnClick">getAddress</button>
    <p v-if="address">{{address.pref + address.city + address.address}}</p>
  </div>
</template>

<script>

export default {
  name: 'AddressContainer',
  

  data() {

    return {
      address:null
    }

  },


  methods : {

    btnClick(){

      this.$store.dispatch( 'address/getAddress', { code:1710032 } ).then( response => {
      // this.$address.getAddress( 1 ).then( response => {
        if( response.status == "success" ){
          this.address = response.data.data.data;
        }else{
          console.log( "error!!!!" );
        }
        console.log( response );
      } );

    }

  }
}
</script>
