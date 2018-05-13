<template>
  <v-app class="main-container">
    <v-container fluid fill-height>
      <v-layout row wrap align-center justify-center>
        <v-flex xs11>
          <v-card class="text-xs-center input-container">
            <v-tabs icons-and-text centered dark class="tab-container" grow height="50" v-model="register_type">
              <v-tabs-slider color="amber lighten-4"></v-tabs-slider>
              <v-tab href="#tab-1">
                <!-- 手机 -->
                <v-icon color="amber lighten-4">phone</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                <!-- 邮件 -->
                <v-icon color="amber lighten-4">mail</v-icon>
              </v-tab>
              <v-tab-item :id="'tab-' + i" class="input-content" v-for="i in 2" :key="i">
                <v-layout row wrap align-center justify-center>
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" v-if="i == 1" :rules="[rules.required,rules.phonenumber,]" dark clearable color="amber lighten-4" name="" :label="'请输入手机号码'" v-model="username" class="input-content-username" key="phone"></v-text-field>
                    <v-text-field :disabled="is_loading" v-else :rules="[rules.required,rules.email,]" dark clearable color="amber lighten-4" name="" :label="'请输入邮箱地址'" v-model="username" class="input-content-username" key="email"></v-text-field>
                    <v-text-field :disabled="is_loading" dark color="amber lighten-4" name="" :rules="[rules.required, rules.password]" label="请输入用户密码" v-model="password" class="input-content-password" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="change_password_visible" :type="e1 ? 'password' : 'text'"></v-text-field>
                    <v-text-field :disabled="is_loading" dark color="amber lighten-4" name="" :rules="[rules.required, rules.confirmpassword]" label="请再次输入用户密码" v-model="password2" class="input-content2" :type="e1 ? 'password' : 'text'"></v-text-field>
                    <v-layout row wrap>
                      <v-flex xs7>
                        <v-text-field :rules="[rules.required,rules.checknumber,]" single-line dark color="amber lighten-4" name="" v-model="checknumber" label="请输入验证码" class="input-content-checknum"></v-text-field>
                      </v-flex>
                      <v-flex xs5>
                        <v-btn @click.native="send_checknum" :disabled="is_loading || is_sending_checknum" value="left" small color="amber lighten-4" style="margin-top:10px;">
                          <span>{{countdown}}</span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center justify-center>
                  <v-flex xs11>
                    <v-btn @click.native="signup" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>注册</v-btn>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="grey lighten-4" replace :to="{name:'Signin'}">用户登录</v-btn>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Signup',
  data() {
    return {
      register_type: 'tab-1',
      e1: false,
      username: '',
      password: '',
      password2: '',
      checknumber: '',
      countdown: '发送验证码',
      is_loading: false,
      input_error: false,
      is_sending_checknum: false,
      snackbar: false,
      snackbar_text: '',
      nickname: '',
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
          if (pattern.test(value)) {
            return true;
          } else {
            this.input_error = true;
            return '不是有效的手机号码';
          }
        },
        checknumber: (value) => {
          const pattern = /^[A-Za-z0-9]{6}$/;
          if (pattern.test(value)) {
            return true;
          } else {
            this.input_error = true;
            return '不是有效的6位验证码';
          }
        },
        password: (value) => {
          const length_limit = value.length > 7;
          if (length_limit) {
            return true;
          } else if (!length_limit) {
            this.input_error = true;
            return '密码长度至少为8位';
          }
        },
        confirmpassword: (value) => {
          const length_limit = value.length > 7;
          const the_same = this.password == this.password2;
          if (length_limit && the_same) {
            return true;
          } else if (!length_limit) {
            this.input_error = true;
            return '密码长度至少为8位';
          } else {
            this.input_error = true;
            return '两次输入的密码不一致';
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
    ...mapActions('signup', [
      'register', 'getAuthCode'
    ]),
    change_password_visible() {
      this.e1 = !this.e1
    },
    invalidDate() {

    },
    send_checknum() {
      if (!this.username) {
        this.snackbar_text = this.register_type == 'tab-1' ? '手机号码不能为空' : '邮箱地址不能为空';
        this.snackbar = true;
        return;
      }
      this.getAuthCode({
        Type: this.register_type == 'tab-1' ? '2' : '1',
        ID: this.username
      }).then(response => {
        this.is_sending_checknum = true;
        this.countdown = 60;
        let interval_id = setInterval(() => {
          this.countdown -= 1;
          if (this.countdown == 0) {
            this.is_sending_checknum = false;
            this.countdown = '发送验证码';
            clearInterval(interval_id);
          }
        }, 1000)
      }).catch(error => {
        this.snackbar_text = '发送验证码失败';
        this.snackbar = true;
      })
    },
    signup() {
      if (!this.checknumber) {
        this.snackbar_text = '验证码不能为空';
        this.snackbar = true;
        return;
      } else if (!this.username || !this.password) {
        this.snackbar_text = '用户名和密码不能为空';
        this.snackbar = true;
        return;
      } else if (this.input_error) {
        this.snackbar_text = '请按照要求输入内容';
        this.snackbar = true;
        return;
      }
      this.is_loading = true;
      this.register({
        Type: this.register_type == 'tab-1' ? '2' : '1',
        ID: this.username,
        Pwd: this.password,
        AuthCode: this.checknumber,
        Nick: this.nickname,
      }).then(response => {
        console.log(response.data)
        if (response.data.Status == 0) {
          this.$router.push({
            name: 'Signin'
          })
        } else {
          this.snackbar_text = response.data.FaultMsg;
          this.snackbar = true;
          this.is_loading = false;
        }
      }).catch(error => {
        this.snackbar_text = '注册失败';
        this.snackbar = true;
        this.is_loading = false;
      })

      // setTimeout(() => {
      //   if (this.checknumber != '1234') {
      //     this.snackbar_text = '验证码错误';
      //     this.snackbar = true;
      //     this.checknumber_error = true;
      //   } else if (this.password != '123') {
      //     this.snackbar_text = '密码错误';
      //     this.snackbar = true;
      //     this.password_error = true;
      //   } else if (this.username != 'admin' && this.username != '13400544025') {
      //     this.snackbar_text = '该用户尚未注册';
      //     this.snackbar = true;
      //     this.username_error = true;
      //   } else {
      //     this.$router.push({
      //       name: 'Home'
      //     })
      //   }
      //   this.is_loading = false;
      // }, 2000);
    },
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

.input-content-password {}

.input-content-checknum {
  margin-bottom: 20px;
}

</style>
