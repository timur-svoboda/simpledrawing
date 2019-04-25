import Canvas from "./Canvas.js";
import Scroll from "./Scroll.js";
import RadialNav from "./RadialNav.js";
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
/** Class representing the graphic user Interface */
export default class GUI {
  /**
   * Create an instance of GUI
   * @param {Object} store It is the vuex store
   */
  constructor(store) {
    this.store = store;
    this.paper = Snap("#drawing-window");
  }

  init() {
    const canvasInstance = new Canvas(this.paper, this.store);
    const canvas = canvasInstance.init();

    const scrollInstance = new Scroll(canvas, this.store);
    scrollInstance.init();

    const radialNav = new RadialNav(this.paper, this.store);
    radialNav.init();
  }
}
