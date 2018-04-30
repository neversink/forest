<template>
  <div>
    <van-nav-bar title="森林" left-arrow @click-left="go_back" @click-right="" fixed/>
    <van-row v-for="n in 10" :key="n">
      <van-col span="8">CCT</van-col>
      <van-col span="8">1.5231</van-col>
      <van-col span="8">+100.%</van-col>
    </van-row>
  </div>
</template>
<script>
// const tabs = [
//   { name: '资讯', icon: 'ondemand_video', color: 'blue-grey' },
//   { name: '行情', icon: 'music_note', color: 'teal' },
//   { name: '活动', icon: 'book', color: 'brown' },
//   { name: '我的', icon: 'image', color: 'indigo' }
// ]

export default {
  name: 'Band',
  data() {
    return {
      activde_tab: 0,
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    go_back() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped>


</style>
