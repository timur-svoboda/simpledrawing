export default class Mouse {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
  }

  getCoords(e) {
    const bcr = this.paper.node.getBoundingClientRect();
    const scrollDistance = this.store.getters.getScrollDistance;

    return {
      x: e.clientX - bcr.left,
      y: e.clientY - bcr.top + scrollDistance
    };
  }
}
