export default {
  state: {
    tools: [
      {
        id: "select",
        iconName: "select.svg",
        toolControllers: ["IconControl"]
      },
      {
        id: "rails",
        iconName: "rails.svg",
        toolControllers: ["IconControl"],
        railType: "horizontal"
      },
      {
        id: "line",
        iconName: "line.svg",
        toolControllers: ["IconControl"]
      },
      {
        id: "circular-arc",
        iconName: "circular-arc.svg",
        toolControllers: ["IconControl"]
      },
      {
        id: "ruler",
        iconName: "ruler.svg",
        toolControllers: ["IconControl"]
      }
    ],
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
          store.commit("changeCurrentTool", "select"); // eslint-disable-line eslint no-console
        }
      },
      {
        id: "rails",
        icon: "rails",
        text: "Rails",
        on(store) {
          store.commit("changeCurrentTool", "rails"); // eslint-disable-line eslint no-console
        }
      },
      {
        id: "line",
        icon: "line",
        text: "Line",
        on(store) {
          store.commit("changeCurrentTool", "line"); // eslint-disable-line eslint no-console
        }
      },
      {
        id: "circular-arc",
        icon: "circular-arc",
        text: "Circle",
        on(store) {
          store.commit("changeCurrentTool", "circular-arc"); // eslint-disable-line eslint no-console
        }
      },
      {
        id: "ruler",
        icon: "ruler",
        text: "Ruler",
        on(store) {
          store.commit("changeCurrentTool", "ruler"); // eslint-disable-line eslint no-console
        }
      }
    ],
    objects: []
  },
  getters: {
    getobjects(state) {
      return state.objects;
    },
    getRadialNavIcons(state) {
      return state.radialNavIcons;
    },
    getTools(state) {
      return state.tools;
    },
    getCurrentTool(state) {
      return state.currentTool;
    },
    getRadialNavParams(state) {
      return state.radialNavParams;
    }
  },
  mutations: {
    changeCurrentTool(state, payload) {
      let tools = state.tools,
        currentTool;

      for (let i = 0, len = tools.length; i < len; i++) {
        if (tools[i].id === payload) {
          currentTool = tools[i];
        }
        if (tools[i].id === state.currentTool.id) {
          state.tools[i] = state.currentTool;
        }
      }

      state.currentTool = currentTool;
    }
  }
};
