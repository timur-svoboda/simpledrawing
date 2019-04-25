import Mouse from "./Mouse.js";

export default class Rail {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.objects = store.getters.getobjects;
    this.mouse = new Mouse(canvas, store);
  }

  drawRail(e) {
    const railType = this.store.getters.getCurrentTool.railType;
    const { x, y } = this.mouse.getCoords(e);
    let railObject;

    if (railType === "vertical") {
      railObject = this._drawVerticalRail(x, y);
    } else if (railType === "horizontal") {
      railObject = this._drawHorizontalRail(x, y);
    }

    return railObject;
  }

  _drawVerticalRail(x, y) {
    const rail = this.canvas.line(x, y - 5000, x, y + 5000);
    rail.addClass("canvas__rail");

    const railObject = {
      el: rail,
      type: "vertical",
      controlPoints: []
    };
    this.objects.push(railObject);
    return railObject;
  }

  _drawHorizontalRail(x, y) {
    const rail = this.canvas.line(x - 5000, y, x + 5000, y);
    rail.addClass("canvas__rail");

    const railObject = {
      el: rail,
      type: "horizontal",
      controlPoints: []
    };
    this.objects.push(railObject);
    return railObject;
  }
}
