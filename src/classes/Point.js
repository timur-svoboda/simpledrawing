export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.types = ["point", "normal"];
  }

  distToPoint(point) {
    return Math.sqrt(
      Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
    );
  }
}
