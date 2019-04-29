export default class Scroll {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    this.canvas
      .parent()
      .node.addEventListener("wheel", this._doScroll.bind(this));
  }

  _doScroll(e) {
    const deltaY = e.deltaY / 4;
    const prevScrollDistance = this.store.getters.getScrollDistance;
    const currentScrollDistance = prevScrollDistance + deltaY;

    this.store.commit("setScrollDistance", currentScrollDistance);
    this.canvas.transform(`t0,${-this.store.getters.getScrollDistance}`);
  }
}
