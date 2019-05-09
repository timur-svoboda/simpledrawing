import VerticalRail from "./VerticalRail.js";

export default class VerticalRailCreator {
  constructor(canvas) {
    this.canvas = canvas;
  }

  create(point) {
    const el = this.canvas.line(point.x, -100000, point.x, 100000);
    el.addClass("canvas__rail");

    return {
      value: [new VerticalRail(el)],
      done: true
    };
  }
}
