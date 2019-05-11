import CanvasObject from "./../CanvasObject.js";
import Point from "./../Point.js";

export default class Circle extends CanvasObject {
  constructor(el) {
    super(el);
    this.el.addClass("canvas__arc");
    this.addTypes("circle");
  }

  get radius() {
    return Number(this.el.attr("r"));
  }

  set radius(value) {
    this.el.attr("r", value);
  }

  get center() {
    const cx = Number(this.el.attr("cx"));
    const cy = Number(this.el.attr("cy"));
    return new Point(cx, cy);
  }

  set center(point) {
    this.el.attr("cx", point.x);
    this.el.attr("cy", point.y);
  }

  distFromCenterToPoint(point) {
    return Math.sqrt(
      Math.pow(this.center.x - point.x, 2) +
        Math.pow(this.center.y - point.y, 2)
    );
  }

  distToPoint(point) {
    return Math.abs(this.distFromCenterToPoint(point) - this.radius);
  }
}
