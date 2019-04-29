export default {
  state: {
    radialNavParams: {
      size: 500,
      c: 250, // Center
      r: 125, // Outer radius
      r2: 44, // Inner radius
      animDuration: 300
    },
    radialNavIcons: [
      {
        id: "select",
        icon: "move",
        text: "Selection"
      },
      {
        id: "rails",
        icon: "rails",
        text: "Rails"
      },
      {
        id: "line",
        icon: "line",
        text: "Line"
      },
      {
        id: "circular-arc",
        icon: "circular-arc",
        text: "Circle"
      },
      {
        id: "ruler",
        icon: "ruler",
        text: "Ruler"
      }
    ]
  },
  getters: {
    getRadialNavParams(state) {
      return state.radialNavParams;
    },
    getRadialNavIcons(state) {
      return state.radialNavIcons;
    }
  }
};
