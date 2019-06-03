import CanvasObject from "./../CanvasObject.js";
import Point from "./../Point.js";
import Vector from "./../Vector.js";

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

  distToPoint(point) {
    const distFromArcToPoint = Math.abs(
      this._distFromCenterToPoint(point) - this.radius
    );
    const distFromStartToPoint = this.start.distToPoint(point);
    const distFromEndToPoint = this.end.distToPoint(point);

    const oa = new Vector(
      this.start.x - this.center.x,
      this.start.y - this.center.y,
      0
    );
    const ob = new Vector(
      this.end.x - this.center.x,
      this.end.y - this.center.y,
      0
    );
    const op = new Vector(point.x - this.center.x, point.y - this.center.y, 0);

    const a = oa.angle(op);
    const b = ob.angle(op);
    const y = oa.angle(ob);

    if (this.laf === 0) {
      if (a <= y && b <= y) {
        return distFromArcToPoint;
      } else {
        return Math.min(distFromStartToPoint, distFromEndToPoint);
      }
    } else if (this.laf === 1) {
      if (a >= y || b >= y) {
        return distFromArcToPoint;
      } else {
        return Math.min(distFromStartToPoint, distFromEndToPoint);
      }
    }
  }

  _distFromCenterToPoint(point) {
    return Math.sqrt(
      Math.pow(this.center.x - point.x, 2) +
        Math.pow(this.center.y - point.y, 2)
    );
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
    return parsedD.rx;
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
    const dObj = this.parseD(this.d);

    const e = dObj.sf === 1 ? -1 : 1;
    const g = dObj.laf === 1 ? 1 : -1;

    const d = Math.sqrt(
      Math.pow(dObj.x2 - dObj.x1, 2) + Math.pow(dObj.y2 - dObj.y1, 2)
    );

    const u = (dObj.x2 - dObj.x1) / d;
    const v = (dObj.y2 - dObj.y1) / d;

    const h = Math.sqrt(Math.pow(dObj.rx, 2) - (d * d) / 4);

    const cx = (dObj.x1 + dObj.x2) / 2 - g * e * h * v;
    const cy = (dObj.y1 + dObj.y2) / 2 + g * e * h * u;

    if (cx && cy) {
      return new Point(cx, cy);
    } else {
      return false;
    }
  }

  set center(point) {
    const center = this.center;

    if (center) {
      const deltaX = point.x - center.x;
      const deltaY = point.y - center.y;

      this.start = new Point(this.start.x + deltaX, this.start.y + deltaY);
      this.end = new Point(this.end.x + deltaX, this.end.y + deltaY);
    }
  }
}
