<template>
  <div class="main-container">
    <v-tabs slot="extension" centered v-model="activated_tab" slider-color="amber lighten-4" color="transparent" grow height="40">
      <v-tab v-for="item in categarys" :key="item">
        <span class="gold-text">{{ item }}</span>
      </v-tab>
    </v-tabs>
    <div v-if="!if_loaded">
      <div class="text-xs-center" style="height:200px;align:center;margin-top:80px">
        <v-progress-circular indeterminate color="amber lighten-4"></v-progress-circular>
        <br><span class="gold-text">数据加载中</span>
      </div>
    </div>
    <div v-else>
      <!-- <div style="height:10px;background-color:#424242;"></div> -->
      <v-tabs-items v-model="activated_tab">
        <v-tab-item>
          <v-card color="transparent">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card style="background-color:#21212177">
                  <v-container text-xs-center class="pb-0 mb-0">
                    <v-layout justify-center row wrap>
                      <v-flex xs12 class="caption grey-text">总收益</v-flex>
                      <v-flex xs12 class="headline gold-text">{{total_earn}}</v-flex>
                      <v-flex xs4 class="my-2 ml-2">
                        <v-btn color="amber lighten-4" @click.native="take_in">
                          充币
                        </v-btn>
                      </v-flex>
                      <v-flex xs4 class="my-2 mr-2">
                        <v-btn color="amber lighten-4" @click.native="take_out">
                          提币
                        </v-btn>
                      </v-flex>
                      <v-flex xs6 class="my-2">
                        <v-btn block flat :color="wallet_type == 0 ? 'amber lighten-4':'grey darken-2'" @click.native="wallet_type = 0">
                          资产管理
                        </v-btn>
                      </v-flex>
                      <v-flex xs6 class="my-2">
                        <v-btn block flat :color="wallet_type == 1 ? 'amber lighten-4':'grey darken-2'" @click.native="wallet_type = 1">
                          持有币
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
            <v-container v-show="wallet_type == 0" fluid style="min-height: 0;" grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 v-for="(i ,index) in assets" :key="index">
                  <v-card style="background-color:#212121AA">
                    <v-container text-xs-center>
                      <v-layout justify-center row wrap>
                        <v-flex xs12 class="headline gold-text">{{i.type}}</v-flex>
                        <v-flex xs6 class="caption grey-text py-0">持有</v-flex>
                        <v-flex xs6 class="caption grey-text py-0">占比</v-flex>
                        <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.conceive}}</span></v-flex>
                        <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.proportion}}<small>%</small></span></v-flex>
                        <transition name="van-fade">
                          <v-flex xs12 class="headline gold-text" v-if="hold_entrust_list && i.type == '持有委托'">
                            <template v-for="(i ,index) in my_entrusts">
                              <v-divider class="grey darken-3"></v-divider>
                              <v-card flat color="grey darken-4">
                                <v-card-title primary-title class="pt-3">
                                  <v-container text-xs-center class="py-0 my-0">
                                    <v-layout justify-center row wrap>
                                      <v-flex xs12 class="title gold-text">{{i.type}}</v-flex>
                                      <v-flex xs12 class="title gold-text"><small>剩余{{i.time}}天</small></v-flex>
                                      <v-flex xs6 class="caption grey-text py-0">预期年化</v-flex>
                                      <v-flex xs6 class="caption grey-text py-0">持有币数</v-flex>
                                      <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span>%<span v-if="i.benefit_add">{{i.benefit_add_type + i.benefit_add + '%'}}</span></v-flex>
                                      <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.hold}}</span></v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-title>
                              </v-card>
                              <v-divider v-if="index == my_entrusts.length - 1" class="grey darken-3"></v-divider>
                            </template>
                          </v-flex>
                        </transition>
                      </v-layout>
                    </v-container>
                    <v-card-actions class="grey darken-4 pt-0" v-if="i.type == '持有委托'">
                      <v-spacer></v-spacer>
                      <v-btn block flat dark @click.native="get_my_entrusts"><span class="gold-text">{{hold_entrust_list ? '收起 >' : '查看详细'}} ></span></v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-actions class="grey darken-4 pt-0" v-else>
                      <v-spacer></v-spacer>
                      <v-btn block flat dark @click.native="get_my_others"><span class="gold-text">查看详细</span></v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card v-show="wallet_type == 1">
              <v-list class="list-background">
                <template v-for="(i ,index) in commits">
                  <v-list-tile :key="i.title" avatar @click="">
                    <v-list-tile-avatar>
                      <span class="gold-text">{{i.type}}</span>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><span :class="[i.action =='sell'?'sell-text':'buy-text', 'body-1']">{{ i.detail }}</span></v-list-tile-title>
                      <v-list-tile-sub-title><span :class="[i.action =='sell'?'sell-text':'buy-text', 'caption']">{{i.time}}</span></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <span class="display-1 gold-text">{{i.amount}}</span>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider dark inset v-if="index + 1< commits.length" :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card style="background-color:#21212188" v-for="(i ,index) in entrusts" class="my-3 mx-3" :key="index">
            <v-container fluid grid-list-lg class="px-0 pb-0 pt-2">
              <v-layout row wrap>
                <v-flex xs12 class="title gold-text px-3">{{i.groupname}} <small class="grey-text">{{i.count}}款</small></v-flex>
                <v-flex xs12>
                  <v-card style="background-color:#212121AA">
                    <v-card-title primary-title>
                      <v-container text-xs-center class="py-0 my-0">
                        <v-layout justify-center row wrap>
                          <v-flex xs12 class="title gold-text">{{i.items[0].type}} </v-flex>
                          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
                          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.items[0].benefit}}</span>%<span v-if="i.items[0].benefit_add">{{i.items[0].benefit_add_type + i.items[0].benefit_add + '%'}}</span></v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.items[0].time}}</span>天</v-flex>
                          <v-flex xs12 class="gold-text py-0">
                            <v-chip v-if="i.items[0].expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
                            <v-chip v-if="i.items[0].atleast" small color="amber lighten-4" text-color="grey darken-4">{{i.items[0].atleast}}起投</v-chip>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn style="background-color:#212121AA" block flat dark @click.native="wanna_buy(i.items)"><span class="gold-text">查看详细 ></span></v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-tab-item>
        <!--  <v-tab-item>
          <v-card color="grey darken-3" v-for="(i ,index) in entrusts">
            <v-container fluid grid-list-lg class="py-0 my-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card color="grey darken-4">
                    <v-card-title primary-title>
                      <v-container text-xs-center class="py-0 my-0">
                        <v-layout justify-center row wrap>
                          <v-flex xs12 class="title gold-text">{{i.type}} </v-flex>
                          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
                          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span>%<span v-if="i.benefit_add">{{i.benefit_add_type + i.benefit_add + '%'}}</span></v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.time}}</span>天</v-flex>
                          <v-flex xs12 class="gold-text py-0">
                            <v-chip v-if="i.expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
                            <v-chip v-if="i.atleast" small color="amber lighten-4" text-color="grey darken-4">{{i.atleast}}起投</v-chip>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-title>
                    <v-card-actions class="">
                      <v-spacer></v-spacer>
                      <v-btn block flat dark @click.native="wanna_buy(i)"><span class="gold-text">立即购买</span></v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card color="grey darken-3" v-for="(i ,index) in entrusts">
            <v-container fluid grid-list-lg class="py-0 my-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card color="grey darken-4">
                    <v-card-title primary-title>
                      <v-container text-xs-center class="py-0 my-0">
                        <v-layout justify-center row wrap>
                          <v-flex xs12 class="title gold-text">{{i.type}} </v-flex>
                          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
                          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span>%<span v-if="i.benefit_add">{{i.benefit_add_type + i.benefit_add + '%'}}</span></v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span>天</v-flex>
                          <v-flex xs12 class="gold-text py-0">
                            <v-chip v-if="i.expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
                            <v-chip v-if="i.atleast" small color="amber lighten-4" text-color="grey darken-4">{{i.atleast}}起投</v-chip>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-title>
                    <v-card-actions class="">
                      <v-spacer></v-spacer>
                      <v-btn block flat dark @click.native="wanna_buy(i)"><span class="gold-text">立即购买</span></v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item> -->
      </v-tabs-items>
      <v-dialog v-model="show_dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card tile class="main-container">
          <v-toolbar class="grey darken-4" dark dense>
            <v-btn icon @click.native="show_dialog = false" dark>
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <v-toolbar-title v-text="'购买'" style="color:#FFE082;fontSize:16px;"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <!-- <button @click="swipe_swiper">click</button> -->
            <v-container fluid grid-list-md text-xs-center>
              <van-swipe :show-indicators="false" @change.self="select_entrust" ref="swipe">
                <van-swipe-item v-for="current_item in current_items" :key="current_item.id">
                  <v-layout row wrap justify-center align-content-center align-center>
                    <v-flex xs12 class="title gold-text my-5">{{current_item.type}} </v-flex>
                    <v-flex xs6 class="caption grey-text py-2">预期年化率</v-flex>
                    <v-flex xs6 class="caption grey-text py-2">剩余抢购时间</v-flex>
                    <v-flex xs6 class="gold-text py-2"><span class="display-1">{{current_item.benefit}}</span>%<span v-if="current_item.benefit_add">{{current_item.benefit_add_type + current_item.benefit_add + '%'}}</span></v-flex>
                    <v-flex xs6 class="gold-text py-2"><span class="display-1">{{current_item.time}}</span>天</v-flex>
                    <v-flex xs12 class="gold-text py-2">
                      <v-chip v-if="current_item.expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
                      <v-chip v-if="current_item.atleast" small color="amber lighten-4" text-color="grey darken-4">{{current_item.atleast}}起投</v-chip>
                    </v-flex>
                    <!--  <v-flex xs9>
            <v-slider :disabled="is_loading" dark label="数量" :min="current_item.atleast" :max="max_amount" v-model="amount" :track-color="'grey lighten-2'" :thumb-color="'amber lighten-4'" :color="'amber lighten-4'"></v-slider>
          </v-flex> -->
                    <!-- <v-flex xs12 class="my-4">
                      <v-stepper vertical dark>
                        <v-stepper-step step="1" complete>
                          授权投标
                          <small>当日计息</small>
                        </v-stepper-step>
                        <v-stepper-content step="1"></v-stepper-content>
                        <v-stepper-step step="2" complete>出借到期<small>2018.04.26</small></v-stepper-step>
                        <v-stepper-content step="2"></v-stepper-content>
                        <v-stepper-step step="3">退出成功<small>出借结束</small></v-stepper-step>
                        <v-stepper-content step="3"></v-stepper-content>
                      </v-stepper>
                    </v-flex> -->
                    <v-flex xs10 class="mx-5">
                      <v-text-field color="amber lighten-4" :disabled="is_loading" :label="'剩余可投入' + current_item_detail.RestCoinNum + ' ' + current_item_detail.CoinName" dark v-model="trade_amount" type="number"></v-text-field>
                    </v-flex>
                    <v-flex class="quit-button mx-5" xs10>
                      <v-btn class="pb-10" dark block color="amber lighten-4" style="color:black" large :loading="is_loading" :disabled="is_loading" @click.native.stop="ready_buy">立即投入</v-btn>
                    </v-flex>
                  </v-layout>
                </van-swipe-item>
              </van-swipe>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirm_dialog" max-width="600" persistent>
        <v-card dark>
          <v-card-title>
            <v-btn flat absolute @click.native="confirm_dialog = false">
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <span class="headline gold-text " style="margin: 0 auto">确认付款</span>
          </v-card-title>
          <v-card-text ml-2>您购买的 <big class="gold-text">{{current_item.type}}</big></v-card-text>
          <v-card-text ml-2><big class="gold-text">总价：</big>{{trade_amount}} {{current_item_detail.CoinName}}</v-card-text>
          <v-card-text ml-2><big class="gold-text">折合：</big>{{trade_usdt_amount}} {{trade_usdt_name}}</v-card-text>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="is_trading" dark clearable color="amber lighten-4" name="" :label="'请输入交易ID'" v-model="tradeid" class="input-content-tradeid" key="tradeid"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="is_trading" dark color="amber lighten-4" name="" label="请输支付密码" v-model="tradepwd" class="input-content-tradepwd" key="tradepwd"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn color="amber lighten-4" :disabled="is_trading" @click.native="real_buy" class="real-buy-btn mb-3" large block>投入</v-btn>
            <!-- <v-btn dark color="red darken-2" >取消</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="take_in_dialog" max-width="600" persistent>
        <v-card dark>
          <v-card-title>
            <v-btn flat absolute @click.native="take_in_dialog = false">
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <span class="headline gold-text " style="margin: 0 auto">充币</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select dark color="amber lighten-4" item-text="Name" :items="take_in_items" v-model="take_in_item" label="选择币种" single-line></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="true" v-if="take_in_item" dark color="amber lighten-4" name="" :label="'充币地址'" v-model="take_in_addr" class="input-content-tradeid" key="take_in_addr"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="is_trading" dark clearable color="amber lighten-4" name="" :label="'请输入充币数量'" v-model="take_in_id" class="input-content-tradeid" key="take_in_id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="is_trading" dark clearable color="amber lighten-4" name="" :label="'请输入交易ID'" v-model="take_in_count" class="input-content-tradeid" key="take_in_count"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :disabled="is_trading" dark color="amber lighten-4" name="" label="请输入支付密码" v-model="take_in_pwd" class="input-content-tradepwd" key="take_in_pwd"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn dark color="amber lighten-4" :disabled="is_trading" @click.native="real_take_in" class="mb-3 grey-text" large block>确认充值</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="take_out_dialog" max-width="600" persistent>
        <v-card dark>
          <v-card-title>
            <v-btn flat absolute @click.native="take_out_dialog = false">
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <span class="headline gold-text " style="margin: 0 auto">提币</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select dark color="amber lighten-4" :items="take_out_items" v-model="take_out_item" label="选择币种" single-line></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field disabled dark color="amber lighten-4" v-model="take_out_addr" textarea class="input-content-tradeid" key="take_out_addr"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="amber lighten-4" @click.native="real_take_out" class="mb-3 grey-text" large block>长按地址复制</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Business',
  data() {
    return {
      hold_entrust_list: false,
      select_entrust_index: -1,
      if_loaded: false,
      is_trading: false,
      activated_tab: "0",
      max_amount: 9999,
      trade_amount: '',
      trade_leave_amount: '',
      trade_usdt_amount: '',
      trade_usdt_name: '',
      total_earn: '',
      show_dialog: false,
      confirm_dialog: false,
      current_items: [],
      current_item: {},
      current_item_detail: {},
      is_loading: true,
      tradeid: '',
      tradepwd: '',
      // categarys: ['钱包', '委托', '量化', '杠杆'],
      categarys: ['钱包', '委托', ],
      wallet_type: 0,
      commits: [],
      assets: [],
      entrusts: [],
      my_entrusts: [],
      take_in_dialog: false,
      take_out_dialog: false,
      take_in_count: '',
      take_in_id: '',
      take_in_addr: '',
      take_in_pwd: '',
      take_in_items: [],
      take_in_item: null,
      take_out_addr: '',
      take_out_addr_USDT: '12dzV3VvowPWNMpt5WJ6sgZMuwq6EAMiF3',
      take_out_addr_EOS: '等待主网上线，暂停充值',
      take_out_addr_BTC: '12dzV3VvowPWNMpt5WJ6sgZMuwq6EAMiF3',
      take_out_addr_ETH: '0x1e59f24a00166e7c944cb185a850649b8a20de0d',
      take_out_items: ['USDT', 'EOS', 'BTC', 'ETH'],
      take_out_item: 'USDT',

    }
  },
  computed: {

  },
  watch: {
    take_out_item: {
      handler: function(newVal, oldVal) {
        if (newVal == 'USDT') {
          this.take_out_addr = this.take_out_addr_USDT;
        }
        if (newVal == 'EOS') {
          this.take_out_addr = this.take_out_addr_EOS;
        }
        if (newVal == 'BTC') {
          this.take_out_addr = this.take_out_addr_BTC;
        }
        if (newVal == 'ETH') {
          this.take_out_addr = this.take_out_addr_ETH;
        }
      },
      immediate: true
    },
    take_in_item(newVal, oldVal) {
      this.take_in_addr = newVal.Address
    }
  },
  created() {
    this.getWallet({
      ID: 'test@sina.com'
    }).then(response => {
      if (response.data.Result.Status == 0) {
        this.total_earn = response.data.AllEarn;
        let temp_assets = [
          { type: '余币宝', proportion: response.data.Asset[response.data.AssRestIndex].Prop, conceive: this.handle_conceive(response.data.Asset[response.data.AssRestIndex].Num) },
          { type: '持有委托', proportion: response.data.Asset[response.data.AssHoldIndex].Prop, conceive: this.handle_conceive(response.data.Asset[response.data.AssHoldIndex].Num) },
          { type: '量化', proportion: response.data.Asset[response.data.AssQuanIndex].Prop, conceive: this.handle_conceive(response.data.Asset[response.data.AssQuanIndex].Num) },
          { type: '杠杆', proportion: response.data.Asset[response.data.AssLeverIndex].Prop, conceive: this.handle_conceive(response.data.Asset[response.data.AssLeverIndex].Num) }
        ];
        let temp_commits = response.data.Items.map(i => {
          return {
            type: i.Name,
            time: i.LastBuyTime,
            amount: i.LastBuyCount,
            detail: i.Count,
          }
        })
        this.assets = temp_assets;
        this.commits = temp_commits;
      } else {

      }
      this.if_loaded = true;
    }).catch(error => {
      this.if_loaded = true;
    });
    this.getAvailableEntrustList().then(response => {
      if (response.data.Result.Status == 0) {
        let temp_entrusts = [];
        let temp_entrusts_group = {};
        response.data.Types.forEach(group => {
          let temp_entrusts_item = []
          group.ItemsIndex.forEach(index => {
            let item = response.data.EnstustItems[index]
            temp_entrusts_item.push({
              type: item.Name,
              benefit: item.Earn,
              benefit_add: item.OffsetEarn,
              benefit_add_type: item.OffsetPlus == 1 ? '+' : (item.OffsetPlus == 2 ? '-' : '±'),
              time: item.Expires,
              atleast: item.BaseLine,
              expmoney: 'no',
              id: item.ID,
            })
          })
          let temp_entrusts_group = {
            groupname: group.Name,
            count: group.ItemsIndex.length,
            items: temp_entrusts_item
          }
          temp_entrusts.push(temp_entrusts_group)
        })
        this.entrusts = temp_entrusts;
      } else {

      }
    }).catch(error => {

    });

  },
  methods: {
    ...mapActions('business', [
      'getWallet', 'getMyEntrust', 'getAvailableEntrustList', 'getEntrustDetail', 'buyEntrust', 'convertPrice', 'queryRecharge', 'recharge'
    ]),
    select_entrust(i) {
      if (this.select_entrust_index == i) {
        return;
      } else {
        console.log(111111)
        this.trade_amount = '';
        this.select_entrust_index = i;
        this.current_item = this.current_items[i];
        this.is_loading = true;
        this.getEntrustDetail({ EntrustID: this.current_item.id }).then(response => {
          if (response.data.Result.Status == 0) {
            this.current_item_detail = response.data;
          } else {
            this.$toast(response.data.Result.FaultMsg);
            // this.current_item_detail = {
            //   CoinName: 'EOS', //币名称
            //   RestCoinNum: Math.random() * 100000, //剩余币数量
            //   CoinID: '666', //币类型唯一标识
            // };
          }
          this.is_loading = false;
        }).catch(error => {

        });
      }
    },
    wanna_buy(i) {
      this.current_items = i;
      this.trade_amount = '';
      this.trade_usdt_amount = '';
      this.trade_usdt_name = '';
      this.show_dialog = true;
      this.select_entrust_index = -1;
      this.select_entrust(0);
      if (this.current_items.length > 1) {
        this.$toast('一共' + this.current_items.length + '款产品，请左右滑动切换')
      }
    },
    ready_buy() {
      if (!this.trade_amount) {
        this.$toast('投入币数不能为空')
      } else if (+this.trade_amount < +this.current_items[this.select_entrust_index].atleast) {
        this.$toast('投入币数不能小于起投数')
        // } else if (+this.trade_amount > +this.current_item_detail.RestCoinNum) {
        //   this.$toast('投入币数不能大于剩余币数')
      } else {
        this.convertPrice({
          CoinID: this.current_item_detail.CoinID,
          CoinNum: this.trade_amount,
        }).then(response => {
          if (response.data.Result.Status == 0) {
            this.trade_usdt_amount = response.data.LegalCount;
            this.trade_usdt_name = response.data.LegalName;
            this.confirm_dialog = true;
          } else {
            this.$toast('转化USDT失败')
          }
        }).catch(error => {
          console.log(error)
        });

      }
    },
    real_buy() {
      this.is_trading = true;
      this.buyEntrust({
        EntrustID: this.current_item.id,
        DealID: this.tradeid,
        Pwd: this.tradepwd,
        CoinName: this.trade_amount,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.tradeid = '';
          this.tradepwd = '';
          this.trade_amount = '';
          this.is_loading = false;
          this.is_trading = false;
          this.confirm_dialog = false;
          this.show_dialog = false;
          this.$toast('投入【' + this.current_item.type + '】成功');
        } else {
          this.tradeid = '';
          this.tradepwd = '';
          // this.trade_amount = '';
          this.is_loading = false;
          this.is_trading = false;
          // this.confirm_dialog = false;
          // this.show_dialog = false;
          this.$toast(response.data.Result.FaultMsg);
        }
      }).catch(error => {

      })
    },
    get_my_entrusts() {
      if (this.hold_entrust_list) {
        this.hold_entrust_list = false;
        return;
      }
      this.getMyEntrust().then(response => {
        if (response.data.Result.Status == 0) {
          if (response.data.Items.length == 0) {
            this.$toast('您还没有持有委托')
          } else {
            let temp_entrusts = response.data.Items.map(item => {
              return {
                type: item.Name,
                benefit: item.Earn,
                benefit_add: item.OffsetEarn,
                benefit_add_type: item.OffsetPlus == 1 ? '+' : (item.OffsetPlus == 2 ? '-' : '±'),
                time: item.Expires,
                atleast: item.BaseLine,
                expmoney: 'no',
                id: item.ID,
                hold: item.HoldCount,
              }
            })
            this.my_entrusts = temp_entrusts;
            this.hold_entrust_list = true;
          }
        } else {

        }
      })
    },
    get_my_others() {
      this.$toast('功能开发中')
    },
    swipe_swiper() {
      this.$refs.swipe.autoPlay()
    },
    handle_conceive(i) {
      i += '';
      console.log(i);
      if (i.length > 6 && i.indexOf('.') > -1) {
        return i.substring(0, i.indexOf('.') + 3);
      } else {
        return i
      }
    },
    take_in() {
      this.take_in_id = '';
      this.take_in_count = '';
      this.take_in_addr = '';
      this.take_in_pwd = '';
      this.take_in_item = '';
      this.queryRecharge().then(response => {
        if (response.data.Result.Status == 0) {
          this.take_in_items = response.data.Items;
          this.take_in_dialog = true;
        } else {
          this.$toast(response.data.Result.FaultMsg)
        }
      }).catch(error => {
        this.$toast('查询充值类型失败');
      })
    },
    take_out() {
      this.take_out_dialog = true;
    },
    real_take_in() {
      if (!this.take_in_id || !this.take_in_pwd || !this.take_in_count || !this.take_in_item.CoinID) {
        this.$toast('请输入必填信息');
        return;
      }
      this.is_trading = true;
      this.recharge({
        'CoinID': this.take_in_item.CoinID,
        'DealID': this.take_in_id,
        'Pwd': this.take_in_pwd,
        'AddNum': this.take_in_count,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.take_in_dialog = false;
          this.$toast('充值成功');
        } else {
          this.$toast(response.data.Result.FaultMsg)
        }
        this.is_trading = false;
      }).catch(error => {
        this.$toast('查询失败');
        this.is_trading = false;
      })

    },
    real_take_out() {
      this.take_out_dialog = false;
      this.toast('复制成功')
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.benefit {
  background-color: rgba(250, 250, 250, 0.7);
}

.list-background {
  background-color: #212121;
}

.grey-text {
  color: #E0E0E0;
}

.buy-text {
  color: #66BB6A;
}

.sell-text {
  color: #EF5350;
  /*color: #01579B;*/
}

.application .theme--light.list,
.theme--light .list {
  background-color: #212121;
  color: rgba(0, 0, 0, .87);
}

.input-content-tradeid {
  /*margin-top: 20px;*/
}

.input-content-tradepwd {
  /*margin-bottom: 20px;*/
}

.real-buy-btn {
  color: #212121;
  margin: 0 30px 10px;
}
























/*.application .theme--light.card,
.theme--light .card {
  background-color: transparent;
}*/

.application .theme--dark.btn,
.theme--dark .btn {
  color: #212121;
}

</style>
