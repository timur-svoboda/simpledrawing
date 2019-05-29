import CanvasObject from "./../CanvasObject.js";

export default class VerticalRail extends CanvasObject {
  constructor(el) {
    super(el);
    this.el.addClass("canvas__rail");
    this.addTypes("rail", "vertical");
  }

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
}
