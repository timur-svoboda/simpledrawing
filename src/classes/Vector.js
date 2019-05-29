export default class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  product(v) {
    const i = this.y * v.z - this.z * v.y;
    const j = this.x * v.z - this.z * v.x;
    const k = this.x * v.y - this.y * v.x;

    return new Vector(i, -j, k);
  }

  length() {
    return Math.sqrt(this.dot(this));
  }
}
