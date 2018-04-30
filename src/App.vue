<template>
  <div id="app" class="main-container">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.meta.index
      const fromDepth = from.meta.index
      console.log(toDepth, fromDepth)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
  }
}

</script>
<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  background-color: #212121;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .1s;
}

.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
