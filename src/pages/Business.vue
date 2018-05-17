<template>
  <div>
    <v-tabs slot="extension" centered v-model="activated_tab" slider-color="amber lighten-4" color="transparent" grow height="40">
      <v-tab v-for="item in categarys" :key="item">
        <span class="gold-text">{{ item }}</span>
      </v-tab>
    </v-tabs>
    <div style="height:10px;background-color:#424242;"></div>
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
                    </v-layout>
                  </v-container>
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
              <v-btn block flat dark @click.native="wanna_buy()"><span class="gold-text">立即购买</span></v-btn>
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
</v-tab-item>
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
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap justify-center>
          <v-flex xs12 class="title gold-text">{{current_item.type}} </v-flex>
          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>%<span v-if="current_item.benefit_add">{{current_item.benefit_add_type + current_item.benefit_add + '%'}}</span></v-flex>
          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>天</v-flex>
          <v-flex xs12 class="gold-text py-0">
            <v-chip v-if="current_item.expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
            <v-chip v-if="current_item.atleast" small color="amber lighten-4" text-color="grey darken-4">{{current_item.atleast}}起投</v-chip>
          </v-flex>
          <v-flex xs9>
            <v-slider :disabled="is_loading" dark label="数量" :min="current_item.atleast" :max="max_amount" v-model="amount" :track-color="'grey lighten-2'" :thumb-color="'amber lighten-4'" :color="'amber lighten-4'"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field :disabled="is_loading" dark v-model="amount" type="number"></v-text-field>
          </v-flex>
          <v-flex class="quit-button" xs10>
            <v-btn dark block color="amber lighten-4" style="color:black" large :loading="is_loading" :disabled="is_loading" @click.native="real_buy">立即投入</v-btn>
          </v-flex>
          <v-flex xs12>
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
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Business',
  data() {
    return {
      activated_tab: "0",
      max_amount: 9999,
      amount: 0,
      total_earn: '',
      show_dialog: false,
      current_item: {},
      is_loading: false,
      categarys: ['钱包', '委托', '量化', '杠杆'],
      wallet_type: 0,
      commits: [
        { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' },
        { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' },
        { type: 'BTC', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'ETH', action: 'sell', time: '2018-4-19 21:09', amount: '1000', detail: '卖出0.04' },
        { type: 'XRP', action: 'buy', time: '2018-4-19 21:09', amount: '1320', detail: '买入0.02' },
        { type: 'BCH', action: 'buy', time: '2018-4-19 21:09', amount: '1250', detail: '买入0.02' }
      ],
      assets: [
        { type: '余币宝', proportion: '22.3%', conceive: '2000', amount: '1320' },
        { type: '持有委托', proportion: '22.3%', conceive: '3000', amount: '1000' },
        { type: '量化', proportion: '22.3%', conceive: '4000', amount: '1320' },
        { type: '杠杆', proportion: '22.3%', conceive: '5000', amount: '1250' }
      ],
      entrusts: [
        { type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
        { type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', time: '90', atleast: '1000', expmoney: 'no' },
        { type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
        { type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' },
        { type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
        { type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', time: '90', atleast: '1000', expmoney: 'no' },
        { type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
        { type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' },
        { type: '新手万元户投标方案', benefit: '22.3', benefit_add: '5', benefit_add_type: '+', time: '7', atleast: '1000', expmoney: 'yes' },
        { type: '向日葵90天方案', benefit: '7', benefit_add: '1', benefit_add_type: '+', time: '90', atleast: '1000', expmoney: 'no' },
        { type: '蒲公英30天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '30', atleast: '5000', expmoney: 'yes' },
        { type: '木棉花7天方案', benefit: '22.3', benefit_add: '', timebenefit_add_type: '+', time: '7', atleast: '10000', expmoney: 'yes' }
      ],

      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
    }).catch(error => {

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
          }
        })
        this.entrusts = temp_entrusts;
      } else {

      }
    }).catch(error => {

    });

  },
  methods: {
    ...mapActions('business', [
      'getWallet', 'getAvailableEntrustList', 'getEntrustDetail'
    ]),
    wanna_buy(i) {
      this.current_item = i;
      this.show_dialog = true;
      this.getEntrustDetail().then(response => {
        if (response.data.Result.Status == 0) {

        } else {

        }
      }).catch(error => {

      });
    },
    real_buy() {
      this.is_loading = true;
      setTimeout(() => {
        this.$toast('投入【' + this.current_item.type + '】成功');
        this.is_loading = false;
        this.show_dialog = false;
      }, 2000);
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

</style>
