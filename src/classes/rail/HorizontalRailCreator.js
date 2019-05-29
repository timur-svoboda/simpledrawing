import HorizontalRail from "./HorizontalRail.js";

export default class HorizontalRailCreator {
  constructor(canvas) {
    this.canvas = canvas;
  }

  create(point) {
    const el = this.canvas.line(-100000, point.y, 100000, point.y);

    return {
      value: [new HorizontalRail(el)],
      done: true
    };
  }
}
