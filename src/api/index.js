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
      title: '��ҿ�����,EOS�����ڵ㾺ѡ֮ս���Ӽ���',
      content: '��Ҽ���4��24�շ��������,��ҿ����ʽ���뾺ѡEOS�����ڵ㡣',
      src: './static/img/docks.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOSȨ��֮��,�����ݰЯ40��ɱ��',
      content: '����3�£�EOS��ʼ��BM��Daniel Larimer��������EOS������ͶƱ��ѡ��21��EOS�����ڵ㡣',
      src: './static/img/hero.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOS�������?���ݸ���������������',
      content: '���첻����EOS��Ǯȥ������,ֻ��֤��һ�������г����еĹ۵�',
      src: './static/img/section.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'ͻ��!EOSת��47�����̫��',
      content: 'BM������EOSʱ,Ҳ���������Լ���һ����ΪEOS���������䡣',
      src: './static/img/sunshine.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: '���������ǳ��� 45% �� EOS ������ô��? ',
      content: 'EOS ���׬�������� ����,��������ʼ,EOS �ļ۸�����춯,������,��ȫ�����۲��� 6 ��Ԫ,Ѹ������',
      src: './static/img/road.jpg',
      href: 'Article'
    },
    {
      id: Math.random(),
      title: 'EOS�ַ���!����60%,�ѵ�ţ��������?',
      content: '4��11��12��,EOS�ڻ�ҵĳɽ�����35Ԫ,4��12��12��,�����57Ԫ,������60%!',
      src: './static/img/desert.jpg',
      href: 'Article'
    }
  ]
}

export default {
  // ��¼
  login(param) {
    return instance.post('Login', qs.stringify(param));
  },
  logout() {
    return instance.post('LoginOut');
  },
  // ע��
  register(param) {
    return instance.post('Register', qs.stringify(param));
  },
  getAuthCode(param) {
    return instance.post('GetAuthCode', qs.stringify(param));
  },
  // ��ҳ
  getNotice(param) {
    return instance.post('Notice', qs.stringify(param))
  },
  getIndex() {
    return instance.post('GetIndex')
  },
  getIndexDetail(param) {
    return instance.post('GetIndexDetail', qs.stringify(param))
  },
  // ҵ��
  getWallet(param) {
    return instance.post('GetWallet', qs.stringify(param))
  },
  getAvailableEntrustList(param) {
    return instance.post('GetUsedEntrust', qs.stringify(param))
  },
  getEntrustDetail(param) {
    return instance.post('GetEntrustQuery', qs.stringify(param))
  },
  // ����
  getStockInfo() {
    return instance.get('', {
      baseURL: 'https://data.jianshukeji.com/stock/history/000001'
    })
  },
  // ý��
  getNewsList() {
    return Promise.resolve(mock_news())
  },
  // �ҵ�
  bindTelOrEmail() {
    return instance.post('Bind')
  },
  changePassword() {
    return instance.post('ModifyPwd')
  },
  certify() {
    return instance.post('Auth')
  },
  advancedCertify() {
    return instance.post('AdvAuto')
  },


}
