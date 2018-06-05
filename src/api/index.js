import axios from 'axios';
import qs from 'qs'

// const baseURL = 'http://v3.wufazhuce.com:8000';
// const baseURL = 'https://data.jianshukeji.com/stock/history/000001';
// const getStockInfo = '';
const baseURL = 'http://39.107.235.23/DealApp/servlet';
const Notice = 'Notice';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';
// const getStockInfo = '/stock/history/000001';


const instance = axios.create({
  baseURL: baseURL,
  changeOrigin: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true
});

const reg = /\{(.+)\}/ig;

function mock_news() {
  return [{
      id: Math.random(),
      title: '火币矿池入局,EOS超级节点竞选之战愈加激烈',
      content: '火币集团4月24日发布公告称,火币矿池正式参与竞选EOS超级节点。',
      src: './static/img/docks.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOS权力之争,“温州帮”携40亿杀入',
      content: '今年3月，EOS创始人BM（Daniel Larimer）公布由EOS持有者投票、选出21个EOS超级节点。',
      src: './static/img/hero.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOS提币拉盘?数据告诉你真相在这里',
      content: '今天不讨论EOS拿钱去干嘛了,只验证下一个二级市场流行的观点',
      src: './static/img/section.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: '突发!EOS转出47万个以太坊',
      content: 'BM当初做EOS时,也不会料想自己有一天会成为EOS的信任领袖。',
      src: './static/img/sunshine.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: '两天内上涨超过 45% 的 EOS 究竟怎么了? ',
      content: 'EOS 最近赚足了眼球。 终于,从周三开始,EOS 的价格出现异动,两天内,从全网均价不到 6 美元,迅速上涨',
      src: './static/img/road.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOS又疯了!暴涨60%,难道牛市又来了?',
      content: '4月11日12点,EOS在火币的成交价是35元,4月12日12点,变成了57元,上涨了60%!',
      src: './static/img/desert.jpg',
      href: 'Article'
    }
  ]
}

export default {
  // 登录
  login(param) {
    return instance.post('Login', qs.stringify(param));
  },
  logout() {
    return instance.post('LoginOut');
  },
  // 注册
  register(param) {
    return instance.post('Register', qs.stringify(param));
  },
  getAuthCode(param) {
    return instance.post('GetAuthCode', qs.stringify(param));
  },
  // 首页
  getNotice(param) {
    return instance.post('Notice', qs.stringify(param))
  },
  getIndex() {
    return instance.post('GetIndex')
  },
  getIndexDetail(param) {
    return instance.post('GetIndexDetail', qs.stringify(param))
  },
  // 业务
  getWallet(param) {
    return instance.post('GetWallet', qs.stringify(param))
  },
  getMyEntrust(param) {
    return instance.post('HoldEntrust', qs.stringify(param))
  },
  getAvailableEntrustList(param) {
    return instance.post('GetUsedEntrust', qs.stringify(param))
  },
  getEntrustDetail(param) {
    return instance.post('GetEntrustQuery', qs.stringify(param))
  },
  buyEntrust(param) {
    return instance.post('Entrust', qs.stringify(param))
  },
  convertPrice(param) {
    return instance.post('PriceConvert', qs.stringify(param))
  },
  queryRecharge(param) {
    return instance.post('AddFundsType', qs.stringify(param))
  },
  recharge(param) {
    return instance.post('AddFunds', qs.stringify(param))
  },
  // 交易
  getStockInfo() {
    return instance.get('', {
      baseURL: 'https://data.jianshukeji.com/stock/history/000001',
      withCredentials: false
    })
  },
  // 媒体
  getNewsList() {
    return Promise.resolve(mock_news())
  },
  // 我的
  bindTelOrEmail(param) {
    return instance.post('Bind', qs.stringify(param))
  },
  changePassword(param) {
    return instance.post('ModifyPwd', qs.stringify(param))
  },
  certify(param) {
    return instance.post('Auth', qs.stringify(param))
  },
  advancedCertify(param) {
    let formData = new FormData();
    for (let i in param) {
      formData.append(i, param[i]);
    }
    return instance.post('AdvAuto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },


}
