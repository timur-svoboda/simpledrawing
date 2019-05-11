import Mouse from "./../Mouse.js";

export default class CircularArcCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(canvas, store);
    this.step = 0;
  }
}
