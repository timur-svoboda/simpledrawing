/** Class representing the graphic user Interface */
export default class GUI {
  /**
   * Create an instance of GUI
   * @param {Object} store It is the vuex store
   */
  constructor(store) {
    this.store = store;
    this.paper = Snap("#drawing-window"); // eslint-disable-line no-undef
  }

  init() {}
}
