export default class CanvasObject {
  constructor(el) {
    this.el = el;
    this.types = [];
    this.selected = false;
  }

  select() {
    this.selected = true;
    this.el.addClass("highlighted");
  }

  unselect() {
    this.selected = false;
    this.el.removeClass("highlighted");
  }

  addTypes(...types) {
    this.types.push(types);
  }
}
