<template>
  <v-app dark>
    <v-toolbar class="grey darken-4" dark app dense>
      <v-btn icon @click="goback">
        <v-icon color="amber lighten-3">navigate_before</v-icon>
      </v-btn>
      <v-toolbar-title v-text="'资讯'" style="color:#FFE082;fontSize:16px;"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="()=>{is_like = !is_like}">
        <v-icon :color="is_like ?'red' : 'amber lighten-3' ">favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="amber lighten-3">share</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <img v-if="page == 3" src="../assets/img/banner_content1.gif" width="100%">
      <img v-if="page == 1" src="../assets/img/banner_content2.jpg" width="100%">
      <img v-if="page == 2" src="../assets/img/banner_content3.png" width="100%">
      <!--  <section>
        <v-parallax src="./static/img/plane.jpg" height="200">
          <v-layout column align-center justify-center class="white--text">
            <h1 class="white--text mb-2  text-xs-center">{{article.title}}</h1>
            <div class="subheading mb-3 text-xs-center">{{article.memo}}</div>
          </v-layout>
        </v-parallax>
      </section>
      <section>
        <v-layout column wrap align-center>
          <v-flex xs12>
            <v-container grid-list-md>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <div style="margin: 10px;text-indent: 2em;" class="caption" v-html="article.content"></div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <v-footer class="transparent">
        <v-layout row wrap justify-center>
          <v-flex xs12 text-xs-center white--text>
            <div>森林APP &copy; {{ new Date().getFullYear() }}</div>
          </v-flex>
        </v-layout>
      </v-footer>-->
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Article',
  data() {
    return {
      is_like: false,
      page: this.$route.params.page,
      article: {
        title: '加密货币继续普涨：比特币涨逾6% EOS暴涨逾三成',
        editor: '凤凰国际iMarkets',
        writer: '凤凰国际iMarkets',
        memo: '凤凰国际iMarkets',
        content: `
 <p>凤凰国际iMarkets讯 北京时间4月25日，加密数字货币价格周二继续普遍上涨，其中比特币价格涨逾6%，逼近9500美元。在其他主要加密货币中，现为第五大加密货币的EOS暴涨逾三成，以太币和莱特币也双双上涨10%左右。</p>
  <p>CoinDesk数据显示，比特币价格在过去24个小时里最高触及9447.35美元，最低触及8932.17美元。CoinDesk追踪来自于Bitstamp、Coinbase、itBit和Bitfinex等加密数字货币交易所的价格。</p>
  <p>根据加密数字货币数据分析网站CoinMarketCap提供的数据，截至美国东部时间周二下午4点（北京时间周三凌晨4点），比特币价格上涨6.13%，至9434.86美元。</p>
  <p>同一时间，芝加哥商品交易所（CME）4月份交割的比特币期货价格上涨600美元，至9445美元，涨幅为6.78%，此前一度触及9460美元的高点。</p>
  <p>比特币价格突破9000美元意味着这种全球最大加密货币站到了3月中旬触及的高点上方，而这一价位对于关注技术面的市场人士来说是个至关重要的阻力位。与此同时，这还意味着比特币价格自1月29日以来首次站到了100日滚动均线上方。</p>
  <p>其他加密数字货币中，以太币涨10.80%，至708.21美元；瑞波币涨7.28%，至0.93美元；比特币现金涨6.74%，至1480.01美元；EOS涨30.80%，至15.04美元；莱特币涨9.41%，至164.92美元。</p>
  <p>就加密货币相关消息而言，今日中华人民共和国审计署官网发表《在大数据审计中应用“区块链”技术的一点设想》一文，文中指出：未来的大数据审计工作，将由各省（市）审计厅、各部门内审机构的区块，审计人员操作时间戳产生的链共同组成。审计署将基于块链式数据结构来验证与存储数据、利用分布式节点共识算法来生成和更新数据、利用加密解密算法保证数据传输和访问的安全、利用由自动化脚本代码组成的智能合约来编程和操作数据。当然，上述设想还仅限于技术方面的初步构思，真正投入应用还需要在法律层面、现实层面开展广泛、深入、缜密的论证研究，希望可以引发更多的理论关注和实证研究，推动大数据审计实现突破性跨越式大发展。</p>
  <p>近几个月来，在中国内地和韩国颁布ICO禁令后，中国香港和新加坡已经吸引了通过ICO筹集资金的公司。据《南华早报》报道，根据Fintech公司数据，在新加坡和香港推出ICOs的公司数量近几个月大幅上升。数字货币企业协会主席安森·泽尔(Anson Zeall)表示，不能说新加坡已经成为一个ICO中心，但是自去年9月以来已经增加了很多，香港和新加坡成为了代币销售的新圣地。</p>
  <p>近日，中概股企业迅雷（NASDAQ:XNET）发布了拥有百万级并发处理能力的区块链应用“迅雷链”。发布期间，迅雷集团首席执行官陈磊，区块链是激活共享经济的工具，是发展共享经济必不可少的技术和模式创新。区块链和共享经济是共生双生的关系。区块链对于共享经济来说。今天区块链技术还有些不成熟，区块链的面临的挑战是，炒作给整个区块链行业带来负面的影响。</p>
  <p>据韩媒NTM23日报道，Bithumb的ICO变相绕过韩国法令，Bithumb coin的发行使用可能已经违反了韩国政府的规定。金融当局称，用这种类型的虚拟货币来交易汇兑不但违反了现行法律，也是现在明确限制的行为。在韩国电子金融法中，不但不承认像虚拟货币这种币值不停变动的储值型支付，而且储值型支付业者也必须要在政府登陆为电子金融业，而韩国当局表示绝不会容许将交易所登陆为电子金融业。另一方面，业者表示韩国禁止ICO并没有相关法律依据，金融当局则表示现行法律规范已足够。</p>
  <p>据cointelegraph援引《华尔街日报》消息，欧盟最新的即将于5月25日生效的隐私法实际上反而可能有利于其希望控制的Facebook和Google等媒体巨头。华尔街日报强调，需要通过使用基于区块链的平台将权力掌握在消费者手中。基于区块链技术的分散式替代方案数据完全透明度和用户控制力高，对于在Facebook的剑桥丑闻之后感到不安的人，似乎是一个明智的选择。</p>
  <p>根据汤森路透(Thomson Reuters)的最新一项调查，金融公司的数字货币交易可能在2018年持续增加，约20%的人表示，他们考虑在未来3-12个月内进行数字货币交易。这项调查是汤森路透在所有交易解决方案的400多名客户中进行的，虽然数字货币仍是交易市场中相对较小的一部分，但这一细分市场正开始进入主流金融服务行业。<span class="ifengLogo"><a href="http://www.ifeng.com/" target="_blank"><img src="http://p2.ifengimg.com/a/2016/0810/204c433878d5cf9size1_w16_h16.png"></a></span></p>
        `,
        image: '/static/img/hero.jpg'
      }
    }
  },
  methods: {
    goback() {
      this.$router.push({
        name: 'News'
      })
    }
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
