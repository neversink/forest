<template>
  <v-app>
    <!-- <v-jumbotron color="indigo" dark height="2000px"> -->
      <v-container grid-list-md color="indigo">
        <v-layout align-item-center align-content-center justify-center row wrap class="full">
          <v-flex xs8 offset-xs1>
            <v-radio-group v-model="row" row>
              <v-radio label="手机用户" value="radio-1"></v-radio>
              <v-radio label="邮箱用户" value="radio-2"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs10>
            <v-text-field :counter="is_username_couter_hidden" clearable prepend-icon="person" name="login" label="请输入账号" type="text" v-model="username"></v-text-field>
          </v-flex>
          <v-flex xs10>
            <v-text-field :counter="is_password_couter_show" prepend-icon="lock" name="input-10-1" label="请输入密码" hint="至少8个字符" v-model="password" min="8" :append-icon="is_password_hidden ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (is_password_hidden = !is_password_hidden)" :type="is_password_hidden ? 'password' : 'text'"></v-text-field>
          </v-flex>
          <v-flex xs10 v-if="is_password_confirm_show">
            <v-text-field counter="true" prepend-icon="lock" name="input-10-1" label="请再次输入密码" hint="至少8个字符" v-model="password" min="8" :append-icon="is_password_hidden ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (is_password_hidden = !is_password_hidden)" :type="is_password_hidden ? 'password' : 'text'"></v-text-field>
          </v-flex>
          <v-flex xs10 offset-xs7 v-if="is_remember_password_show">
            <v-spacer></v-spacer>
            <v-checkbox label="记住密码" v-model="is_remember_password"></v-checkbox>
          </v-flex>
          <v-flex xs8>
            <v-btn block color="info" :loading="loading4" @click.native="login" :disabled="loading4">
              提交
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    <!-- </v-jumbotron> -->
  </v-app>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      is_password_confirm_show: false,
      is_username_couter_show: false,
      is_password_couter_show: false,
      is_remember_password_show: true,
      is_password_hidden: false,
      is_remember_password: false,
      username: '',
      password: ''
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => {
        (this[l] = false)
        this.$router.push({
          path: '/'
        });
      }, 1000)

      this.loader = null
    }
  },
  methods: {
    login() {
      this.loader = 'loading4';

    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full {
  height: 666px
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
</style>
