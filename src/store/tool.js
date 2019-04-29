import radialNav from "./radialNav.js";
import railTool from "./railTool.js";

export default {
  modules: {
    radialNav,
    railTool
  },
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
        toolControllers: ["IconControl", "RailTypeControl"],
        railType: "vertical"
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
    objects: [],
    controlPoints: []
  },
  getters: {
    getTools(state) {
      return state.tools;
    },
    getCurrentTool(state) {
      return state.currentTool;
    },
    getObjects(state) {
      return state.objects;
    },
    getSelectedObjects(state) {
      return state.objects.filter(obj => {
        return obj.selected;
      });
    },
    getRails(state) {
      return state.objects.filter(obj => {
        return obj.types.indexOf("rail") !== -1;
      });
    },
    getControlPoints(state) {
      return state.controlPoints;
    }
  },
  mutations: {
    setCurrentTool(state, payload) {
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
    },
    setRailType(state, payload) {
      const curTool = state.currentTool;

      if (curTool.railType) {
        curTool.railType = payload;
      }
    }
  }
};
