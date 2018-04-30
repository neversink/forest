import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  datas: []
}

const getters = {
  datas: state => state.datas,
}

const actions = {
  getDatas({ dispatch, commit, state }, id) {
    api.getNewsList(id).then(response => {
      commit(types.REVEIVE_NEWS_LIST,  response.reverse() );
    })
  },
}

const mutations = {
  [types.REVEIVE_NEWS_LIST](state, data) {
    state.datas.push(...data);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
