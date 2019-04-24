export default class Viewport {
  constructor(canvasObj, store) {
    this.canvasObj = canvasObj;
    this.store = store;
  }

  init() {
    this.canvasObj.canvas.attr(
      "viewBox",
      `0 0 ${this.canvasObj.width} ${this.canvasObj.height}`
    );

    this._bindEvents();
  }

  _bindEvents() {
    this.canvasObj.canvas.parent().node.addEventListener("wheel", e => {
      const deltaY = e.deltaY / 4;
      const prevScrollDistance = this.store.getters.getScrollDistance;
      const currentScrollDistance = prevScrollDistance + deltaY;

      this._setViewBoxY(currentScrollDistance);
      this.store.commit("setScrollDistance", currentScrollDistance);
    });
  }

  _setViewBoxY(scrollDistance) {
    const viewBoxObject = this.canvasObj.canvas.attr("viewBox");
    viewBoxObject.y = scrollDistance;
    this.canvasObj.canvas.attr("viewBox", viewBoxObject);
  }
}
