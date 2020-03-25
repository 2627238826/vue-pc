import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils';

// 根store
export default {
  namespaced: true,
  state: {
    token: getLocalStorage('token')
  },
  getters: {
    token: state => state.token
  },
  mutations: {
    SET_VALUE_BY_KEY(state, data) {
      for (let key in data) {
        state[key] = data[key];
        setLocalStorage(key, data[key]);
      }
    },
    REMOVE_STATE_BY_KEY(state, key) {
      state[key] = '';
      removeLocalStorage(key);
    }
  },
  actions: {
    logout({ commit, state }) {
      commit('REMOVE_STATE_BY_KEY', 'token');
      window.location.href = window.location.href.split('#/')[0];
    }
  }
};
