import Canvas from "./Canvas.js";
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
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

  init() {
    const canvas = new Canvas(this.paper, this.store);
    canvas.init({
      orientation: "vertical"
    });
  }
}
