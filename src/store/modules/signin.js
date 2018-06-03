import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  userinfo: {}
}

const getters = {
  userinfo: state => state.userinfo,
  ID: state => state.userinfo.ID,
  Nick: state => state.userinfo.Nick,
  StarLevel: state => state.userinfo.StarLevel,
  IsAuth: state => state.userinfo.IsAuth,
  AuthInfo: state => state.userinfo.AuthInfo,
  IsAdvAuth: state => state.userinfo.IsAdvAuth,
  SecrLevel: state => state.userinfo.SecrLevel,
  IsEmalBind: state => state.userinfo.IsEmalBind,
  IsPhoneBind: state => state.userinfo.IsPhoneBind,
  IsGoogleAuth: state => state.userinfo.IsGoogleAuth,
  IsAccPwdEmpty: state => state.userinfo.IsAccPwdEmpty
}

const actions = {
  login({ dispatch, commit, state }, param) {
    return api.login(param).then(response => {
      commit(types.LOGIN, { response });
      return response;
    });
  },
}

const mutations = {
  [types.LOGIN](state, data) {
    state.userinfo = data.response.data;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
