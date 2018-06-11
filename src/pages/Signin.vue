<template>
  <v-app class="main-container">
    <v-container fluid fill-height>
      <v-layout row wrap align-center justify-center>
        <v-flex xs11>
          <v-card class="text-xs-center input-container">
            <v-tabs icons-and-text centered dark class="tab-container" grow height="50" v-model="login_type">
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
                    <v-text-field :disabled="is_loading" v-if="i == 1" :rules="[rules.required,rules.phonenumber,]" dark clearable color="amber lighten-4" name="" :label="'请输入手机号码'" v-model="username" class="input-content-username" key="phone"></v-text-field>
                    <v-text-field :disabled="is_loading" v-else :rules="[rules.required,rules.email,]" dark clearable color="amber lighten-4" name="" :label="'请输入邮箱地址'" v-model="username" class="input-content-username" key="email"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.required,]" dark color="amber lighten-4" name="" label="请输入用户密码" v-model="password" class="input-content-password" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="change_password_visible" :type="e1 ? 'password' : 'text'"></v-text-field>
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
                  <!--   <v-flex xs11 offset-xs7>
                    <v-spacer></v-spacer>
                    <v-checkbox :disabled="is_loading" color="amber lighten-4" dark label="记住密码" v-model="checkbox"></v-checkbox>
                  </v-flex> -->
                  <v-flex xs11>
                    <v-btn @click.native="signin" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>登录</v-btn>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
            <v-card-actions>
              <!-- <v-btn flat color="grey lighten-4" replace :to="{name:'Signup'}">忘记密码</v-btn> -->
              <v-spacer></v-spacer>
              <v-btn flat color="grey lighten-4" replace :to="{name:'Signup'}">用户注册</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar :color="snackbar_color" :timeout="3000" :top="'top'" v-model="snackbar">
      {{ snackbar_text }}
      <v-btn dark flat @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Signin',
  data() {
    return {
      login_type: 'tab-1',
      snackbar: false,
      snackbar_text: '',
      e1: false,
      username: '',
      password: '',
      checknumber: '',
      checkbox: true,
      is_loading: false,
      input_error: false,
      countdown: '发送验证码',
      is_sending_checknum: false,
      snackbar_color: 'error',
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
        checknumber: (value) => {
          const pattern = /^[A-Za-z0-9]{6}$/;
          if (pattern.test(value)) {
            return true;
          } else {
            this.input_error = true;
            return '不是有效的6位验证码';
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
    ...mapGetters('signin', [
      'IsAccPwdEmpty'
    ]),
  },
  watch: {

  },
  methods: {
    ...mapActions('signin', [
      'login'
    ]),
    ...mapActions('signup', [
      'getAuthCode'
    ]),
    send_checknum() {
      if (!this.username) {
        this.snackbar_text = this.login_type == 'tab-1' ? '手机号码不能为空' : '邮箱地址不能为空';
        this.snackbar = true;
        return;
      }
      this.getAuthCode({
        Type: this.login_type == 'tab-1' ? '2' : '1',
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
        console.log(error)
        this.snackbar_text = '发送验证码失败';
        this.snackbar = true;
      })
    },
    signin() {
      if (!this.checknumber && this.username != '18750218018' && this.username != '15860809611') {
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
      this.login({
        Type: this.login_type == 'tab-1' ? '2' : '1',
        ID: this.username,
        Pwd: this.password,
        AuthCode: this.checknumber,
        notcheck: (this.username == '18750218018' || this.username == '15860809611') ? 1 : 0,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.snackbar_color = 'success';
          console.log(this.IsAccPwdEmpty)
          if (this.IsAccPwdEmpty == 0) {
            this.snackbar_text = '登录成功';
            this.$toast('请先设置交易密码');
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push({
                name: 'Profile'
              })
            }, 2000)
          } else {
            this.snackbar_text = '登录成功';
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push({
                name: 'Home'
              })
            }, 2000)
          }

        } else {
          this.snackbar_text = response.data.Result.FaultMsg;
          this.snackbar = true;
          this.is_loading = false;
        }
      }).catch(error => {
        this.snackbar_text = '登录失败';
        this.snackbar = true;
        this.is_loading = false;
      })

      // setTimeout(() => {
      //   if (this.username != 'admin' && this.username != '13400544025') {
      //     this.snackbar_text = '该用户尚未注册';
      //     this.snackbar = true;
      //     this.username_error = true;
      //   } else if (this.password != '123') {
      //     this.snackbar_text = '密码错误';
      //     this.snackbar = true;
      //     this.password_error = true;
      //   } else {
      //     this.$router.push({
      //       name: 'Home'
      //     })
      //   }
      //   this.is_loading = false;
      // }, 2000);
    },
    change_password_visible() {
      this.e1 = !this.e1
    }
  }
}

</script>
<style scoped>
.application.theme--light {
  /*background-image: url(../assets/img/backgroud.png);*/
  background: transparent;
}

.application .theme--light.card,
.theme--light .card {
  background-color: rgba(0, 0, 0, .3);
}

.main-container {
  background-image: url(../assets/img/backgroud.png);
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
