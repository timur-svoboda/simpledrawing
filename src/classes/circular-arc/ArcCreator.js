import CircleCreator from "./CircleCreator.js";
import CircularArcCreator from "./CircularArcCreator.js";

export default class ArcCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;

    this.circleCreator = new CircleCreator(canvas, store);
    this.circularArcCreator = new CircularArcCreator(canvas, store);
  }

  create(point) {
    const arcType = this.store.getters.getCurrentTool.arcType;
    let res;

    if (arcType === "circle") {
      res = this.circleCreator.create(point);
    } else if (arcType === "circular-arc") {
      res = this.circularArcCreator.create(point);
    }

    if (res && res.done && res.value) {
      this.store.getters.getObjects.push(res.value);
    }
  }

  reset() {
    const arcType = this.store.getters.getCurrentTool.arcType;

    if (arcType === "circle") {
      this.circleCreator.reset();
    } else if (arcType === "circular-arc") {
      this.circularArcCreator.reset();
    }
  }
}
