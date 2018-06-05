import api from '../../api';
import * as types from '../mutation-types.js';;

const state = {
  idlist: [],
}

const getters = {
  idlist: state => state.idlist,
}

const actions = {
  getWallet({ dispatch, commit, state }, param) {
    return api.getWallet(param).then(response => {
      commit(types.REVEIVET_MY_WALLET_DETAIL, { response });
      return response;
    });
  },
  getMyEntrust({ dispatch, commit, state }, param) {
    return api.getMyEntrust(param).then(response => {
      commit(types.REVEIVET_MY_ENTRUST_LIST, { response });
      return response;
    });
  },
  getAvailableEntrustList({ dispatch, commit, state }, param) {
    return api.getAvailableEntrustList(param).then(response => {
      commit(types.REVEIVE_AVAILABLE_ENTRUST_LIST, { response });
      return response;
    });
  },
  getEntrustDetail({ dispatch, commit, state }, param) {
    return api.getEntrustDetail(param).then(response => {
      commit(types.REVEIVE_ENTRUST_DETAIL, { response });
      return response;
    });
  },
  buyEntrust({ dispatch, commit, state }, param) {
    return api.buyEntrust(param).then(response => {
      commit(types.BUY_ENTRUST, { response });
      return response;
    });
  },
  convertPrice({ dispatch, commit, state }, param) {
    return api.convertPrice(param).then(response => {
      commit(types.CONVERT_PRICE, { response });
      return response;
    });
  },
  queryRecharge({ dispatch, commit, state }, param) {
    return api.queryRecharge(param).then(response => {
      commit(types.QUERY_RECHARGE, { response });
      return response;
    });
  },
  recharge({ dispatch, commit, state }, param) {
    return api.recharge(param).then(response => {
      commit(types.RECHARGE, { response });
      return response;
    });
  },
}

const mutations = {
  [types.REVEIVET_MY_WALLET_DETAIL](state, data) {

  },
  [types.REVEIVET_MY_ENTRUST_LIST](state, data) {

  },
  [types.REVEIVE_AVAILABLE_ENTRUST_LIST](state, data) {

  },
  [types.REVEIVE_ENTRUST_DETAIL](state, data) {

  },
  [types.BUY_ENTRUST](state, data) {

  },
  [types.CONVERT_PRICE](state, data) {

  },
  [types.QUERY_RECHARGE](state, data) {

  },
  [types.RECHARGE](state, data) {

  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
