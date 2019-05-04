import CanvasObject from "./CanvasObject.js";

export default class Rail extends CanvasObject {
  distToPoint(x, y) {
    if (this.types.indexOf("vertical") !== -1) {
      return Math.abs(x - this.offset);
    } else {
      return Math.abs(y - this.offset);
    }
  }

  get offset() {
    if (this.types.indexOf("vertical") !== -1)
      return Number(this.el.attr("x1"));
    else return Number(this.el.attr("y1"));
  }

  set offset(value) {
    if (this.types.indexOf("vertical")) {
      this.el.attr("x1", value);
      this.el.attr("x2", value);
    } else {
      this.el.attr("y1", value);
      this.el.attr("y2", value);
    }
  }
}
