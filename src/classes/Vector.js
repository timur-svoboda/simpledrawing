export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  length() {
    return Math.sqrt(this.dot(this));
  }
}
