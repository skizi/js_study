<template>
  <transition name="modal" appear>
    <div class="modal">
      <div class="bg"></div>
      <div class="inner">
        <h3>modal</h3>
        <button @click="btnClick()">
          close
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;

  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .inner {
    background-color: #fff;
    width: 300px;
    height: 200px;
    margin: -100px 0 0 -150px;
    position: absolute;
    top: 50%;
    left: 50%;

    h3 {
      text-align: center;
    }
  }
}

// 表示
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  .inner {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// 非表示
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .inner {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>

<script>
module.exports = {
  name: "Modal",

  data: function () {
    return {};
  },

  methods: {
    btnClick() {
      this.$store.commit("showModalFlag", false);
    },
  },
};
</script>
