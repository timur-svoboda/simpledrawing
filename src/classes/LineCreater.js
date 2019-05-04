import Mouse from "./Mouse.js";
import Point from "./Point.js";
import Line from "./Line.js";

export default class LineCreater {
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
      const types = ["line", this.subtype];
      const line = new Line(this.el, types);

      this.store.getters.getObjects.push(line);
      this._unbindEvents();
      this.tps = [];
      this.el = null;
    }
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
