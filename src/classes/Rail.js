export default class Rail {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.canvasObjects = store.getters.getCanvasObjects;
  }

  _drawVerticalRail(x, y) {
    const rail = this.canvas.line(x, y - 5000, x, y + 5000);
    rail.addClass("canvas__rail");

    const railObject = {
      el: rail,
      type: "vertical"
    };
    this.canvasObjects.push(railObject);
    return railObject;
  }

  _drawHorizontalRail(x, y) {
    const rail = this.canvas.line(x - 5000, y, x + 5000, y);
    rail.addClass("canvas__rail");

    const railObject = {
      el: rail,
      type: "horizontal"
    };
    this.canvasObjects.push(railObject);
    return railObject;
  }
}
