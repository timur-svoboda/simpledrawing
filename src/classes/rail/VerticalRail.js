import Rail from "./Rail.js";

export default class VerticalRail extends Rail {
  get offset() {
    return Number(this.el.attr("x1"));
  }

  set offset(value) {
    this.el.attr("x1", value);
    this.el.attr("x2", value);
  }

  distToPoint(point) {
    return Math.abs(point.x - this.offset);
  }

  clone() {
    return new VerticalRail(this.el.clone());
  }

  get types() {
    return ["rail", "vertical"];
  }
}
