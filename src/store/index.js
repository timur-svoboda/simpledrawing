import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import tool from "./tool.js";
import guide from "./guide.js";

export default new Vuex.Store({
  modules: {
    tool,
    guide
  },
  state: {
    scale: 4,
    scrollDistance: 0,
    bindingDistance: 15
  },
  getters: {
    getScale(state) {
      return state.scale;
    },
    getScrollDistance(state) {
      return state.scrollDistance;
    },
    getBindingDistance(state) {
      return state.bindingDistance;
    }
  },
  mutations: {
    setScrollDistance(state, distance) {
      state.scrollDistance = distance;
    }
  }
});
