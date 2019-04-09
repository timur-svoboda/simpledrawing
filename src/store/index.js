import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import tool from "./tool.js";

export default new Vuex.Store({
  modules: {
    tool
  },
  state: {
    scale: 4,
    scrollDistance: 0
  },
  getters: {
    getScale(state) {
      return state.scale;
    },
    getScrollDistance(state) {
      return state.scrollDistance;
    }
  },
  mutations: {
    setScrollDistance(state, distance) {
      state.scrollDistance = distance;
    }
  },
  actions: {}
});
