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

  getClosestObject(x, y, objects) {
    objects = objects ? objects : this.store.getters.getObjects;

    if (objects.length) {
      const dists = this._getDistancesToObjects(x, y, objects);
      const dist = Math.min(...dists);

      const i = dists.indexOf(dist);
      const co = objects[i]; // Closest objects

      return { co, dist };
    } else {
      return { co: null, dist: null };
    }
  }

  _getDistancesToObjects(x, y, objects) {
    return objects.map(obj => {
      let dist;

      switch (obj.types[0]) {
        case "rail":
          dist = obj.getDistToPoint(x, y);
          break;
      }

      return dist;
    });
  }
}
