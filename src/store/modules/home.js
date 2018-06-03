import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  notice: {},
  index: {},
  indexDetail: [],
  indexSpecial: null,
}

const getters = {
  notice: state => state.notice,
  index: state => state.index,
  indexDetail: state => state.indexDetail,
  indexSpecial: state => state.indexSpecial,
}

const actions = {
  getNotice({ dispatch, commit, state }, param) {
    return api.getNotice(param).then(response => {
      commit(types.REVEIVE_NOTICE, { response });
      return response;
    });
  },
  getIndex({ dispatch, commit, state }, param) {
    return api.getIndex(param).then(response => {
      if (response.data.Result.Status == 0) {
        let temp_coins = response.data.Items.map(item => {
          return {
            id: item.IndexItemID,
            type: item.Name,
            price: handle_percent(item.USDIndex),
            somewhat: handle_acc(item.Acc),
            trend: item.dir == 1 ? 'up' : 'down',
          }
        })
        commit(types.REVEIVE_INDEX, temp_coins);


        let temp_items = [];
        response.data.Items.forEach(item => {
          temp_items.push({
            type: item.Name,
            price: handle_price(item.USDIndex),
            percent: handle_percent(item.Precent),
            amount: handle_acc(item.Acc),
          })
        })
        commit(types.REVEIVE_INDEX_DETAIL, temp_items);

        let temp_special = {};
        response.data.Items.forEach(item => {
          temp_special[item.Name] = item.Items;
        })
        commit(types.REVEIVE_INDEX_SPECIAL, temp_special);

      }
      return response;
    })
  },
  // getIndexDetail({ dispatch, commit, state }, param) {
  //   return api.getIndexDetail(param).then(response => {
  //     if (response.data.Result.Status == 0) {
  //       let temp_items = [];
  //       response.data.Items.forEach(item => {
  //         temp_items.push({
  //           type: item.Name,
  //           price: handle_price(item.Price),
  //           percent: handle_percent(item.Index),
  //           amount: handle_amount(item.DealNum),
  //         })
  //       })
  //       commit(types.REVEIVE_INDEX_DETAIL, temp_items);
  //     }
  //     return response;
  //   });
  // },
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
  },
  [types.REVEIVE_INDEX_SPECIAL](state, data) {
    state.indexSpecial = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


function handle_price(n) {
  if (n > 0) {
    // let temp = +n * 100 + '';
    let temp = +n * 1 + '';
    let pos_of_point = temp.indexOf('.');
    let pos_of_sub = 6;
    if (pos_of_point == pos_of_sub) {
      pos_of_sub += 1;
    }
    return temp.substring(0, pos_of_sub)
  } else return n;
}

function handle_percent(n) {
  if (n > 0) {
    // let temp = +n * 100 + '';
    let temp = +n * 1 + '';
    return temp.substring(0, temp.indexOf('.') + 4)
  } else return n;
}

function handle_amount(n) {
  return Math.floor(n)
}

function handle_acc(n) {
  return Math.floor(n)
}
