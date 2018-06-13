<template>
  <v-app>
    <div class="main-container">
      <div class="personal-info">
        <img class="avatar" src="../assets/img/icon.jpeg">
        <!-- <br> -->
        <!-- <br> -->
        <!-- <span class="username gold-text title">{{Nick}}</span> -->
        <br>
        <span class="userid gold-text caption">用户ID：{{ID}}</span>
        <br>
        <span class="integrity gold-text caption">资料完整度<van-rate v-model="StarLevel"/></span>
        <br>
        <!-- <span class="service gold-text">APP在线客服</span> -->
      </div>
      <div v-for="(item ,index) in items" :key="index">
        <div class="subhead-container">
          <h2 class="subhead gold-text">{{item.title}}</h2>
          <h3 class="subhead-detail">{{item.subtitle}}</h3>
        </div>
        <v-list class="list-background">
          <template v-for="(i ,index2) in item.content">
            <v-list-tile :key="i.title" avatar @click="">
              <v-list-tile-avatar>
                <!-- <img src="../static/avatar.png"> -->
                <v-icon color="amber lighten-4">{{ i.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="body-2 grey-text">{{ i.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="caption" style="color:white">{{i.subtitle}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn :disabled="!i.enable" flat @click.native="click_action(i.title,i.action)">
                  <span class="body-2 grey-text">{{i.action}}</span>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider dark inset v-if="index2 + 1< item.content.length" :key="index2"></v-divider>
          </template>
        </v-list>
      </div>
      <v-layout justify-center>
        <v-flex class="quit-button" xs10>
          <v-btn block color="amber lighten-4" large replace @click.native="logout_click">退出登录</v-btn>
        </v-flex>
      </v-layout>
      <v-dialog v-model="show_dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card tile class="main-container">
          <v-toolbar class="grey darken-4" dark dense>
            <v-btn icon @click.native="show_dialog = false" dark>
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <v-toolbar-title v-text="confirm_type" style="color:#FFE082;fontSize:16px;"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container fluid grid-list-md text-xs-center>
              <v-layout row wrap justify-center>
                <template v-if="confirm_type == '实名认证'">
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" :rules="[rules.name,]" dark clearable color="amber lighten-4" name="" :label="'请输入姓名'" v-model="name" class="input-content-username" key="name"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.idcard,]" dark clearable color="amber lighten-4" name="" :label="'请输入身份证号码'" v-model="idcard" class="input-content-idcard" key="idcard"></v-text-field>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn style="margin-bottom: 50px" @click.native="base_confirm" :loading="is_loading" :disabled="is_loading" block class="login-button mb-6" color="amber lighten-4" large>认证</v-btn>
                  </v-flex>
                </template>
                <template v-if="confirm_type == '高级认证'">
                  <v-flex xs11>
                    <van-uploader :after-read="onRead" style="margin-bottom: 20px">
                      <span class="gold-text">请选择您本人正面手拿身份证复印件的照片</span>
                      <br>
                      <br>
                      <v-icon large color="amber lighten-4">camera_alt</v-icon><span class="gold-text">点击选择图片<br>
                    </span>
                    </van-uploader>
                    <br>
                    <template v-for="(i, index) in upload_photos">
                      <img :src="i" :key="index" style="max-width: 90%">
                    </template>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn style="margin-bottom: 50px" @click.native="advance_confirm" :loading="is_loading" :disabled="is_loading" block class="login-button mb-6" color="amber lighten-4" large>认证</v-btn>
                  </v-flex>
                </template>
                <template v-if="confirm_type == '邮箱'">
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" :rules="[rules.email,]" dark clearable color="amber lighten-4" name="" :label="'请输入邮箱地址'" v-model="email" class="input-content-username" key="email"></v-text-field>
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
                  <v-flex xs11>
                    <v-btn @click.native="bind_email" :loading="is_loading" :disabled="is_loading" block class="login-button mb-6" color="amber lighten-4" large>绑定</v-btn>
                  </v-flex>
                </template>
                <template v-if="confirm_type == '手机'">
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" :rules="[rules.tel,]" dark clearable color="amber lighten-4" name="" :label="'请输入手机号码'" v-model="tel" class="input-content-username" key="tel"></v-text-field>
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
                  <v-flex xs11>
                    <v-btn @click.native="bind_tel" :loading="is_loading" :disabled="is_loading" block class="login-button mb-6" color="amber lighten-4" large>绑定</v-btn>
                  </v-flex>
                </template>
                <template v-if="confirm_type == '登录密码'">
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" :rules="[rules.password,]" dark clearable color="amber lighten-4" name="" :label="'请输入原登录密码'" v-model="login_pwd_old" class="input-content-username" key="login_pwd_old"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.password,]" dark clearable color="amber lighten-4" name="" :label="'请输入新登录密码'" v-model="login_pwd" key="login_pwd"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.confirmpassword,]" dark clearable color="amber lighten-4" name="" :label="'请再次输入新登录密码'" v-model="login_pwd2" class="input-content-idcard" key="login_pwd2"></v-text-field>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn @click.native="change_login_pwd" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>修改</v-btn>
                  </v-flex>
                </template>
                <template v-if="confirm_type == '交易密码'">
                  <v-flex xs11>
                    <v-text-field v-if="confirm_action == '修改'" :disabled="is_loading" :rules="[rules.password,]" dark clearable color="amber lighten-4" name="" :label="'请输入原交易密码'" v-model="asset_pwd_old" class="input-content-username" key="asset_pwd_old"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.password,]" dark clearable color="amber lighten-4" name="" :label="'请输入新交易密码'" v-model="asset_pwd" key="asset_pwd"></v-text-field>
                    <v-text-field :disabled="is_loading" :rules="[rules.confirmpassword,]" dark clearable color="amber lighten-4" name="" :label="'请再次输入新交易密码'" v-model="asset_pwd2" class="input-content-idcard" key="asset_pwd2"></v-text-field>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn @click.native="change_asset_pwd" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>修改</v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar :color="snackbar_color" :timeout="3000" :top="'top'" v-model="snackbar">
      {{ snackbar_text }}
      <v-btn dark flat @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'Profile',
  data() {
    return {
      activde_tab: 0,
      show_dialog: false,
      name: '',
      idcard: '',
      email: '',
      tel: '',
      login_pwd_old: '',
      login_pwd: '',
      login_pwd2: '',
      asset_pwd_old: '',
      asset_pwd: '',
      asset_pwd2: '',
      is_loading: false,
      name_error: false,
      idcard_error: false,
      confirm_type: '',
      confirm_action: '',
      upload_photos: [],
      checknumber: '',
      countdown: '发送验证码',
      is_sending_checknum: false,
      snackbar: false,
      snackbar_text: '',
      snackbar_color: 'error',
      items: {},
      rules: {
        name: (value) => {
          if (!!value) {
            return true;
          } else {
            return '必填项';
          }
        },
        idcard: (value) => {
          if (!!value) {
            return true;
          } else {
            return '必填项';
          }
        },
        email: (value) => {
          if (!!value) {
            return true;
          } else {
            return '必填项';
          }
        },
        tel: (value) => {
          if (!!value) {
            return true;
          } else {
            return '必填项';
          }
        },
        password: (value) => {
          const length_limit = value.length > 7;
          if (length_limit) {
            return true;
          } else if (!length_limit) {
            return '密码长度至少为8位';
          }
        },
        confirmpassword: (value) => {
          const length_limit = value.length > 7;
          const the_same = this.confirm_tyoe == '登录密码' ? this.login_pwd == this.login_pwd2 : this.asset_pwd == this.asset_pwd2;
          if (length_limit && the_same) {
            return true;
          } else if (!length_limit) {
            return '密码长度至少为8位';
          } else {
            return '两次输入的密码不一致';
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
      }
    }
  },
  computed: {
    ...mapGetters('signin', [
      'ID', 'Nick', 'StarLevel', 'IsAuth', 'AuthInfo', 'IsAdvAuth', 'SecrLevel', 'IsEmalBind', 'IsPhoneBind', 'IsGoogleAuth', 'IsAccPwdEmpty'
    ]),
  },
  watch: {

  },
  mounted() {
    this.items = this.create_menu_items();
  },
  methods: {
    ...mapActions('profile', [
      'bindTelOrEmail', 'changePassword', 'certify', 'advancedCertify', 'logout'
    ]),
    ...mapActions('signin', [
      'update_asset_pwd'
    ]),
    create_menu_items() {
      return {
        sfrz_items: {
          title: '身份认证',
          subtitle: '请如实填写您的身份信息，一经认证不可修改',
          content: [{
              icon: 'mdi-account',
              title: '实名认证',
              subtitle: this.IsAuth == 0 ? '您还未进行实名认证' : '已认证',
              action: this.IsAuth == 0 ? '认证' : '',
              enable: this.IsAuth === 0 || !this.IsAuth ? true : false,
            },
            {
              icon: 'mdi-account-card-details',
              title: '高级认证',
              subtitle: this.IsAdvAuth == 0 ? '您还未进行高级认证' : '已认证',
              action: this.IsAdvAuth == 0 ? '认证' : '',
              enable: this.IsAdvAuth === 0 || !this.IsAdvAuth ? true : false,
            },
          ]
        },
        zhaq_items: {
          title: '账户安全',
          subtitle: '安全等级：' + (this.SecrLevel == 1 ? '低' : this.SecrLevel == 2 ? '中' : '高'),
          content: [{
              icon: 'mdi-email',
              title: '邮箱',
              subtitle: this.IsEmalBind == 0 ? '未绑定' : '已绑定',
              action: this.IsEmalBind == 0 ? '绑定' : '',
              enable: this.IsEmalBind == 0 || !this.IsEmalBind ? true : false,
            },
            {
              icon: 'mdi-cellphone',
              title: '手机',
              subtitle: this.IsPhoneBind == 0 ? '未绑定' : '已绑定',
              action: this.IsPhoneBind == 0 ? '绑定' : '',
              enable: this.IsPhoneBind == 0 || !this.IsPhoneBind ? true : false,
            },
            {
              icon: 'mdi-google',
              title: '谷歌验证码',
              subtitle: this.IsGoogleAuth == 0 ? '未绑定' : '已绑定',
              action: this.IsGoogleAuth == 0 ? '绑定' : '',
              enable: this.IsGoogleAuth == 0 || !this.IsGoogleAuth ? true : false,
            },
            {
              icon: 'lock',
              title: '登录密码',
              subtitle: '已设置',
              action: '修改',
              enable: true
            }, {
              icon: 'mdi-cash-usd',
              title: '交易密码',
              subtitle: this.IsAccPwdEmpty == 0 ? '未设置' : '已设置',
              action: this.IsAccPwdEmpty == 0 ? '新增' : '修改',
              enable: true
            }
          ],
        },
        qtne_items: {
          title: '其他内容',
          subtitle: '',
          content: [
            // {
            //     icon: 'face',
            //     title: '在线客服',
            //     subtitle: 'forest@forest.com',
            //     action: '在线咨询',
            //     enable: true
            //   },
            {
              icon: 'mdi-at',
              title: '邮件咨询',
              subtitle: 'eaforest@hotmail.com',
              action: '发送邮件',
              enable: true
            },
            // {
            //   icon: 'mdi-phone-in-talk',
            //   title: '电话咨询',
            //   subtitle: '123456',
            //   action: '拨打电话',
            //   enable: true
            // },
            // {
            //   icon: 'mdi-cached',
            //   title: '清除缓存',
            //   subtitle: '当前已用缓存10M',
            //   action: '清除',
            // },
          ],
        },
      }
    },
    show_snackbar(content, type) {
      this.snackbar_color = type;
      this.snackbar_text = content;
      this.snackbar = true;
      this.is_loading = false;
      if (type == 'success') {
        this.show_dialog = false;
      }
    },
    onRead(file) {
      this.upload_photos.push(file.content)
    },
    click_action(type, action) {
      console.log(type, action)
      this.confirm_type = type;
      this.confirm_action = action;
      switch (type) {
        case '实名认证':
          this.name = '';
          this.id = '';
          this.show_dialog = true;
          break;
        case '高级认证':
          this.upload_photos = [];
          this.show_dialog = true;
          break;
        case '邮箱':
          this.email = '';
          this.show_dialog = true;
          break;
        case '手机':
          this.tel = '';
          this.show_dialog = true;
          break;
        case '登录密码':
          this.login_pwd = '';
          this.login_pwd2 = '';
          this.show_dialog = true;
          break;
        case '交易密码':
          this.asset_pwd = '';
          this.asset_pwd2 = '';
          this.show_dialog = true;
          break;
        case '邮件咨询':
          console.log('this')
          window.location.href = "mailto:forest@forest.com"
          break;
        case '电话咨询':
          window.location.href = "tel:123456"
          break;
        case '谷歌验证码':
          this.$toast('功能开发中');
          break;
      }
    },
    bind_tel() {
      this.is_loading = true;
      this.bindTelOrEmail({
        Type: '2',
        ID: this.ID,
        ID: this.tel,
        AuthCode: ''
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.show_snackbar('绑定电话成功', 'success')
        } else {
          this.show_snackbar(response.data.Result.FaultMsg, 'error')
        }
      }).catch(e => {
        this.show_snackbar('绑定电话失败', 'error')
      })
    },
    bind_email() {
      this.is_loading = true;
      this.bindTelOrEmail({
        Type: '1',
        ID: this.ID,
        ID: this.email,
        AuthCode: ''
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.show_snackbar('绑定邮箱成功', 'success')
        } else {
          this.show_snackbar(response.data.Result.FaultMsg, 'error')
        }
      }).catch(e => {
        this.show_snackbar('绑定邮箱失败', 'error')
      })
    },
    change_login_pwd() {
      if (this.login_pwd != this.login_pwd2) {
        this.$toast('两次密码输入不一致');
        return;
      }
      if (!this.login_pwd) {
        this.$toast('密码不能为空');
        return;
      }
      if (this.login_pwd.length < 8) {
        this.$toast('密码长度至少为8位');
        return;
      }
      this.is_loading = true;
      this.changePassword({
        Type: '1',
        ID: this.ID,
        From: this.login_pwd_old,
        To: this.login_pwd
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.show_snackbar('修改登录密码成功', 'success')
          setTimeout(() => {
            this.$router.push({
              name: 'Signin'
            })
          }, 2000)
        } else {
          this.show_snackbar(response.data.Result.FaultMsg, 'error')
        }
      }).catch(e => {
        this.show_snackbar('修改登录密码失败', 'error')
      })
    },
    change_asset_pwd() {
      if (this.asset_pwd != this.asset_pwd2) {
        this.$toast('两次密码输入不一致');
        return;
      }
      if (!this.asset_pwd) {
        this.$toast('密码不能为空');
        return;
      }
      if (this.asset_pwd.length < 8) {
        this.$toast('密码长度至少为8位');
        return;
      }
      this.is_loading = true;
      this.changePassword({
        Type: '2',
        ID: this.ID,
        From: this.asset_pwd_old,
        To: this.asset_pwd,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.show_snackbar('修改交易密码成功', 'success')
          this.update_asset_pwd(1);
          this.items = this.create_menu_items();
        } else {
          this.show_snackbar(response.data.Result.FaultMsg, 'error')
        }
      }).catch(e => {
        this.show_snackbar('修改交易密码失败', 'error')

      })
    },
    base_confirm() {
      this.is_loading = true;
      this.certify({
        ID: this.ID,
        Name: this.name,
        ID: this.idcard,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.show_snackbar('实名认证提交成功', 'success')
        } else {
          this.show_snackbar(response.data.Result.FaultMsg, 'error')
        }
      }).catch(e => {
        console.log(e)
        this.show_snackbar('实名认证提交失败', 'error')
      })
    },
    advance_confirm() {
      this.is_loading = true;
      let temp_param = {};
      // temp_param['ID'] = this.ID;
      this.upload_photos.forEach((i, index) => {
        temp_param['photo' + index] = i
      })
      this.advancedCertify(temp_param)
        .then(response => {
          if (response.data.Result.Status == 0) {
            this.show_snackbar('高级认证提交成功', 'success')
          } else {
            this.show_snackbar(response.data.Result.FaultMsg, 'error')
          }
        }).catch(e => {
          this.show_snackbar('高级认证提交失败', 'error')
        })
    },
    send_checknum() {
      if (this.confirm_tyoe == '手机' && this.tel) {
        show_snackbar('手机号码不能为空', 'error')
        return;
      }
      if (this.confirm_tyoe == '邮箱' && this.email) {
        show_snackbar('邮箱地址不能为空', 'error')
        return;
      }
      this.getAuthCode({
        Type: this.confirm_tyoe == '手机' ? '2' : '1',
        ID: this.confirm_tyoe == '手机' ? this.tel : this.email,
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
    logout_click() {
      this.logout().then(() => {
        this.$router.push({
          name: 'Signin'
        })
      })
    }
  }
};

</script>
<style scoped>
.application .theme--light.list,
.theme--light .list {
  background-color: rgba(0, 0, 0, 0.3);
}

.list-background {
  background-color: rgba(0, 0, 0, 0.3);
}


.list-hr {
  border: none;
  border-top: 1px solid;
  border-top-color: rgba(250, 250, 250, .5);
  margin-left: 72px;
}

.gold-text {
  color: #FFECB3;
}

.grey-text {
  color: #EEEEEE;
}

.subhead-container {
  margin: 20px 0 5px 0;
}

.subhead {
  margin: 0;
  font-weight: 400;
  font-size: 15px;
  color: #FFECB3;
  padding: 0px 15px;
}

.subhead-detail {
  margin: 0;
  font-weight: 400;
  font-size: 13px;
  color: #EAEAEA;
  padding: 0px 15px;
}

.quit-button {
  margin: 30px 0;
  /*padding: 0 20px;*/
}

.personal-info {
  padding: 30px 0 0 0;
  vertical-align: center;
  text-align: center;
  /*margin-bottom: 20px;*/
  background-size: cover;
}


.avatar {
  /*margin-top: 20px;*/
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.input-content-username {
  margin-top: 20px;
}

.input-content-idcard {
  margin-bottom: 20px;
}

</style>
