<template>
  <v-app class="main-container">
    <v-container fluid fill-height>
      <v-layout row wrap align-center justify-center>
        <v-flex xs11>
          <v-card class="text-xs-center input-container">
            <v-tabs icons-and-text centered dark class="tab-container" grow height="50" v-model="activated_tab">
              <v-tabs-slider color="amber lighten-4"></v-tabs-slider>
              <v-tab href="#tab-1">
                <v-icon color="amber lighten-4">phone</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                <v-icon color="amber lighten-4">mail</v-icon>
              </v-tab>
              <v-tab-item :id="'tab-' + i" class="input-content" v-for="i in 2" :key="i">
                <v-layout row wrap align-center justify-center>
                  <v-flex xs11>
                    <v-text-field  :disabled="is_loading" :error="username_error" v-if="i == 1" :rules="[rules.required,rules.phonenumber,]" dark clearable color="amber lighten-4" name="" :label="'请输入手机号码'" v-model="username" class="input-content-username" key="phone"></v-text-field>
                    <v-text-field :disabled="is_loading" :error="username_error" v-else :rules="[rules.required,rules.email,]" dark clearable color="amber lighten-4" name="" :label="'请输入邮箱地址'" v-model="username" class="input-content-username" key="email"></v-text-field>
                    <v-text-field :disabled="is_loading" :error="password_error" :rules="[rules.required,]" dark color="amber lighten-4" name="" label="请输入用户密码" v-model="password" class="input-content-password" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="change_password_visible" :type="e1 ? 'password' : 'text'"></v-text-field>
                  </v-flex>
                  <v-flex xs11 offset-xs7>
                    <v-spacer></v-spacer>
                    <v-checkbox :disabled="is_loading" color="amber lighten-4" dark label="记住密码" v-model="checkbox"></v-checkbox>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn @click.native="signin" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>登录</v-btn>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
            <v-card-actions>
              <v-btn flat color="grey lighten-4" replace :to="{name:'Signup'}">忘记密码</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat color="grey lighten-4" replace :to="{name:'Signup'}">用户注册</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar color="error" :timeout="3000" :top="'top'" v-model="snackbar">
      {{ snackbar_text }}
      <v-btn dark flat @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  name: 'Signin',
  data() {
    return {
      activated_tab: 'tab-1',
      snackbar: false,
      snackbar_text: '',
      e1: false,
      username: '',
      password: '',
      checkbox: true,
      is_loading: false,
      username_error: false,
      password_error: false,
      input_error: false,
      rules: {
        required: (value) => {
          this.input_error = false;
          if (!!value) {
            return true;
          } else {
            this.input_error = true;
            return '必填项';
          }
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (pattern.test(value)) {
            return true;
          } else {
            this.input_error = true;
            return '不是有效的邮箱地址';
          }
        },
        phonenumber: (value) => {
          const pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (value == 'admin' || pattern.test(value)) {
            return true;
          } else {
            this.input_error = true;
            return '不是有效的手机号码';
          }
        }
      }
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    signin() {
      this.is_loading = true;
      if (!this.username || !this.password) {
        this.snackbar_text = '用户名和密码不能为空';
        this.snackbar = true;
        this.is_loading = false;
        return;
      } else if (this.input_error) {
        this.snackbar_text = '请按照要求输入内容';
        this.snackbar = true;
        this.is_loading = false;
        return;
      }
      setTimeout(() => {
        if (this.username != 'admin' && this.username != '13400544025') {
          this.snackbar_text = '该用户尚未注册';
          this.snackbar = true;
          this.username_error = true;
        } else if (this.password != '123') {
          this.snackbar_text = '密码错误';
          this.snackbar = true;
          this.password_error = true;
        } else {
          this.$router.push({
            name: 'Home'
          })
        }
        this.is_loading = false;
      }, 2000);
    },
    change_password_visible() {
      this.e1 = !this.e1
    }
  }
}

</script>
<style scoped>
.application.theme--light {
  background-image: url(../assets/img/plane.jpg);
}

.application .theme--light.card,
.theme--light .card {
  background-color: rgba(0, 0, 0, .3);
}

.main-container {
  background-image: url(../assets/img/plane.jpg);
  background-size: cover;
}

.tab-container {
  background-color: #21212111;
}

.input-container {
  background-color: #424242aa;
}


.input-content-username {
  margin-top: 20px;
}

.input-content-password {
  /*margin-bottom: 20px;*/
}

.input-content-checknum {}

</style>
