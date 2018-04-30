<template>
  <div class="main-container">
    <div class="main-content">
      <span class="main-text">登录开启您的数字资管</span>
      <div class="main-button">
        <van-button type="primary" class="quit-button" size="large">登录/注册</van-button>
      </div>
    </div>
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
  name: 'Sign',
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
.main-container {
  /*display: flex;
  min-height: 100vh;*/
}

.main-content {
  margin: 40vh auto 0;
  transform: translateY(-50%);
  text-align: center;
}

.main-text {
  margin: auto;
}

.main-button {
  margin: 30px 0 100px 0;
  padding: 0 20px;
}

</style>
