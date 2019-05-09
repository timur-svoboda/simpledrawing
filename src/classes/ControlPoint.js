export default class ControlPoint {
  constructor(rail1, rail2) {
    this.rails = [rail1, rail2];
    this.types = ["point", "control"];
    this._calcCoords();
  }

  _calcCoords() {
    if (this.rails[0].types[0] === this.rails[1].types[0]) {
      if (this.rails[0].types[1] !== this.rails[1].types[1]) {
        if (this.rails[0].types[1] === "vertical") {
          this.x = this.rails[0].offset;
          this.y = this.rails[1].offset;
        } else {
          this.x = this.rails[1].offset;
          this.y = this.rails[0].offset;
        }
      }
    }
  }

  distToPoint(point) {
    return Math.sqrt(
      Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
    );
  }
}
