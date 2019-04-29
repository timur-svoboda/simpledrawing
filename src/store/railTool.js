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
      }
    ]
  },
  getters: {
    getRailTypes(state) {
      return state.railTypes;
    }
  }
};
