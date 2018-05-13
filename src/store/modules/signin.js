import api from '../../api';
import * as types from '../mutation-types.js';

const state = {

}

const getters = {
  notice: state => state.notice,

}

const actions = {
  login({ dispatch, commit, state }, param) {
    return api.login(param).then(response => {
      commit(types.LOGIN, { response });
      return response;
    });
  },
  logout({ dispatch, commit, state }, param) {
    api.logout().then(response => {
      commit(types.LOGOUT, { response });
    });
  },
}

const mutations = {
  [types.LOGIN](state, data) {
    state.notice = data;
  },
  [types.LOGOUT](state, data) {},
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
