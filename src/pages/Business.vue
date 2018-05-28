<template>
  <div>
    <v-tabs slot="extension" centered v-model="activated_tab" slider-color="amber lighten-4" color="transparent" grow height="40">
      <v-tab v-for="item in categarys" :key="item">
        <span class="gold-text">{{ item }}</span>
      </v-tab>
    </v-tabs>
    <div v-if="!if_loaded">
      <v-progress-circular indeterminate color="amber lighten-4"></v-progress-circular>
    </div>
    <div v-else>
      <!-- <div style="height:10px;background-color:#424242;"></div> -->
      <v-tabs-items v-model="activated_tab">
        <v-tab-item>
          <v-card color="grey darken-3">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card color="grey darken-4">
                  <v-container text-xs-center class="pb-0 mb-0">
                    <v-layout justify-center row wrap>
                      <v-flex xs12 class="caption grey-text">总收益</v-flex>
                      <v-flex xs12 class="headline gold-text">{{total_earn}}</v-flex>
                      <v-flex xs6 class="my-2">
                        <v-btn block flat :color="wallet_type == 0 ? 'amber lighten-4':'grey darken-2'" @click.native="wallet_type = 0">
                          资产管理
                        </v-btn>
                      </v-flex>
                      <v-flex xs6 class="my-2">
                        <v-btn block flat :color="wallet_type == 1 ? 'amber lighten-4':'grey darken-2'" @click.native="wallet_type = 1">
                          交易记录
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
            <v-container v-show="wallet_type == 0" fluid style="min-height: 0;" grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 v-for="(i ,index) in assets">
                  <v-card color="grey darken-4">
                    <v-container text-xs-center>
                      <v-layout justify-center row wrap>
                        <v-flex xs12 class="headline gold-text">{{i.type}}</v-flex>
                        <v-flex xs6 class="caption grey-text py-0">持有</v-flex>
                        <v-flex xs6 class="caption grey-text py-0">占比</v-flex>
                        <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.proportion}}</span></v-flex>
                        <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.conceive}}</span></v-flex>
                        <transition name="van-fade">
                          <v-flex xs12 class="headline gold-text" v-if="hold_entrust_list && i.type == '持有委托'">
                            <template v-for="(i ,index) in my_entrusts">
                              <v-divider class="grey darken-3"></v-divider>
                              <v-card flat color="grey darken-4">
                                <v-card-title primary-title class="pt-3">
                                  <v-container text-xs-center class="py-0 my-0">
                                    <v-layout justify-center row wrap>
                                      <v-flex xs12 class="title gold-text">{{i.type}}</v-flex>
                                      <v-flex xs12 class="title gold-text"><small>剩余{{i.benefit}}天</small></v-flex>
                                      <v-flex xs6 class="caption grey-text py-0">预期年化</v-flex>
                                      <v-flex xs6 class="caption grey-text py-0">持有币数</v-flex>
                                      <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span>%<span v-if="i.benefit_add">{{i.benefit_add_type + i.benefit_add + '%'}}</span></v-flex>
                                      <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.benefit}}</span></v-flex>
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
        <v-tab-item class="grey darken-4">
          <v-card color="grey darken-2" v-for="(i ,index) in entrusts" class="my-3 mx-3">
            <v-container fluid grid-list-lg class="px-0 pb-0 pt-2">
              <v-layout row wrap>
                <v-flex xs12 class="title gold-text px-3">{{i.groupname}} <small class="grey-text">{{i.count}}款</small></v-flex>
                <v-flex xs12>
                  <v-card color="grey darken-3">
                    <v-card-title primary-title>
                      <v-container text-xs-center class="py-0 my-0">
                        <v-layout justify-center row wrap>
                          <v-flex xs12 class="title gold-text">{{i.items[0].type}} </v-flex>
                          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
                          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.items[0].benefit}}</span>%<span v-if="i.items[0].benefit_add">{{i.items[0].benefit_add_type + i.items[0].benefit_add + '%'}}</span></v-flex>
                          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{i.items[0].benefit}}</span>天</v-flex>
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
              <v-card-actions class="grey darken-2 pt-0">
                <v-spacer></v-spacer>
                <v-btn block flat dark @click.native="wanna_buy(i.items)"><span class="gold-text">查看更多 ></span></v-btn>
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
        <v-card tile class="grey darken-4">
          <v-toolbar class="grey darken-4" dark dense>
            <v-btn icon @click.native="show_dialog = false" dark>
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn>
            <v-toolbar-title v-text="'购买'" style="color:#FFE082;fontSize:16px;"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <button @click="swipe_swiper">click</button>
            <v-container fluid grid-list-md text-xs-center>
              <van-swipe :show-indicators="false" @change.self="select_entrust" ref="swipe">
                <van-swipe-item v-for="current_item in current_items" style="200px">
                  <v-layout row wrap justify-center>
                    <v-flex xs12 class="title gold-text my-2">{{current_item.type}} </v-flex>
                    <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
                    <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
                    <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>%<span v-if="current_item.benefit_add">{{current_item.benefit_add_type + current_item.benefit_add + '%'}}</span></v-flex>
                    <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>天</v-flex>
                    <v-flex xs12 class="gold-text py-0">
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
                    <v-flex xs10 class="mr-5">
                      <v-text-field color="amber lighten-4" :disabled="is_loading" :label="'剩余可投入' + current_item_detail.RestCoinNum + ' ' + current_item_detail.CoinName" dark v-model="trade_amount" type="number"></v-text-field>
                    </v-flex>
                    <v-flex class="quit-button" xs10>
                      <v-btn dark block color="amber lighten-4" style="color:black" large :loading="is_loading" :disabled="is_loading" @click.native.stop="ready_buy">立即投入</v-btn>
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
            <v-btn flat @click.native="confirm_dialog = false">
              <v-icon color="amber lighten-3">close</v-icon>
            </v-btn> <span class="headline gold-text " style="margin: 0 auto">确认付款</span>
            <v-btn flat>
              <v-icon color="amber lighten-3"></v-icon>
            </v-btn>
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
      commits: [
        // { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        // { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' },
        // { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        // { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' },
        // { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        // { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        // { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' }
      ],
      assets: [
        // { type: '余币宝', proportion: '22.3%', conceive: '2000', amount: '1320' },
        // { type: '持有委托', proportion: '22.3%', conceive: '3000', amount: '1000' },
        // { type: '量化', proportion: '22.3%', conceive: '4000', amount: '1320' },
        // { type: '杠杆', proportion: '22.3%', conceive: '5000', amount: '1250' }
      ],
      entrusts: [{
          groupname: '新手专享',
          count: '5',
          items: [{ id: '1', type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
            { id: '2', type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', time: '90', atleast: '1000', expmoney: 'no' },
            { id: '3', type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
            { id: '4', type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' },
            { id: '5', type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
          ]
        },
        {
          groupname: '红包专场',
          count: '6',
          items: [{ id: '11', type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
            { id: '6', type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' },
            { id: '7', type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
            { id: '8', type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', time: '90', atleast: '1000', expmoney: 'no' },
            { id: '9', type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
            { id: '10', type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' }
          ]
        },
      ],
      my_entrusts: [{ id: '1', type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', hold: '1', time: '7', atleast: '1000', expmoney: 'yes' },
        { id: '2', type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', hold: '12', time: '90', atleast: '1000', expmoney: 'no' },
        { id: '3', type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', hold: '13', time: '30', atleast: '5000', expmoney: 'yes' },
        { id: '4', type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', hold: '1111', time: '7', atleast: '10000', expmoney: 'yes' },
        { id: '5', type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', hold: '12222', time: '7', atleast: '1000', expmoney: 'yes' },
      ]
    }
  },
  computed: {

  },
  created() {
    this.getWallet({
      ID: 'test@sina.com'
    }).then(response => {
      if (response.data.Result.Status == 0) {
        this.total_earn = response.data.AllEarn;
        let temp_assets = [
          { type: '余币宝', proportion: response.data.Asset[response.data.AssRestIndex].Prop, conceive: response.data.Asset[response.data.AssRestIndex].Num },
          { type: '持有委托', proportion: response.data.Asset[response.data.AssHoldIndex].Prop, conceive: response.data.Asset[response.data.AssHoldIndex].Num },
          { type: '量化', proportion: response.data.Asset[response.data.AssQuanIndex].Prop, conceive: response.data.Asset[response.data.AssQuanIndex].Num },
          { type: '杠杆', proportion: response.data.Asset[response.data.AssLeverIndex].Prop, conceive: response.data.Asset[response.data.AssLeverIndex].Num }
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
        let temp_entrusts = response.data.EnstustItems.map(item => {
          return {
            type: item.Name,
            benefit: item.Earn,
            benefit_add: item.OffsetEarn,
            benefit_add_type: item.OffsetPlus == 1 ? '+' : (item.OffsetPlus == 2 ? '-' : '±'),
            time: item.Expires,
            atleast: item.BaseLine,
            expmoney: 'no',
            id: item.ID,
          }
        })
        // this.entrusts = temp_entrusts;
      } else {

      }
    }).catch(error => {

    });

  },
  methods: {
    ...mapActions('business', [
      'getWallet', 'getMyEntrust', 'getAvailableEntrustList', 'getEntrustDetail', 'buyEntrust', 'convertPrice'
    ]),
    select_entrust(i) {
      if (this.select_entrust_index == i) {
        return;
      } else {
        this.trade_amount = '';
        this.select_entrust_index = i;
        this.current_item = this.current_items[i];
        this.is_loading = true;
        this.getEntrustDetail({ EntrustID: this.current_item.id }).then(response => {
          if (response.data.Result.Status == 0) {
            this.current_item_detail = response.data;
          } else {
            this.current_item_detail = {
              CoinName: 'EOS', //币名称
              RestCoinNum: Math.random() * 100000, //剩余币数量
              CoinID: '666', //币类型唯一标识
            };
          }
          this.is_loading = false;
        }).catch(error => {

        });
      }
    },
    wanna_buy(i) {
      this.current_items = i;
      this.show_dialog = true;
    },
    ready_buy() {
      if (!this.trade_amount) {
        this.$toast('投入币数不能为空')
      } else if (+this.trade_amount < +this.current_items[this.select_entrust_index].atleast) {
        this.$toast('投入币数不能小于起投数')
      } else if (+this.trade_amount > +this.current_item_detail.RestCoinNum) {
        this.$toast('投入币数不能大于剩余币数')
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
        EntrustID: '1',
        DealID: this.tradeid,
        Pwd: this.tradepwd,
        CoinName: this.trade_amount,
      }).then(response => {
        if (response.data.Result.Status == 0) {
          this.tradeid = '';
          this.tradepwd = '';
          this.trade_amount = '';
          this.$toast('投入【' + this.current_item.type + '】成功');
          this.is_loading = false;
          this.is_trading = false;
          this.confirm_dialog = false;
          this.show_dialog = false;
        } else {

        }
      }).catch(error => {

      })
    },
    get_my_entrusts() {
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
          }
        } else {

        }
      })
    },
    swipe_swiper() {
      this.$refs.swipe.autoPlay()
    }
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
  color: #EF5350;
}

.sell-text {
  color: #66BB6A;
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

</style>
