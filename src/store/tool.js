export default {
  state: {
    currentTool: {
      id: "select",
      iconName: "select.svg",
      toolControllers: ["IconControl"]
    },
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
        text: "Selection",
        on(store) {
          console.log("bla");
        }
      },
      {
        id: "rails",
        icon: "rails",
        text: "Rail",
        on(store) {
          console.log("bla");
        }
      },
      {
        id: "line",
        icon: "line",
        text: "Line",
        on(store) {
          console.log("bla");
        }
      },
      {
        id: "circular-arc",
        icon: "circular-arc",
        text: "Circle",
        on(store) {
          console.log("bla");
        }
      }
    ]
  },
  getters: {
    getRadialNavIcons(state) {
      return state.radialNavIcons;
    },
    getCurrentTool(state) {
      return state.currentTool;
    },
    getRadialNavParams(state) {
      return state.radialNavParams;
    }
  }
};
