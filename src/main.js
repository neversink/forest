// base
import './assets/js/rem'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import axios from 'axios'

// others
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
import loadStock from 'highcharts/modules/stock';
loadStock(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

(function(H) { var protocol = window.location.protocol; var defaultOptionsZhCn = { lang: { contextButtonTitle: "图表导出菜单", decimalPoint: ".", downloadJPEG: "下载JPEG图片", downloadPDF: "下载PDF文件", downloadPNG: "下载PNG文件", downloadSVG: "下载SVG文件", drillUpText: "返回 {series.name}", invalidDate: "无效的时间", loading: "加载中...", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], noData: "没有数据", numericSymbols: null, printChart: "打印图表", resetZoom: "重置缩放比例", resetZoomTitle: "重置为原始大小", shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], thousandsSep: ",", weekdays: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], rangeSelectorFrom: "开始时间", rangeSelectorTo: "结束时间", rangeSelectorZoom: "范围", zoomIn: "缩小", zoomOut: "放大" }, global: { canvasToolsURL: protocol + "//cdn.hcharts.cn/highcharts/modules/canvas-tools.js", VMLRadialGradientURL: protocol + +"//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png" }, title: { text: "图表标题" }, tooltip: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%Y-%m-%d", week: "%Y-%m-%d", month: "%Y-%m", year: "%Y" }, split: false }, exporting: { url: protocol + "//export.highcharts.com.cn" }, credits: { text: "Highcharts.com.cn", href: "https://www.highcharts.com.cn" }, xAxis: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%Y-%m-%d", week: "%Y-%m", month: "%Y-%m", year: "%Y" } }, rangeSelector: { inputDateFormat: "%Y-%m-%d", buttonTheme: { width: "auto", style: { fontSize: "12px", padding: "4px" } }, buttons: [{ type: "month", count: 1, text: "月" }, { type: "month", count: 3, text: "季度" }, { type: "month", count: 6, text: "半年" }, { type: "ytd", text: "YTD" }, { type: "year", count: 1, text: "年" }, { type: "all", text: "所有" }] }, plotOptions: { series: { dataGrouping: { dateTimeLabelFormats: { millisecond: ["%Y-%m-%d %H:%M:%S.%L", "%Y-%m-%d %H:%M:%S.%L", " ~ %H:%M:%S.%L"], second: ["%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S", " ~ %H:%M:%S"], minute: ["%Y-%m-%d %H:%M", "%Y-%m-%d %H:%M", " ~ %H:%M"], hour: ["%Y-%m-%d %H:%M", "%Y-%m-%d %H:%M", " ~ %H:%M"], day: ["%Y-%m-%d", "%Y-%m-%d", " ~ %Y-%m-%d"], week: ["%Y-%m-%d", "%Y-%m-%d", " ~ %Y-%m-%d"], month: ["%Y-%m", "%Y-%m", " ~ %Y-%m"], year: ["%Y", "%Y", " ~ %Y"] } } }, ohlc: { tooltip: { split: false, pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>' + "开盘：{point.open}<br/>" + "最高：{point.high}<br/>" + "最低：{point.low}<br/>" + "收盘：{point.close}<br/>" } }, candlestick: { tooltip: { split: false, pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>' + "开盘：{point.open}<br/>" + "最高：{point.high}<br/>" + "最低：{point.low}<br/>" + "收盘：{point.close}<br/>" } } } };
  H.setOptions(defaultOptionsZhCn) })(Highcharts);

(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){a.createElement("link",{href:"https://fonts.googleapis.com/css?family\x3dUnica+One",rel:"stylesheet",type:"text/css"},null,document.getElementsByTagName("head")[0]);a.theme={colors:"#2b908f #90ee7e #f45b5b #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),chart:{backgroundColor:{linearGradient:{x1:0,y1:0,x2:1,y2:1},stops:[[0,"#2a2a2b"],[1,"#3e3e40"]]},style:{fontFamily:"'Unica One', sans-serif"},
plotBorderColor:"#606063"},title:{style:{color:"#E0E0E3",textTransform:"uppercase",fontSize:"20px"}},subtitle:{style:{color:"#E0E0E3",textTransform:"uppercase"}},xAxis:{gridLineColor:"#707073",labels:{style:{color:"#E0E0E3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:"#A0A0A3"}}},yAxis:{gridLineColor:"#707073",labels:{style:{color:"#E0E0E3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",tickWidth:1,title:{style:{color:"#A0A0A3"}}},
tooltip:{backgroundColor:"rgba(0, 0, 0, 0.85)",style:{color:"#F0F0F0"}},plotOptions:{series:{dataLabels:{color:"#B0B0B3"},marker:{lineColor:"#333"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:"white"},errorbar:{color:"white"}},legend:{itemStyle:{color:"#E0E0E3"},itemHoverStyle:{color:"#FFF"},itemHiddenStyle:{color:"#606063"}},credits:{style:{color:"#666"}},labels:{style:{color:"#707073"}},drilldown:{activeAxisLabelStyle:{color:"#F0F0F3"},activeDataLabelStyle:{color:"#F0F0F3"}},navigation:{buttonOptions:{symbolStroke:"#DDDDDD",
theme:{fill:"#505053"}}},rangeSelector:{buttonTheme:{fill:"#505053",stroke:"#000000",style:{color:"#CCC"},states:{hover:{fill:"#707073",stroke:"#000000",style:{color:"white"}},select:{fill:"#000003",stroke:"#000000",style:{color:"white"}}}},inputBoxBorderColor:"#505053",inputStyle:{backgroundColor:"#333",color:"silver"},labelStyle:{color:"silver"}},navigator:{handles:{backgroundColor:"#666",borderColor:"#AAA"},outlineColor:"#CCC",maskFill:"rgba(255,255,255,0.1)",series:{color:"#7798BF",lineColor:"#A6C7ED"},
xAxis:{gridLineColor:"#505053"}},scrollbar:{barBackgroundColor:"#808083",barBorderColor:"#808083",buttonArrowColor:"#CCC",buttonBackgroundColor:"#606063",buttonBorderColor:"#606063",rifleColor:"#FFF",trackBackgroundColor:"#404043",trackBorderColor:"#404043"},legendBackgroundColor:"rgba(0, 0, 0, 0.5)",background2:"#505053",dataLabelsColor:"#B0B0B3",textColor:"#C0C0C0",contrastTextColor:"#F0F0F3",maskColor:"rgba(255,255,255,0.3)"};a.setOptions(a.theme)});


// ui
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
// Vue.use(MuseUI)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'font-awesome/css/font-awesome.min.css'
import 'mdi/css/materialdesignicons.min.css'

import { Row, Col } from 'vant';
import { NavBar } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { NoticeBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Button } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Uploader } from 'vant';
import { Lazyload } from 'vant';
import { Toast } from 'vant';



Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(NavBar).use(Tabbar).use(TabbarItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(NoticeBar);
Vue.use(Tab).use(Tabs);
Vue.use(Button);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Uploader);
Vue.use(Lazyload);
Vue.use(Toast);




Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
