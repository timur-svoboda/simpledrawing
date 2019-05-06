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
    ]
  },
  getters: {
    getRailTypes(state) {
      return state.railTypes;
    }
  }
};
