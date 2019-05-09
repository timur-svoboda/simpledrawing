import Rail from "./Rail.js";

export default class HorizontalRail extends Rail {
  get offset() {
    return Number(this.el.attr("y1"));
  }

  set offset(value) {
    this.el.attr("y1", value);
    this.el.attr("y2", value);
  }

  distToPoint(point) {
    return Math.abs(point.y - this.offset);
  }

  clone() {
    return new HorizontalRail(this.el.clone());
  }

  get types() {
    return ["rail", "horizontal"];
  }
}
