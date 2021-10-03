<template>
  <transition name="overlay">
    <div 
      v-if="visible"
      class="overlay"
      @click.self="hideOverlay"
    >
    </div>
  </transition>
</template>

<script>
export default {
  name: 'overlay',
  data: () => ({
    visible: false,
    callback: '',
  }),
  methods: {
    showOverlay(func) {
      this.visible = true
      this.callback = func      
    },
    hideOverlay() {
      this.visible = false
      this.callback()
      this.callback = ''
      
    }
  },
  mounted() {
    this.$root.$on('showOverlay', this.showOverlay)
    this.$root.$on('hideOverlay', this.hideOverlay)
    
  }
}
</script>

<style lang="scss" scoped>
  .overlay{
    display: flex;
    position: fixed;
    top:45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0,0,0,.5);
  }

.overlay-enter-active, .overlay-leave-active {
  transition: opacity .3s;
}
.overlay-enter, .overlay-leave-to  {
  opacity: 0;
}

</style>