<template>
  <div class="main-container">
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/house.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/plane.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/section.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/sunshine.jpg" />
      </van-swipe-item>
    </van-swipe>
    <div class="index-num-content">
      <van-notice-bar @click="click_notice" class="notice-bar" :text="notice_text" left-icon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
      <!-- <span class="index-num">指数</span> -->
      <div class="coin-info">
        <template v-for="coin in coins">
          <div class="coin-item" :key="coin.type">
            <span class="body-2 coin-type">{{coin.type}}</span>
            <span class="title coin-price" :style="{ color: coin.trend == 'up'?'#EF5350' : '#66BB6A'}">{{coin.price}}</span>
            <v-icon style="margin-left:-5px;padding-bottom:3px;" :color="coin.trend =='up'?'deep-orange darken-4': 'green lighten-1'">{{ coin.trend =='up'?'mdi-menu-up' : 'mdi-menu-down'}}</v-icon>
            <span class="subheading coin-somewhat">{{coin.somewhat}}</span>
          </div>
        </template>
      </div>
    </div>
    <div>
      <v-tabs centered color="grey darken-3" slot="extension" v-model="activated_tab" grow height="40">
        <v-tabs-slider color="amber lighten-4"></v-tabs-slider>
        <v-tab v-for="i in 2" :key="i" :href="`#tab-${i}`">
          <span class="gold-text">{{ i == 1 ? '涨跌榜' : '成交榜'}}</span>
        </v-tab>
        <v-tabs-items>
          <v-tab-item v-for="i in 3" :key="i" :id="`tab-${i}`">
            <v-data-table :headers="headers" :items="items" class="elevation-1" dark hide-actions :pagination.sync="pagination">
              <template slot="items" slot-scope="props">
                <td class="subheading" :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}">{{ props.item.type }}</td>
                <td :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}" class="text-xs-right subheading">${{ props.item.price }}</td>
                <td :style="{ color: props.item.percent > 0 ?'#EF5350' : '#66BB6A'}" class="text-xs-right subheading">{{(props.item.percent > 0 ?'+' : '') + props.item.percent }}%</td>
              </template>
              <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      activated_tab: 'tab-1',
      notice_text: '32MB区块即将到来，BCH定于5月15日进行硬分叉，BCH网络将实现历史上最大的区块大小增长。',
      pagination: {
        sortBy: 'percent',
        descending: true,
        rowsPerPage: -1

      },
      headers: [{
          text: '币种',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        { text: '最新价', value: 'price', align: 'center', },
        { text: '涨跌幅', value: 'percent', align: 'center', },
      ],
      items: [{
          value: true,
          type: 'BTC',
          price: 159,
          percent: +1
        },
        {
          value: false,
          type: 'ETH',
          price: 237,
          percent: -1
        },
        {
          value: false,
          type: 'BTS',
          price: 262,
          percent: +7
        },
        {
          value: false,
          type: 'BCH',
          price: 305,
          percent: +8
        },
        {
          value: false,
          type: 'XRP',
          price: 356,
          percent: -16
        },
        {
          value: false,
          type: 'LTC',
          price: 375,
          percent: +0
        },
        {
          value: false,
          type: 'ETC',
          price: 392,
          percent: -2
        },
        {
          value: false,
          type: 'EOS',
          price: 408,
          percent: +45
        },
        {
          value: false,
          type: 'ANT',
          price: 452,
          percent: -22
        },
        {
          value: false,
          type: 'RIP',
          price: 518,
          percent: 6
        }
      ],
      coins: [
        { type: 'BTC/Bitinex1', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { type: 'BTC/Bitinex2', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { type: 'BTC/Bitinex3', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { type: 'BTC/Bitinex4', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { type: 'BTC/Bitinex5', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { type: 'BTC/Bitinex6', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
        { type: 'BTC/Bitinex7', price: '50913.01', somewhat: '$8098.42', trend: 'down' },
        { type: 'BTC/Bitinex8', price: '50913.01', somewhat: '$8098.42', trend: 'up' },
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
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

.index-num-content {
  background-color: #424242;
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
  width: 50%;
  margin: 0 10px 15px 10px;
}

.notice-bar {
  color: #FFE082;
  /*color: #BDBDBD;*/
  background-color: #424242;
}

::-webkit-scrollbar {
  display: none;
}

</style>
