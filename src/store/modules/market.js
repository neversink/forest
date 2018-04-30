import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  datas: [],
}

const getters = {
  datas: state => state.datas,
}

const actions = {
  getDatas({ dispatch, commit, state }, id) {
    api.getStockInfo(id).then(response => {
      let data = response.data.data;
      console.log(data)
      let ohlc = [],
        volume = [],
        dataLength = data.length,
        i = 0;
      for (i; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4] // close
        ]);
        volume.push([
          data[i][0], // the date
          data[i][5] // the volume
        ]);
      }
      commit(types.REVEIVE_MARKET_INFO, { ohlc, volume });
    });
  },
}

const mutations = {
  [types.REVEIVE_MARKET_INFO](state, data) {
    state.datas = data;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
