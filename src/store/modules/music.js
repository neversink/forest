import api from '../../api';
import * as types from '../mutation-types.js';

const state = {
  topten: [],
  article: {},
  author: {}, // 音乐人
  storyAuthor: {}, // 文章作者
}

const getters = {
  topten: state => state.topten,
  article: state => state.article,
  author: state => state.author,
  storyAuthor: state => state.storyAuthor
}

const actions = {
  getTopTen ({ commit }) {
    api.getToptenMusic().then(response => {
      console.log(response);
      commit(types.RECEIVE_TOPTEN, response.data.data);
    });
  },
}

const mutations = {
  [types.RECEIVE_TOPTEN] (state, data) {
    state.topten.length = 0;
    state.topten = data;
  },
  [types.RECEIVE_NEXTPAGE] (state, data) {
    state.topten = state.topten.concat(data);
  },
  [types.RECEIVE_MUSIC] (state, data) {
    state.article = data;
    state.author = data.author;
    state.storyAuthor = data.story_author
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
