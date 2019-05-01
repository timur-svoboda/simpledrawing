export default class Trash {
  constructor(store) {
    this.store = store;
  }

  removeSelectedObjects() {
    const objects = this.store.getters.getObjects;

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj.selected) {
        if (obj.types[0] === "rail") {
          this._removeControlPoints(obj);
        }

        obj.el.remove();

        objects.splice(i, 1);
        i--;
      }
    }
  }

  _removeControlPoints(rail) {
    const controlPoints = this.store.getters.getControlPoints;

    for (let i = 0; i < controlPoints.length; i++) {
      const cp = controlPoints[i];
      if (cp.rails.indexOf(rail) !== -1) {
        controlPoints.splice(i, 1);
        i--;
      }
    }
  }
}
