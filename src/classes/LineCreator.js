import Mouse from "./Mouse.js";
import Point from "./Point.js";
import Line from "./Line.js";

export default class LineCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
    this.step = 0;
  }

  create(point) {
    if (this.step === 0) {
      this._firstStep(point);
    } else if (this.step === 1) {
      this._secondStep();
    }
  }

  _firstStep(point) {
    const el = this.canvas.line(point.x, point.y, point.x, point.y);
    const strokeType = this.store.getters.getCurrentTool.strokeType;

    this.line = new Line(el, strokeType);

    this._bindEvents();

    this.step = 1;
  }

  _secondStep() {
    this._unbindEvents();
    this.store.getters.getObjects.push(this.line);
    this.step = 0;
  }

  reset() {
    if (this.step === 1) {
      this._unbindEvents();
      this.line.el.remove();
      this.step = 0;
    }
  }

  _bindEvents() {
    this.canvas.node.onmousemove = this._animateEndingCoords.bind(this);
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = null;
  }

  _animateEndingCoords(e) {
    const point = this.mouse.getBindingCoords(e);
    this.line.x2 = point.x;
    this.line.y2 = point.y;
  }
}
