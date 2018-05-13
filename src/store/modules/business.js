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
  getAvailableEntrustList({ dispatch, commit, state }, id) {
    return api.getAvailableEntrustList().then(response => {
      commit(types.REVEIVE_AVAILABLE_ENTRUST_LIST, { response });
      return response;
    });
  },
  getEntrustDetail({ dispatch, commit, state }, id) {
    return api.getEntrustDetail().then(response => {
      commit(types.REVEIVE_ENTRUST_DETAIL, { response });
      return response;
    });
  },
}

const mutations = {
  [types.REVEIVET_MY_WALLET_DETAIL](state, data) {

  },
  [types.REVEIVE_AVAILABLE_ENTRUST_LIST](state, data) {

  },
  [types.REVEIVE_ENTRUST_DETAIL](state, data) {

  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
