import Mouse from "./Mouse.js";

export default class Selection {
  constructor(store) {
    this.store = store;
    this.mouse = new Mouse(store);
  }

  select(e) {
    const objects = this.store.getters.getObjects;
    const point = this.mouse.getCoords(e);
    const { co, dist } = this.mouse.getClosestObject(point, objects);

    if (co !== null && dist !== null) {
      if (dist <= this.store.getters.getBindingDistance) {
        if (e.ctrlKey) {
          if (!co.selected) {
            co.select();
          } else {
            co.unselect();
          }
        } else {
          this.unselectAll();
          co.select();
        }
      } else {
        if (!e.ctrlKey) {
          this.unselectAll();
        }
      }
    }
  }

  selectAll() {
    const objects = this.store.getters.getObjects;

    objects.forEach(obj => {
      obj.select();
    });
  }

  unselectAll() {
    const objects = this.store.getters.getObjects;

    objects.forEach(obj => {
      obj.unselect();
    });
  }

  reset() {
    this.unselectAll();
  }
}
