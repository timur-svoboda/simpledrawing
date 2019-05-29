import CircularArc from "./CircularArc.js";
import Mouse from "./../Mouse.js";
import Circle from "./Circle.js";
import Vector from "./../Vector.js";
import Point from "./../Point.js";

export default class CircularArcCreator {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
    this.step = 0;
  }

  reset() {
    if (this.step === 1 || this.step === 2) {
      this.store.commit("setRadius", 0);
      const controls = this.store.getters.getCurrentTool.toolControllers;
      const index = controls.indexOf("RadiusControl");
      controls.splice(index, 1);

      this.stencil.el.remove();
      this._unbindEvents();
      this.step = 0;
    }
    if (this.step === 2) {
      this.arc.el.remove();
    }
  }

  create(point) {
    if (this.step === 0) {
      return this._firstStep(point);
    } else if (this.step === 1) {
      return this._secondStep(point);
    } else if (this.step === 2) {
      return this._thirdStep();
    }
  }

  _firstStep(p) {
    const el = this.canvas.circle(p.x, p.y, 0);
    this.stencil = new Circle(el);
    this.stencil.el.addClass("solid-thin");
    this.stencil.el.attr({ opacity: 0.25 });
    this.stencil.addTypes("solid-thin", "stencil");

    this.store.getters.getCurrentTool.toolControllers.push("RadiusControl");
    this._bindEvents();
    this.step = 1;
    return { done: false };
  }

  _secondStep(p) {
    const r = this.stencil.radius;
    const el = this.canvas.path(
      `M${p.x},${p.y} A${r},${r},0,0,0,${p.x},${p.y}`
    );
    this.arc = new CircularArc(el);

    this._unbindEvents();
    this._bindEvents();
    this.step = 2;
    return { done: false };
  }

  _thirdStep() {
    this.store.commit("setRadius", 0);
    const controls = this.store.getters.getCurrentTool.toolControllers;
    const index = controls.indexOf("RadiusControl");
    controls.splice(index, 1);

    this._unbindEvents();
    this.stencil.el.remove();
    this.step = 0;
    return {
      value: this.arc,
      done: true
    };
  }

  _bindEvents() {
    if (this.step === 0) {
      this.canvas.node.onmousemove = this._animateRadius.bind(this);
    } else if (this.step === 1) {
      this.timeout = 0;
      this.canvas.node.onmousemove = e => {
        this.timeout = setTimeout(this._animateArc.bind(this), 16, e);
      };
    }
  }

  _unbindEvents() {
    this.canvas.node.onmousemove = null;
  }

  _animateRadius(e) {
    const point = this.mouse.getBindingCoords(e);
    const radius = Math.ceil(this.stencil.distFromCenterToPoint(point));

    this.stencil.radius = radius;
    this.store.commit("setRadius", radius);
  }

  _animateArc(e) {
    const point = this.mouse.getBindingCoords(e);
    this._setFlags(point);
  }

  _setEndCoords(p, dot) {
    let center;
    if (dot >= 0 && this.arc.laf === 0) {
      center = this.stencil.center;
    } else {
      center = this.arc.center;
    }

    if (p.x === center.x && p.y === center.y) return;

    const d = Math.sqrt(
      Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2)
    );
    const sin = (p.y - center.y) / d;
    const cos = (p.x - center.x) / d;

    this.arc.end = new Point(
      center.x + this.arc.radius * cos,
      center.y + this.arc.radius * sin
    );
  }

  _setFlags(p) {
    const v1 = new Vector(
      this.arc.start.x - this.stencil.center.x,
      this.arc.start.y - this.stencil.center.y,
      0
    );
    const v2 = new Vector(
      p.x - this.stencil.center.x,
      p.y - this.stencil.center.y,
      0
    );
    const product = v1.product(v2);
    const dot = v1.dot(v2);

    this._setEndCoords(p, dot);

    if (product.z === 0) return;

    if (this.prevProduct) {
      if (dot < 0) {
        if (Math.sign(this.prevProduct.z) !== Math.sign(product.z)) {
          this.arc.laf = this.arc.laf === 0 ? 1 : 0;
        }
      }
    }

    if (this.arc.laf === 1) {
      this.arc.sf = product.z > 0 ? 0 : 1;
    } else if (this.arc.laf === 0) {
      this.arc.sf = product.z > 0 ? 1 : 0;
    }

    this.prevProduct = product;
  }
}
