import Mouse from "./Mouse.js";
import Point from "./Point.js";
import Vector from "./Vector.js";

export default class Line {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
    this.tps = []; // Temporary points
    this.el = null;
    this.subtype;
  }

  drawLine(e) {
    const { x, y } = this.mouse.getBindingCoords(e);

    this._addPoint(x, y);

    if (this.tps.length === 1) {
      if (!this.el) {
        this.el = this.canvas.line(
          this.tps[0].x,
          this.tps[0].y,
          this.tps[0].x,
          this.tps[0].y
        );
        this.el.addClass("canvas__line");

        this.subtype = this.store.getters.getCurrentTool.lineType;
        this.el.addClass(`canvas__line_${this.subtype}`);

        this._bindEvents();
      }
    } else if (this.tps.length === 2) {
      const line = {
        el: this.el,
        types: ["line", this.subtype],
        x1: this.tps[0].x,
        y1: this.tps[0].y,
        x2: this.tps[1].x,
        y2: this.tps[1].y,
        distToPoint: this.distToPoint,
        selected: false
      };

      this.store.getters.getObjects.push(line);
      this._unbindEvents();
      this.tps = [];
      this.el = null;
    }
  }

  distToPoint(x, y) {
    if ((this.x1 === x && this.y1 === y) || (this.x2 === x && this.y2 === y))
      return 0;

    const v = new Vector(this.x2 - this.x1, this.y2 - this.y1);
    const w0 = new Vector(x - this.x1, y - this.y1);
    const w1 = new Vector(this.x2 - x, this.y2 - y);

    if (v.length() === 0) return w0.length();

    const c1 = w0.dot(v);
    if (c1 <= 0) return w0.length();

    const c2 = v.dot(v);
    if (c2 <= c1) return w1.length();

    const p = (w0.length() + w1.length() + v.length()) / 2;
    return (
      (2 *
        Math.sqrt(
          p * (p - v.length()) * (p - w1.length()) * (p - w0.length())
        )) /
      v.length()
    );
  }

  reset() {
    this._unbindEvents();
    this.tps = [];
    if (this.el) {
      this.el.remove();
      this.el = null;
    }
  }

  _addPoint(x, y) {
    const alreadyExist = this.tps.some(tp => {
      return tp.x === x && tp.y === y;
    });
    if (!alreadyExist) {
      this.tps.push(new Point(x, y));
    }
  }

  _bindEvents() {
    this.canvas.node.onmousemove = e => {
      const { x, y } = this.mouse.getBindingCoords(e);
      this._animate(x, y);
    };
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = undefined;
  }

  _animate(x, y) {
    this.el.attr({
      x2: x,
      y2: y
    });
  }
}
