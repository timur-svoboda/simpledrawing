export default class Viewport {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
    this.canvas = this.paper.select(".canvas");
  }

  init() {
    const paperNode = this.paper.node;
    const width = paperNode.clientWidth;
    const height = paperNode.clientHeight;

    this.canvas.attr("viewBox", `0 0 ${width} ${height}`);

    this._bindEvents();
  }

  _bindEvents() {
    this.canvas.node.addEventListener("wheel", e => {
      const deltaY = e.deltaY / 4;
      const prevScrollDistance = this.store.getters.getScrollDistance;
      const currentScrollDistance = prevScrollDistance + deltaY;

      this._setViewBoxY(currentScrollDistance);
      this.store.commit("setScrollDistance", currentScrollDistance);
    });
  }

  _setViewBoxY(scrollDistance) {
    const viewBoxObject = this.canvas.attr("viewBox");
    viewBoxObject.y = scrollDistance;
    this.canvas.attr("viewBox", viewBoxObject);
  }
}
