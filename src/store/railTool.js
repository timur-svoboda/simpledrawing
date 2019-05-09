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
        label: "Parallel rail",
        id: "parallel"
      },
      {
        label: "Symmetrical rails",
        id: "symmetrical"
      }
    ],
    distToBaseRail: 0,
    railsState: true
  },
  getters: {
    getRailTypes(state) {
      return state.railTypes;
    },
    getDistToBaseRail(state) {
      return state.distToBaseRail;
    },
    getRailsState(state) {
      return state.railsState;
    }
  },
  mutations: {
    setDistToBaseRail(state, value) {
      state.distToBaseRail = value;
    },
    toggleRailsState(state) {
      state.railsState = !state.railsState;
    }
  }
};
