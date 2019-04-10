export default class Util {
  static polarToCartesian(cx, cy, r, angle) {
    angle = ((angle - 90) * Math.PI) / 180; // Degrees to radians
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  }

  static describeArc(x, y, r, startAngle, endAngle, continueLine) {
    let start = this.polarToCartesian(x, y, r, (startAngle %= 360));
    let end = this.polarToCartesian(x, y, r, (endAngle %= 360));
    let large = Math.abs(endAngle - startAngle) >= 180;
    let alter = endAngle > startAngle;
    return `${continueLine ? "L" : "M"}${start.x},${start.y}
    A${r},${r},0,
    ${large ? 1 : 0},
    ${alter ? 1 : 0},
    ${end.x},${end.y}`;
  }

  static describeSector(x, y, r, r2, startAngle, endAngle) {
    return `${this.describeArc(x, y, r, startAngle, endAngle)}
    ${this.describeArc(x, y, r2, endAngle, startAngle, true)} Z`;
  }

  static animate(Snap, obj, index, start, end, duration, easing, fn, cb) {
    var _ref;
    if (
      (_ref = (obj.animation != null ? obj.animation : (obj.animation = []))[
        index
      ]) != null
    ) {
      _ref.stop();
    }
    return (obj.animation[index] = Snap.animate(
      start,
      end,
      fn,
      duration,
      easing,
      cb
    ));
  }

  static getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
