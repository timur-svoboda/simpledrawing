import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import tool from "./tool.js";

export default new Vuex.Store({
  modules: {
    tool
  },
  state: {
    scale: 4
  },
  getters: {
    getScale(state) {
      return state.scale;
    }
  },
  mutations: {},
  actions: {}
});
