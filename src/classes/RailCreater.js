import Mouse from "./Mouse.js";
import ControlPoint from "./ControlPoint.js";
import Rail from "./Rail.js";

export default class RailCreater {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);

    this.baseRail = null;
    this.rails = [];
  }

  drawRail(e) {
    const railType = this.store.getters.getCurrentTool.railType;
    const { x, y } = this.mouse.getCoords(e);
    const types = ["rail"];
    let el;

    if (railType === "symmetrical") {
      this._drawSymmetricRails(x, y);
    } else {
      if (railType === "vertical") {
        el = this._drawVerticalRail(x);
        types.push("vertical");
      } else if (railType === "horizontal") {
        el = this._drawHorizontalRail(y);
        types.push("horizontal");
      }

      const rail = new Rail(el, types);
      this._calcControlPoints(rail);
      this.store.getters.getObjects.push(rail);
    }
  }

  _drawSymmetricRails(x, y) {
    if (this.baseRail === null) {
      const rails = this.store.getters.getRails;
      const { co, dist } = this.mouse.getClosestObject(x, y, rails);

      if (dist <= 15) {
        this.baseRail = co;

        for (let i = 0; i < 2; i++) {
          const rail = this.baseRail.clone();
          this.rails.push(rail);
        }

        this.baseRail.select();

        this._bindEvents();
      }
    } else {
      this._unbindEvents();

      this.baseRail.unselect();
      this.baseRail = null;

      for (let i = 0; i < 2; i++) {
        const rail = this.rails[i];
        this._calcControlPoints(rail);
        this.store.getters.getObjects.push(rail);
      }

      this.rails = [];
    }
  }

  _bindEvents() {
    this.canvas.node.onmousemove = e => {
      const { x, y } = this.mouse.getBindingCoords(e);
      const offset = this.baseRail.offset;
      const deltaOffset = this.baseRail.distToPoint(x, y);
      this._animate(offset, deltaOffset);
    };
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = undefined;
  }

  _animate(offset, deltaOffset) {
    this.rails[0].offset = offset + deltaOffset;
    this.rails[1].offset = offset - deltaOffset;
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
      if (cp.x !== undefined && cp.y !== undefined) {
        controlPoints.push(cp);
      }
    });
  }
}
