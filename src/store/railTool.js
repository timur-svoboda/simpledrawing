export default {
  state: {
    railTypes: [
      {
        label: "Vertical rail",
        id: "vertical"
      },
      {
        label: "Horizontal rail",
        id: "horizontal"
      },
      {
        label: "Symmetrical rails",
        id: "symmetrical"
      }
    ],
    distToBaseRail: 0
  },
  getters: {
    getRailTypes(state) {
      return state.railTypes;
    },
    getDistToBaseRail(state) {
      return state.distToBaseRail;
    }
  },
  mutations: {
    setDistToBaseRail(state, value) {
      state.distToBaseRail = value;
    }
  }
};
