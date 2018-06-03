import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  notice: [], // 前十天的图文 id
  authcode: {}, // 首页文章列表
}

const getters = {
  notice: state => state.notice,
  index: state => state.index,
}

const actions = {
  register({ dispatch, commit, state }, param, rootState) {
    return api.register(param).then(response => {
      commit(types.REGISTER, { response });
      if (response.data.Result.Status == 0) {
        console.log('sigin/' + types.LOGIN)
        commit('signin/' + types.LOGIN, response, { root: true })
      }
      return response;
    });
  },
  getAuthCode({ dispatch, commit, state }, param) {
    return api.getAuthCode(param).then(response => {
      commit(types.REVEIVE_AUTH_CODE, { response });
      return response;
    });
  },
}

const mutations = {
  [types.REGISTER](state, data) {
    state.notice = data;
  },
  [types.REVEIVE_AUTH_CODE](state, data) {
    state.authcode = data;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
