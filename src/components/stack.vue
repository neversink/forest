<template>
  <div>
    <ul class="stack">
      <li class="stack-item" v-for="(current_item, index) in pages" :style="[transformIndex(index),transform(index)]" @touchmove.stop.prevent="touchmove" @touchstart.stop.prevent="touchstart" @touchend.stop.prevent="touchend" @touchcancel.stop.prevent="touchend" @mousedown.stop.prevent="touchstart" @mouseup.stop.prevent="touchend" @mousemove.stop.prevent="touchmove" @mouseout.stop.prevent="touchend" @webkit-transition-end="onTransitionEnd(index)" @transitionend="onTransitionEnd(index)">
        <span style="color:red">index</span>
        <!-- <v-layout row wrap justify-center>
          <v-flex xs12 class="title gold-text my-3">{{current_item.type}} </v-flex>
          <v-flex xs6 class="caption grey-text py-0">预期年化率</v-flex>
          <v-flex xs6 class="caption grey-text py-0">剩余抢购时间</v-flex>
          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>%<span v-if="current_item.benefit_add">{{current_item.benefit_add_type + current_item.benefit_add + '%'}}</span></v-flex>
          <v-flex xs6 class="gold-text py-0"><span class="display-1">{{current_item.benefit}}</span>天</v-flex>
          <v-flex xs12 class="gold-text mt-2">
            <v-chip v-if="current_item.expmoney == 'yes'" small color="amber lighten-4" text-color="grey darken-4">体验金可用</v-chip>
            <v-chip v-if="current_item.atleast" small color="amber lighten-4" text-color="grey darken-4">{{current_item.atleast}}起投</v-chip>
          </v-flex>
          <v-flex xs12 class="my-4">
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
          <v-spacer></v-spacer>
          <v-flex xs10 class="mr-2">
            <v-text-field color="amber lighten-4" :disabled="is_loading" :label="'剩余可投入' + current_item_detail.RestCoinNum + ' ' + current_item_detail.CoinName" dark v-model="trade_amount" type="number"></v-text-field>
          </v-flex>
          <v-flex class="quit-button" xs10>
            <v-btn dark block color="amber lighten-4" style="color:black" large :loading="is_loading" :disabled="is_loading" @click.native.stop="ready_buy">立即投入</v-btn>
          </v-flex>
        </v-layout> -->
      </li>
    </ul>
    <!--  <v-dialog v-model="confirm_dialog" max-width="600" persistent>
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
          <v-btn color="amber lighten-4" :disabled="is_trading" @click.native="real_buy" class="real-buy-btn mb-3" large block>投入</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import detectPrefixes from '../utils/detect-prefixes.js'
export default {
  props: {
    stackinit: {
      type: Object,
      default: []
    },
    pages: {
      type: Array,
      default: {}
    }
  },
  data() {
    return {
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        offsetY: '',
        poswidth: 0,
        posheight: 0,
        lastPosWidth: '',
        lastPosHeight: '',
        rotate: 0,
        lastRotate: 0,
        visible: this.stackinit.visible || 3,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      },
      is_loading: true,
      current_item_detail: {},
      trade_amount: '',
      trade_leave_amount: '',
      trade_usdt_amount: '',
      trade_usdt_name: '',
      confirm_dialog: false,
    }
  },
  computed: {
    // 划出面积比例
    offsetRatio() {
      // let width = this.$el.offsetWidth
      // let height = this.$el.offsetHeight
      let width = 400
      let height = 400
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let offsetHeight = height - Math.abs(this.temporaryData.posheight)
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio() {
      // let width = this.$el.offsetWidth
      let width = 400
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let ratio = 1 - offsetWidth / width || 0
      return ratio
    }
  },
  mounted() {
    // 绑定事件
    this.$on('next', () => {
      this.next()
    })
    this.$on('prev', () => {
      this.prev()
    })
  },
  methods: {
    touchstart(e) {
      if (this.temporaryData.tracking) {
        return
      }
      // 是否为touch
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
          this.temporaryData.offsetY = e.targetTouches[0].offsetY
        }
        // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
        this.temporaryData.offsetY = e.offsetY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove(e) {
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === 'touchmove') {
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // 计算滑动值
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
        let rotateDirection = this.rotateDirection()
        let angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    touchend(e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.5
      if (this.offsetRatio >= 0.5) {
        // 计算划出后最终位置
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        this.nextTick()
        // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
        this.temporaryData.rotate = 0
      }
    },
    nextTick() {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      // 循环currentPage
      this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    onTransitionEnd(index) {
      let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.lastOpacity = 0
        this.temporaryData.lastRotate = 0
        this.temporaryData.swipe = false
      }
    },
    prev() {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = -width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    next() {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    rotateDirection() {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio() {
      let height = this.$el.offsetHeight
      let offsetY = this.temporaryData.offsetY
      let ratio = -1 * (2 * offsetY / height - 1)
      return ratio
    },
    inStack(index, currentPage) {
      let stack = []
      let visible = this.temporaryData.visible
      let length = this.pages.length
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    // 非首页样式切换
    transform(index) {
      let currentPage = this.temporaryData.currentPage
      let length = this.pages.length
      let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
      let style = {}
      let visible = this.temporaryData.visible
      if (index === this.temporaryData.currentPage) {
        return
      }
      if (this.inStack(index, currentPage)) {
        let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
        style['opacity'] = '1'
        style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
        style['zIndex'] = visible - perIndex
        if (!this.temporaryData.tracking) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
        }
      } else if (index === lastPage) {
        style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
        style['opacity'] = this.temporaryData.lastOpacity
        style['zIndex'] = -1
        style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
        style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
      } else {
        style['zIndex'] = '-1'
        style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
      }
      return style
    },
    // 首页样式切换
    transformIndex(index) {
      if (index === this.temporaryData.currentPage) {
        let style = {}
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        style['opacity'] = this.temporaryData.opacity
        style['zIndex'] = 10
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
        return style
      }
    }
  }
}

</script>
<style>
.stack {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1000px;
  perspective-origin: 50% 150%;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: 50% 150%;
  margin: 0;
  padding: 0;
}

.stack-item {
  ackground: #fff;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  overflow: hidden;
  position: absolute;
  opacity: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: auto;
}

.stack-item img {
  width: 100%;
  display: block;
  pointer-events: none;
}

.stack-container li.move-back {
  /* http://matthewlein.com/ceaser/ */
  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1);
  /* older webkit */
  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
}

</style>
