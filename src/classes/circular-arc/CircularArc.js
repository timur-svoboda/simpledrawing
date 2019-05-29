import CanvasObject from "./../CanvasObject.js";
import Point from "./../Point.js";

export default class CircularArc extends CanvasObject {
  constructor(el) {
    super(el);
    this.el.addClass("canvas__arc");
    this.addTypes("circular-arc");
  }

  parseD(str) {
    str = str.replace(/[MA]/gi, "");
    str = str.replace(/\s/gi, ",");
    const arr = str.split(",");
    return {
      x1: +arr[0],
      y1: +arr[1],
      rx: +arr[2],
      ry: +arr[3],
      xar: +arr[4],
      laf: +arr[5],
      sf: +arr[6],
      x2: +arr[7],
      y2: +arr[8]
    };
  }

  stringifyD(obj) {
    return `M${obj.x1},${obj.y1} A${obj.rx},${obj.ry},${obj.xar},${obj.laf},${
      obj.sf
    },${obj.x2},${obj.y2}`;
  }

  get d() {
    return this.el.attr("d");
  }

  set d(value) {
    this.el.attr("d", value);
  }

  get start() {
    const dObj = this.parseD(this.d);
    return new Point(dObj.x1, dObj.y1);
  }

  set start(point) {
    const dObj = this.parseD(this.d);
    dObj.x1 = point.x;
    dObj.y1 = point.y;
    this.d = this.stringifyD(dObj);
  }

  get radius() {
    const parsedD = this.parseD(this.d);
    if (parsedD.rx === parsedD.ry) return parsedD.rx;
  }

  set radius(value) {
    const dObj = this.parseD(this.d);
    dObj.rx = value;
    dObj.ry = value;
    this.d = this.stringifyD(dObj);
  }

  get laf() {
    return this.parseD(this.d).laf;
  }

  set laf(value) {
    const dObj = this.parseD(this.d);
    dObj.laf = value;
    this.d = this.stringifyD(dObj);
  }

  get sf() {
    return this.parseD(this.d).sf;
  }

  set sf(value) {
    const dObj = this.parseD(this.d);
    dObj.sf = value;
    this.d = this.stringifyD(dObj);
  }

  get end() {
    const dObj = this.parseD(this.d);
    return new Point(dObj.x2, dObj.y2);
  }

  set end(point) {
    const dObj = this.parseD(this.d);
    dObj.x2 = point.x;
    dObj.y2 = point.y;
    this.d = this.stringifyD(dObj);
  }

  get center() {
    const e = this.sf === 1 ? -1 : 1;
    const g = this.laf === 1 ? 1 : -1;

    const d = Math.sqrt(
      Math.pow(this.end.x - this.start.x, 2) +
        Math.pow(this.end.y - this.start.y, 2)
    );

    const u = (this.end.x - this.start.x) / d;
    const v = (this.end.y - this.start.y) / d;

    const h = Math.sqrt(Math.pow(this.radius, 2) - (d * d) / 4);

    const cx = (this.start.x + this.end.x) / 2 - g * e * h * v;
    const cy = (this.start.y + this.end.y) / 2 + g * e * h * u;

    return new Point(cx, cy);
  }

  set center(point) {
    const deltaX = point.x - this.center.x;
    const deltaY = point.y - this.center.y;

    this.start = new Point(this.start.x + deltaX, this.start.y + deltaY);
    this.end = new Point(this.end.x + deltaX, this.end.y + deltaY);
  }
}
