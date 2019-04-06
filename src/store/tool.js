export default {
  state: {
    currentTool: {
      id: "select",
      iconName: "select.svg",
      toolControllers: ["IconControl"]
    }
  },
  getters: {
    getCurrentTool(state) {
      return state.currentTool;
    }
  }
};
