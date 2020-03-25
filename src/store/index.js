import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import user from './modules/user.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
