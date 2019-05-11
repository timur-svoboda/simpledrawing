export default {
  state: {
    strokeTypes: [
      {
        label: "Solid bold line",
        id: "solid-bold"
      },
      {
        label: "Dashed line",
        id: "dashed"
      },
      {
        label: "Solid thin line",
        id: "solid-thin"
      },
      {
        label: "Dashed dotted thin line",
        id: "dashed-dotted-thin"
      }
    ]
  },
  getters: {
    getStrokeTypes(state) {
      return state.strokeTypes;
    }
  }
};
