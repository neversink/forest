import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home.js';
import news from './modules/news.js';
import business from './modules/business.js';
import market from './modules/market.js';
import signup from './modules/signup.js';
import signin from './modules/signin.js';
import profile from './modules/profile.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    news,
    business,
    market,
    signup,
    signin,
    profile,
  },
  //strict: true
});
