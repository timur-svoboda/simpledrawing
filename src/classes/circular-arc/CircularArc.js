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
      x1: arr[0],
      y1: arr[1],
      r: arr[2],
      xar: arr[4],
      laf: arr[5],
      sf: arr[6],
      x2: arr[7],
      y2: arr[8]
    };
  }

  stringifyD(obj) {
    return `M${obj.x1},${obj.y1} A${obj.r},${obj.r},${obj.xar},${obj.laf},${
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
    return this.parseD(this.d).r;
  }

  set radius(value) {
    const dObj = this.parseD(this.d);
    dObj.r = value;
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
    const dObj = this.parseD(this.d);
    const e = dObj.sf === 1 ? -1 : 1;
    const g = dObj.laf === 1 ? 1 : -1;

    const d = Math.sqrt(
      Math.pow(dObj.x2 - dObj.x1, 2) + Math.pow(dObj.y2 - dObj.y1, 2)
    );

    const u = (dObj.x2 - dObj.x1) / d;
    const v = (dObj.y2 - dObj.y1) / d;

    const h = Math.sqrt(Math.pow(dObj.r, 2) - (d * d) / 4);

    const cx = (dObj.x1 + dObj.x2) / 2 - g * e * h * v;
    const cy = (dObj.y1 + dObj.y2) / 2 + g * e * h * u;

    return new Point(cx, cy);
  }

  set center(point) {
    const deltaX = this.point.x - this.center.x;
    const deltaY = this.point.y - this.center.y;

    this.start = new Point(this.start.x + deltaX, this.start.y + deltaY);
    this.end = new Point(this.end.x + deltaX, this.end.y + deltaY);
  }
}
