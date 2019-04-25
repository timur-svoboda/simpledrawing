export default class Mouse {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
  }

  getCoords(e) {
    const scrollDistance = this.store.getters.getScrollDistance;

    return {
      x: e.offsetX,
      y: e.offsetY + scrollDistance
    };
  }
}
