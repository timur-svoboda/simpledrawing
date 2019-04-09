export default class Viewport {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
  }

  init() {
    const paperNode = this.paper.node;
    const width = paperNode.clientWidth;
    const height = paperNode.clientHeight;

    this.paper.attr("viewBox", `0 0 ${width} ${height}`);

    this._bindEvents();
  }

  _bindEvents() {
    this.paper.node.addEventListener("wheel", e => {
      const deltaY = e.deltaY;
      const prevScrollDistance = this.store.getters.getScrollDistance;
      const currentScrollDistance = prevScrollDistance + deltaY;

      this._setViewBoxY(currentScrollDistance);
      this.store.commit("setScrollDistance", currentScrollDistance);
    });
  }

  _setViewBoxY(scrollDistance) {
    const viewBoxObject = this.paper.attr("viewBox");
    viewBoxObject.y = scrollDistance;
    this.paper.attr("viewBox", viewBoxObject);
  }
}
