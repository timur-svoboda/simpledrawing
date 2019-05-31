import Circle from "./Circle.js";
import Mouse from "./../Mouse.js";

export default class CircleCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
    this.step = 0;
  }

  reset() {
    if (this.step === 1) {
      this.store.commit("setRadius", 0);
      const controls = this.store.getters.getCurrentTool.toolControllers;
      const index = controls.indexOf("RadiusControl");
      controls.splice(index, 1);

      this.circle.el.remove();
      this._unbindEvents();
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
    const el = this.canvas.circle(point.x, point.y, 0);
    this.circle = new Circle(el);

    const strokeType = this.store.getters.getCurrentTool.strokeType;
    this.circle.el.addClass(strokeType);
    this.circle.addTypes(strokeType);

    this.store.getters.getCurrentTool.toolControllers.push("RadiusControl");

    this._bindEvents();
    this.step = 1;
    return { done: false };
  }

  _secondStep() {
    this.store.commit("setRadius", 0);
    const controls = this.store.getters.getCurrentTool.toolControllers;
    const index = controls.indexOf("RadiusControl");
    controls.splice(index, 1);

    this._unbindEvents();
    this.step = 0;

    return {
      value: this.circle,
      done: true
    };
  }

  _bindEvents() {
    this.canvas.node.onmousemove = this._animateRadius.bind(this);
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = null;
  }

  _animateRadius(e) {
    const point = this.mouse.getBindingCoords(e);
    const radius = Math.ceil(this.circle.distFromCenterToPoint(point));

    this.circle.radius = radius;
    this.store.commit("setRadius", radius);
  }
}
