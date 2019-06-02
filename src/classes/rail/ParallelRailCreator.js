import Mouse from "./../Mouse.js";

export default class ParallelRailCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
    this.step = 0;
  }

  reset() {
    if (this.step === 1) {
      this._unbindEvents();
      this.baseRail.unselect();
      this.rail.el.remove();

      this.store.commit("setDistToBaseRail", 0);
      const controls = this.store.getters.getCurrentTool.toolControllers;
      const index = controls.indexOf("DistToBaseRail");
      controls.splice(index, 1);

      this.step = 0;
    }
  }

  create(point) {
    if (this.step === 0) {
      return this._firstStep(point);
    } else if (this.step === 1) {
      return this._secondStep();
    }
  }

  _firstStep(point) {
    const rails = this.store.getters.getRails;
    const { co, dist } = this.mouse.getClosestObject(point, rails);

    if (co !== null && dist !== null && dist <= 15) {
      this.baseRail = co;
      this.rail = this.baseRail.clone();
      this.baseRail.select();

      this.store.getters.getCurrentTool.toolControllers.push(
        "DistToBaseRailControl"
      );

      this._bindEvents();
      this.step = 1;
    }

    return { done: false };
  }

  _secondStep() {
    this._unbindEvents();
    this.baseRail.unselect();

    this.store.commit("setDistToBaseRail", 0);
    const controls = this.store.getters.getCurrentTool.toolControllers;
    const index = controls.indexOf("DistToBaseRailControl");
    controls.splice(index, 1);

    this.step = 0;

    return {
      value: [this.rail],
      done: true
    };
  }

  _bindEvents() {
    this.canvas.node.onmousemove = this._animateOffset.bind(this);
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = undefined;
  }

  _animateOffset(e) {
    const point = this.mouse.getCoords(e);
    const deltaOffset = this.baseRail.distToPoint(point);

    if (this.rail.types.indexOf("horizontal") !== -1) {
      this.rail.offset = point.y;
    } else {
      this.rail.offset = point.x;
    }

    this.store.commit("setDistToBaseRail", deltaOffset);
  }
}
