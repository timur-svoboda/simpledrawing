import CanvasObject from "./CanvasObject.js";
import Vector from "./Vector.js";

export default class Line extends CanvasObject {
  distToPoint(point) {
    if (
      (this.x1 === point.x && this.y1 === point.y) ||
      (this.x2 === point.x && this.y2 === point.y)
    )
      return 0;

    const v = new Vector(this.x2 - this.x1, this.y2 - this.y1);
    const w0 = new Vector(point.x - this.x1, point.y - this.y1);
    const w1 = new Vector(this.x2 - point.x, this.y2 - point.y);

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

  get x1() {
    return Number(this.el.attr("x1"));
  }

  get y1() {
    return Number(this.el.attr("y1"));
  }

  get x2() {
    return Number(this.el.attr("x2"));
  }

  get y2() {
    return Number(this.el.attr("y2"));
  }

  set x1(value) {
    this.el.attr("x1", value);
  }

  set y1(value) {
    this.el.attr("y1", value);
  }

  set x2(value) {
    this.el.attr("x2", value);
  }

  set y2(value) {
    this.el.attr("y2", value);
  }
}
