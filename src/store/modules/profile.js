import api from '../../api';
import * as types from '../mutation-types.js';;

const state = {
  idlist: [],
}

const getters = {
  idlist: state => state.idlist,
}

const actions = {
  bindTelOrEmail({ dispatch, commit, state }, param) {
    return api.bindTelOrEmail(param).then(response => {
      commit(types.BIND_TEL_OR_EMAIL, { response });
      return response;
    });
  },
  changePassword({ dispatch, commit, state }, param) {
    return api.changePassword(param).then(response => {
      commit(types.CHANGE_PASSWORD, { response });
      return response;
    });
  },
  certify({ dispatch, commit, state }, param) {
    return api.certify(param).then(response => {
      commit(types.CERTIFY, { response });
      return response;
    });
  },
  advancedCertify({ dispatch, commit, state }, param) {
    return api.advancedCertify(param).then(response => {
      commit(types.ADVANCED_CERTIFY, { response });
      return response;
    });
  },
  logout({ dispatch, commit, state }, param) {
    return api.logout(param).then(response => {
      commit(types.LOGOUT, { response });
      return response;
    });
  },
}

const mutations = {
  [types.BIND_TEL_OR_EMAIL](state, data) {

  },
  [types.CHANGE_PASSWORD](state, data) {

  },
  [types.CERTIFY](state, data) {

  },
  [types.LOGOUT](state, data) {

  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
