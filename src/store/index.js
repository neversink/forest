import Vue from 'vue';
import Vuex from 'vuex';

import news from './modules/news.js';
import market from './modules/market.js';
// import event from './modules/event.js';
// import profile from './modules/profile.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    news,
    market,
    // event,
    // profile
  },
  //strict: true
});
