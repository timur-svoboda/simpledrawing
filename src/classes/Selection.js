import Mouse from "./Mouse.js";

export default class Selection {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.mouse = new Mouse(store);
  }

  select(e) {
    const objects = this.store.getters.getObjects;
    const { x, y } = this.mouse.getCoords(e);
    const { co, dist } = this.mouse.getClosestObject(x, y, objects);

    if (co !== null && dist !== null) {
      if (dist <= this.store.getters.getBindingDistance) {
        if (e.ctrlKey) {
          if (!co.selected) {
            co.selected = true;
            co.el.addClass("highlighted");
          } else {
            co.selected = false;
            co.el.removeClass("highlighted");
          }
        } else {
          this.unselectAll();
          co.selected = true;
          co.el.addClass("highlighted");
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
      obj.selected = true;
      obj.el.addClass("highlighted");
    });
  }

  unselectAll() {
    const selectedObjects = this.store.getters.getSelectedObjects;

    selectedObjects.forEach(obj => {
      obj.selected = false;
      obj.el.removeClass("highlighted");
    });
  }

  reset() {
    this.unselectAll();
  }
}
