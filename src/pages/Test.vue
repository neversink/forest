<template>
  <!--   <div v-scroll="gun" class="scroll-y" style="height:2000px;max-height: 1500px;background-color: blue">
 </div>-->
  <div v-scroll="gun" class="scroll-y" style="height:667px;background-color: blue">
    <v-app>
      <v-content>
        <v-container v-scroll="gun" class="green">
          <div style="height:1000px">123</div>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({
    fab: false,
    hidden: false,
    tabs: null
  }),
  methods: {
    gun() {
      let scroll_height = document.body.scrollHeight || document.documentElement.scrollHeight;
      let offset_top = window.pageYOffset || document.documentElement.scrollTop
      console.log('scroll_height' + scroll_height)
      console.log('offset_top ' + offset_top)
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { 'color': 'indigo', icon: 'share' }
        case 'two':
          return { 'color': 'red', icon: 'edit' }
        case 'three':
          return { 'color': 'green', icon: 'keyboard_arrow_up' }
        default:
          return {}
      }
    }
  }
}

</script>
<style>
/* This is for documentation purposes and will not be needed in your application */

html {
  /*overflow-y: auto*/
}

</style>
