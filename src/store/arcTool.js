export default {
  state: {
    arcTypes: [
      {
        label: "Circle",
        id: "circle"
      },
      {
        label: "Circular Arc",
        id: "circular-arc"
      }
    ],
    radius: 0
  },
  getters: {
    getArcTypes(state) {
      return state.arcTypes;
    },
    getRadius(state) {
      return state.radius;
    }
  },
  mutations: {
    setRadius(state, value) {
      state.radius = value;
    }
  }
};
