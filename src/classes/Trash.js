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
          const controlPoints = this.store.getters.getControlPoints;

          for (let k = 0; k < controlPoints.length; k++) {
            const cp = controlPoints[k];
            if (cp.rails.indexOf(obj) !== -1) {
              controlPoints.splice(k, 1);
              k--;
            }
          }
        }

        obj.el.remove();

        objects.splice(i, 1);
        i--;
      }
    }
  }
}
