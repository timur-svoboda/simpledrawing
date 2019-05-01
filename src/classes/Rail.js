import Mouse from "./Mouse.js";
import ControlPoint from "./ControlPoint.js";

export default class Rail {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
  }

  drawRail(e) {
    const railType = this.store.getters.getCurrentTool.railType;
    const { x, y } = this.mouse.getCoords(e);
    const types = ["rail"];
    let el;
    let offset;

    if (railType === "vertical") {
      el = this._drawVerticalRail(x);
      offset = x;
      types.push("vertical");
    } else if (railType === "horizontal") {
      el = this._drawHorizontalRail(y);
      offset = y;
      types.push("horizontal");
    }

    const rail = {
      el,
      types,
      offset,
      distToPoint: this.distToPoint,
      selected: false
    };

    this._calcControlPoints(rail);

    this.store.getters.getObjects.push(rail);
  }

  distToPoint(x, y) {
    let dist;

    if (this.types[1] === "vertical") {
      dist = Math.abs(x - this.offset);
    } else {
      dist = Math.abs(y - this.offset);
    }

    return dist;
  }

  _drawVerticalRail(x) {
    const el = this.canvas.line(x, -50000, x, 50000);
    el.addClass("canvas__rail");
    return el;
  }

  _drawHorizontalRail(y) {
    const el = this.canvas.line(-50000, y, 50000, y);
    el.addClass("canvas__rail");
    return el;
  }

  _calcControlPoints(rail1) {
    const rails = this.store.getters.getRails;
    const controlPoints = this.store.getters.getControlPoints;

    rails.forEach(rail2 => {
      const cp = new ControlPoint(rail1, rail2);
      if (cp.x && cp.y) {
        controlPoints.push(cp);
      }
    });
  }
}
