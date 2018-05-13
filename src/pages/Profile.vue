<template>
  <v-app>
    <div class="main-container">
      <div class="personal-info">
        <img class="avatar" src="../assets/img/avatar.png">
        <br>
        <br>
        <span class="username gold-text title">neversink</span>
        <br>
        <span class="userid gold-text caption">ID：123123123</span>
        <br>
        <span class="integrity gold-text caption">资料完整度80%</span>
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
                <v-btn flat @click.native="click_action(i.title,i.action)">
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
          <v-btn block color="amber lighten-4" large replace :to="{name:'Signin'}">退出登录</v-btn>
        </v-flex>
      </v-layout>
      <v-dialog v-model="show_dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card tile class="grey darken-4">
          <v-toolbar class="grey darken-4" dark dense>
            <v-btn icon @click.native="show_dialog = false" dark>
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <v-toolbar-title v-text="'认证'" style="color:#FFE082;fontSize:16px;"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container fluid grid-list-md text-xs-center>
              <v-layout row wrap justify-center>
                <template v-if="confirm_type == 'base'">
                  <v-flex xs11>
                    <div class="subhead-container">
                      <h2 class="subhead gold-text">身份认证</h2>
                      <h3 class="subhead-detail"></h3>
                    </div>
                  </v-flex>
                  <v-flex xs11>
                    <v-text-field :disabled="is_loading" :error="name_error" :rules="[rules.name,]" dark clearable color="amber lighten-4" name="" :label="'请输入姓名'" v-model="name" class="input-content-username" key="name"></v-text-field>
                    <v-text-field :disabled="is_loading" :error="idcard_error" :rules="[rules.idcard,]" dark clearable color="amber lighten-4" name="" :label="'请输入身份证号码'" v-model="idcard" class="input-content-username" key="idcard"></v-text-field>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn @click.native="base_confirm" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>认证</v-btn>
                  </v-flex>
                </template>
                <template v-else>
                  <v-flex xs11>
                    <div class="subhead-container">
                      <h2 class="subhead gold-text">高级认证</h2>
                      <h3 class="subhead-detail"></h3>
                    </div>
                  </v-flex>
                  <v-flex xs11>
                    <van-uploader :after-read="onRead">
                     <v-icon large color="blue-grey darken-2">camera</v-icon><span class="gold-text">点击选择图片</span>
                    </van-uploader>
                    <template v-for="(i, index) in upload_photos">
                      <img src="i" :key="index">
                    </template>
                  </v-flex>
                  <v-flex xs11>
                    <v-btn @click.native="advance_confirm" :loading="is_loading" :disabled="is_loading" block class="login-button" color="amber lighten-4" large>认证</v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>
<script>
export default {
  name: 'Profile',
  data() {
    return {
      activde_tab: 0,
      show_dialog: false,
      name: '',
      idcard: '',
      is_loading: false,
      name_error: false,
      idcard_error: false,
      confirm_type: '',
      upload_photos: [],
      items: {
        sfrz_items: {
          title: '身份认证',
          subtitle: '请如实填写您的身份信息，一经认证不可修改',
          content: [{
              icon: 'mdi-account',
              title: '实名认证',
              subtitle: '柳成萌 350000000000000',
              action: '已认证',
            },
            {
              icon: 'mdi-account-card-details',
              title: '高级认证',
              subtitle: '您还未进行高级认证',
              action: '添加',
            },
          ]
        },
        zhaq_items: {
          title: '账户安全',
          subtitle: '安全等级：中',
          content: [{
              icon: 'mdi-email',
              title: '邮件',
              subtitle: '已绑定',
              action: '关闭',
            },
            {
              icon: 'mdi-cellphone',
              title: '手机',
              subtitle: '已绑定',
              action: '关闭',
            }, {
              icon: 'mdi-google',
              title: '谷歌验证码',
              subtitle: '未绑定',
              action: '绑定',
            },
            {
              icon: 'lock',
              title: '登录密码',
              subtitle: '******',
              action: '修改',
            }, {
              icon: 'mdi-cash-usd',
              title: '资金密码',
              subtitle: '******',
              action: '重置',
            }
          ],
        },
        qtne_items: {
          title: '其他内容',
          subtitle: '',
          content: [{
              icon: 'face',
              title: '在线客服',
              subtitle: 'forest@forest.com',
              action: '在线咨询',
            }, {
              icon: 'mdi-at',
              title: '邮件咨询',
              subtitle: 'forest@forest.com',
              action: '发送邮件',
            },
            {
              icon: 'mdi-phone-in-talk',
              title: '电话咨询',
              subtitle: '123456',
              action: '拨打电话',
            }, {
              icon: 'mdi-cached',
              title: '清除缓存',
              subtitle: '当前已用缓存10M',
              action: '清除',
            },
          ],
        },
      },
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
      }
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    onRead(file) {
      this.upload_photos.push(file.content)
      console.log(file)
    },
    click_action(type, action) {
      console.log(type, action)
      switch (type) {
        case '实名认证':
          this.confirm_type = 'base';
          this.show_dialog = true;
          break;
        case '高级认证':
          this.upload_photos = [];
          this.confirm_type = 'advance';
          this.show_dialog = true;
          break;
        case '邮件咨询':
          console.log('this')
          window.location.href = "mailto:forest@forest.com"
          break;
        case '电话咨询':
          window.location.href = "tel:123456"
          break;
      }
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

.main-container {
  background-image: url(../assets/img/road.jpg);
  background-size: cover;
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
  margin-bottom: 20px;
  background-size: cover;
}


.avatar {
  /*margin-top: 20px;*/
  width: 100px;
  height: 100px;
  border-radius: 100px
}

.input-content-username {
  margin-top: 20px;
}

</style>
