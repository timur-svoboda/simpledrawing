import HorizontalRail from "./HorizontalRail.js";
import VerticalRail from "./VerticalRail.js";
import Mouse from "./../Mouse.js";

export default class SymmetricalRailsCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
  }

  create(point) {
    if (!this.baseRail) {
      const rails = this.store.getters.getRails;
      const { co, dist } = this.mouse.getClosestObject(point, rails);

      if (dist <= 15) {
        this.baseRail = co;
        this.rails = [];

        for (let i = 0; i < 2; i++) {
          const rail = this.baseRail.clone();
          this.rails.push(rail);
        }

        this.baseRail.select();

        this.store.getters.getCurrentTool.toolControllers.push(
          "DistToBaseRail"
        );

        this._bindEvents();
      }

      return { done: false };
    } else {
      this._unbindEvents();

      const controls = this.store.getters.getCurrentTool.toolControllers;
      const index = controls.indexOf("DistToBaseRail");
      controls.splice(index, 1);

      this.baseRail.unselect();
      this.baseRail = undefined;

      return {
        value: this.rails,
        done: true
      };
    }
  }

  _bindEvents() {
    this.canvas.node.onmousemove = e => {
      const point = this.mouse.getCoords(e);
      const offset = this.baseRail.offset;
      const deltaOffset = this.baseRail.distToPoint(point);
      this._animate(offset, deltaOffset);
      this.store.commit("setDistToBaseRail", deltaOffset);
    };
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = undefined;
  }

  _animate(offset, deltaOffset) {
    this.rails[0].offset = offset + deltaOffset;
    this.rails[1].offset = offset - deltaOffset;
  }
}
