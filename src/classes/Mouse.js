import Point from "./Point.js";

export default class Mouse {
  constructor(store) {
    this.store = store;
  }

  getCoords(e) {
    const scrollDistance = this.store.getters.getScrollDistance;

    return new Point(e.offsetX, e.offsetY + scrollDistance);
  }

  getBindingCoords(e) {
    const point = this.getCoords(e);
    const cps = this.store.getters.getControlPoints;
    const { co, dist } = this.getClosestObject(point, cps);
    const bindingDist = this.store.getters.getBindingDistance;

    if (co !== null && dist !== null) {
      if (dist <= bindingDist) {
        point.x = co.x;
        point.y = co.y;
      }
    }

    return point;
  }

  getClosestObject(point, objects) {
    objects = objects ? objects : this.store.getters.getObjects;

    if (objects.length) {
      const dists = this._getDistancesToObjects(point, objects);
      const dist = Math.min(...dists);

      const i = dists.lastIndexOf(dist);
      const co = objects[i]; // Closest objects

      return { co, dist };
    } else {
      return { co: null, dist: null };
    }
  }

  _getDistancesToObjects(point, objects) {
    return objects.map(obj => {
      return obj.distToPoint(point);
    });
  }
}
