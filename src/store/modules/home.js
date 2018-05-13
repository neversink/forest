import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  notice:  {},
  index:  {},
  indexDetail: {},
}

const getters = {
  notice: state => state.notice,
  index: state => state.index,
  indexDetail: state => state.indexDetail,
}

const actions = {
  getNotice({ dispatch, commit, state }, param) {
    return api.getNotice(param).then(response => {
      commit(types.REVEIVE_NOTICE, { response });
      return response;
    });
  },
  getIndex({ dispatch, commit, state }, param) {
    return api.getIndex().then(response => {
       commit(types.REVEIVE_INDEX, { response });
       return response;
    });
  },
  getIndexDetail({ dispatch, commit, state }, param) {
    return api.getIndexDetail(param).then(response => {
      commit(types.REVEIVE_INDEX_DETAIL, { response });
      return response;
    });
  },
}

const mutations = {
  [types.REVEIVE_NOTICE](state, data) {
    state.notice = data;
  },
  [types.REVEIVE_INDEX](state, data) {
    state.index = data;
  },
  [types.REVEIVE_INDEX_DETAIL](state, data) {
    state.indexDetail = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
