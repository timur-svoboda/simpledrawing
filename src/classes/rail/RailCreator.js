import HorizontalRailCreator from "./HorizontalRailCreator.js";
import VerticalRailCreator from "./VerticalRailCreator.js";
import ParallelRailCreator from "./ParallelRailCreator.js";
import SymmetricalRailsCreator from "./SymmetricalRailsCreator.js";
import ControlPoint from "./../ControlPoint.js";

export default class RailCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;

    this.horizontalRailCreator = new HorizontalRailCreator(canvas);
    this.verticalRailCreator = new VerticalRailCreator(canvas);
    this.parallelRailCreator = new ParallelRailCreator(canvas, store);
    this.symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
  }

  createRailsWrapper() {
    this.railsWrapper = this.canvas.g();
    this.railsWrapper.addClass("rails-wrappper");
  }

  toggleRails() {
    this.railsWrapper.toggleClass("hide");
    this.store.commit("toggleRailsState");
  }

  create(point) {
    const railType = this.store.getters.getCurrentTool.railType;
    let res;

    if (railType === "horizontal") {
      res = this.horizontalRailCreator.create(point);
    } else if (railType === "vertical") {
      res = this.verticalRailCreator.create(point);
    } else if (railType === "parallel") {
      res = this.parallelRailCreator.create(point);
    } else if (railType === "symmetrical") {
      res = this.symmetricalRailsCreator.create(point);
    }

    if (res.done) {
      const canvasObjects = this.store.getters.getObjects;

      for (let rail of res.value) {
        this._calcControlPoints(rail);
        this.railsWrapper.add(rail.el);
        canvasObjects.push(rail);
      }
    }
  }

  reset() {
    const railType = this.store.getters.getCurrentTool.railType;

    if (railType === "parallel") {
      this.parallelRailCreator.reset();
    } else if (railType === "symmetrical") {
      this.symmetricalRailsCreator.reset();
    }
  }

  _calcControlPoints(rail1) {
    const rails = this.store.getters.getRails;
    const controlPoints = this.store.getters.getControlPoints;

    rails.forEach(rail2 => {
      const cp = new ControlPoint(rail1, rail2);
      if (cp.x !== undefined && cp.y !== undefined) {
        controlPoints.push(cp);
      }
    });
  }
}
