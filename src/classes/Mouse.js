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

  getBindingCoords(e) {
    let { x, y } = this.getCoords(e);
    const cps = this.store.getters.getControlPoints;
    const { co, dist } = this.getClosestObject(x, y, cps);
    const bindingDist = this.store.getters.getBindingDistance;

    if (co !== null && dist !== null) {
      if (dist <= bindingDist) {
        x = co.x;
        y = co.y;
      }
    }
    return { x, y };
  }

  getClosestObject(x, y, objects) {
    objects = objects ? objects : this.store.getters.getObjects;

    if (objects.length) {
      const dists = this._getDistancesToObjects(x, y, objects);
      const dist = Math.min(...dists);

      const i = dists.lastIndexOf(dist);
      const co = objects[i]; // Closest objects

      return { co, dist };
    } else {
      return { co: null, dist: null };
    }
  }

  _getDistancesToObjects(x, y, objects) {
    return objects.map(obj => {
      return obj.distToPoint(x, y);
    });
  }
}
