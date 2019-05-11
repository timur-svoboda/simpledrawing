import Mouse from "./../Mouse.js";

export default class SymmetricalRailsCreator {
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
      this.rails[0].el.remove();
      this.rails[1].el.remove();

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

    if (co && dist <= 15) {
      this.baseRail = co;
      this.rails = [];

      for (let i = 0; i < 2; i++) {
        const rail = this.baseRail.clone();
        this.rails.push(rail);
      }

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
      value: this.rails,
      done: true
    };
  }

  _bindEvents() {
    this.canvas.node.onmousemove = e => {
      const point = this.mouse.getCoords(e);
      const offset = this.baseRail.offset;
      const deltaOffset = this.baseRail.distToPoint(point);
      this._setOffset(offset, deltaOffset);
      this.store.commit("setDistToBaseRail", deltaOffset);
    };
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = undefined;
  }

  _setOffset(offset, deltaOffset) {
    this.rails[0].offset = offset + deltaOffset;
    this.rails[1].offset = offset - deltaOffset;
  }
}
