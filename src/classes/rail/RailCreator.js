import HorizontalRailCreator from "./HorizontalRailCreator.js";
import VerticalRailCreator from "./VerticalRailCreator.js";
import SymmetricalRailsCreator from "./SymmetricalRailsCreator.js";
import ControlPoint from "./../ControlPoint.js";

export default class RailCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;

    this.horizontalRailCreator = new HorizontalRailCreator(canvas);
    this.verticalRailCreator = new VerticalRailCreator(canvas);
    this.symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
  }

  create(point) {
    const railType = this.store.getters.getCurrentTool.railType;
    let res;

    if (railType === "horizontal") {
      res = this.horizontalRailCreator.create(point);
    } else if (railType === "vertical") {
      res = this.verticalRailCreator.create(point);
    } else if (railType === "symmetrical") {
      res = this.symmetricalRailsCreator.create(point);
    }

    if (res.done) {
      const canvasObjects = this.store.getters.getObjects;

      for (let rail of res.value) {
        this._calcControlPoints(rail);
        canvasObjects.push(rail);
      }
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
