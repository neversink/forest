<template>
  <div class="main-container">
    <van-swipe :autoplay="3000" class="swipe" @change="on_swipe_change">
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/banner1.png" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/banner2.png" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/banner3.png" />
      </van-swipe-item>
    </van-swipe>
    <div class="index-num-content">
      <van-notice-bar @click="click_notice" class="notice-bar" :text="notice_text" left-icon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
      <!-- <span class="index-num">指数</span> -->
      <div class="coin-info">
        <template v-for="coin in index">
          <div class="coin-item" :key="coin.type">
            <span class="body-2 coin-type">{{coin.type}}</span>
            <br>
            <span class="title coin-price" :style="{ color: coin.trend == 'up'?'#EF5350' : '#66BB6A'}">
              <span>
              {{coin.price}}
              <br><v-icon style="margin-left:-5px;padding-bottom:3px;" :color="coin.trend =='up'?'deep-orange darken-4': 'green lighten-1'">{{ coin.trend =='up'?'mdi-menu-up' : 'mdi-menu-down'}}</v-icon>
            </span>
            </span>
            <br>
            <span class="subheading coin-somewhat">{{coin.somewhat}}</span>
          </div>
        </template>
      </div>
    </div>
    <div v-if="indexSpecial != null" class="index-num-content">
      <v-tabs centered color="transparent" slot="extension" v-model="activated_tab" grow height="40">
        <v-tabs-slider color="amber lighten-4"></v-tabs-slider>
        <v-tab v-for="(val,key,index) in indexSpecial" :key="index" :href="`#tab-${index}`">
          <span class="gold-text">{{ key }}</span>
        </v-tab>
        <v-tabs-items>
          <v-tab-item v-for="(val,key,index) in indexSpecial" :key="index" :id="`tab-${index}`">
            <v-card>
              <v-list class="list-background">
                <template v-for="(i ,index) in val">
                  <v-list-tile :key="i.IndexItemID" avatar @click="">
                    <v-list-tile-avatar>
                      <span class="gold-text">{{i.Name}}</span>
                    </v-list-tile-avatar>
                    <v-list-tile-content class="ml-3">
                      <v-list-tile-title><span :class="['buy-text', 'body-1']">最高：{{ i.High }}</span></v-list-tile-title>
                      <v-list-tile-sub-title><span :class="['sell-text', 'body-1']">最低：{{i.Low}}</span></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <big class="Medium gold-text">${{i.USDIndex}}</big>
                      <small class="body-1 grey-text">成交手数{{i.Hand}}</small>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider dark inset v-if="index + 1< val.length" :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
    <div>
      <v-data-table :headers="headers" :items="indexDetail" class="elevation-1 transparent" dark hide-actions :pagination.sync="pagination">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <td class="subheading" :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}">{{ props.item.type }}</td>
          <td :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}" class="text-xs-right subheading">${{ props.item.price }}</td>
          <td :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}" class="text-xs-right subheading">{{(props.item.percent > 0 ?'+' : '') + props.item.percent }}%</td>
          <td :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}" class="text-xs-right subheading">{{ props.item.amount }}</td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template>
        <div slot="no-data" class="text-xs-center" style="height:200px;align:center;margin-top:80px">
          <v-progress-circular indeterminate color="amber"></v-progress-circular>
          <br>数据加载中
        </div>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      activated_tab: 'tab-0',
      notice_text: '32MB区块即将到来，BCH定于5月15日进行硬分叉，BCH网络将实现历史上最大的区块大小增长。',
      interval_id: '',
      pagination: {
        sortBy: 'percent',
        descending: true,
        rowsPerPage: -1

      },
      headers: [{
          text: '币种',
          align: 'left',
          sortable: true,
          value: 'type',
        },
        { text: '最新价', value: 'price', align: 'center', },
        { text: '涨跌幅', value: 'percent', align: 'center', },
        { text: '成交额', value: 'amount', align: 'center', },
      ],
      items: [{
          value: true,
          type: 'BTC',
          price: 159,
          amount: 159,
          percent: +1
        },
        {
          value: false,
          type: 'ETH',
          price: 237,
          amount: 237,
          percent: -1
        },
        {
          value: false,
          type: 'BTS',
          price: 262,
          amount: 262,
          percent: +7
        },
        {
          value: false,
          type: 'BCH',
          price: 305,
          amount: 305,
          percent: +8
        },
        {
          value: false,
          type: 'XRP',
          price: 356,
          amount: 356,
          percent: -16
        },
        {
          value: false,
          type: 'LTC',
          price: 375,
          amount: 375,
          percent: +0
        },
        {
          value: false,
          type: 'ETC',
          price: 392,
          amount: 392,
          percent: -2
        },
        {
          value: false,
          type: 'EOS',
          price: 408,
          amount: 408,
          percent: +45
        },
        {
          value: false,
          type: 'ANT',
          price: 452,
          amount: 452,
          percent: -22
        },
        {
          value: false,
          type: 'RIP',
          price: 518,
          amount: 518,
          percent: 6
        }
      ],
      coins: [
        { id: 'BTC/Bitinex1', type: 'BTC/Bitinex1', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { id: 'BTC/Bitinex2', type: 'BTC/Bitinex2', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { id: 'BTC/Bitinex3', type: 'BTC/Bitinex3', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { id: 'BTC/Bitinex4', type: 'BTC/Bitinex4', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { id: 'BTC/Bitinex5', type: 'BTC/Bitinex5', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { id: 'BTC/Bitinex6', type: 'BTC/Bitinex6', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { id: 'BTC/Bitinex7', type: 'BTC/Bitinex7', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { id: 'BTC/Bitinex8', type: 'BTC/Bitinex8', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  created() {
    this.getIndex().then(response => {

    }).catch(error => {

    })
    this.interval_id = setInterval(() => {
      console.log('getIndex')
      this.getIndex().then(response => {

      }).catch(error => {

      })
    }, 10000)
    this.getNotice().then(response => {
      response.data.Item.forEach(item => {
        this.notice_text += item.Info
      })
    });
    // this.getIndex().then(response => {

    // }).catch(error => {

    // })
    // this.getIndexDetail({
    //   'IndexItemID': 1
    // }).then(response => {

    // }).catch(error => {

    // })
  },
  destroyed() {
    clearInterval(this.interval_id)
  },
  computed: {
    ...mapGetters('home', [
      'notice', 'index', 'indexDetail', 'indexSpecial'
    ]),
  },
  watch: {

  },
  methods: {
    ...mapActions('home', [
      'getNotice', 'getIndex', 'getIndexDetail'
    ]),
    watch_more() {
      console.log('this')
      this.$router.push({
        name: 'Band'
      })
    },
    click_notice() {
      console.log('this')
    },
    goto_href(href) {
      if (!href) {
        this.$router.push({
          name: 'Article'
        })
      } else {
        this.$router.push({
          name: href
        })
      }
    },
    on_swipe_change(i) {
      console.log(i)
    }
  }
}

</script>
<style scoped>
.main-container {
  background-color: #212121;
}

.swipe {
  height: 200px;
  line-height: 210px;
  text-align: center;
}

.swipe-item {
  width: 100%;
}

.coin-type {
  /*color: #BDBDBD;*/
  color: #FFECB3;
}

.coin-price {
  /*color:#F44336;*/
  /*color: #EF5350;*/
}

.coin-somewhat {
  /*color: #BDBDBD;*/
  color: #FFECB3;
}

.gold-text {
  color: #FFECB3;
}

.grey-text {
  color: #E0E0E0;
}

.index-num-content {
  background-color: #42424244;
  margin: 15px 0;
}

.coin-info {
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  line-height: 15px;
}

.coin-item {
  width: 33%;
  max-width: 33%;
  margin: 0 10px 15px 10px;
}

.notice-bar {
  color: #FFE082;
  /*color: #BDBDBD;*/
  background-color: transparent;
}

.list-background {
  background-color: #42424244;
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
  background-color: transparent;
}

::-webkit-scrollbar {
  display: none;
}

.application .theme--light.card,
.theme--light .card {
  background-color: transparent;
  color: rgba(0, 0, 0, .87);
}

.application .theme--dark.table,
.theme--dark .table {
  background-color: transparent;
  color: #fff;
}

.application .theme--light.table,
.theme--light .table {
  background-color: transparent;
  color: rgba(0, 0, 0, .87);
}

</style>
