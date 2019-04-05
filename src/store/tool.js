export default {
  state: {
    currentTool: {
      id: "select",
      icon: "select.svg",
      toolControllers: ["IconControl"]
    }
  },
  getters: {
    getCurrentTool(state) {
      return state.currentTool;
    }
  }
};
