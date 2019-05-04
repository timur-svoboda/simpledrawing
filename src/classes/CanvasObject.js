export default class CanvasObject {
  constructor(el, types) {
    this.el = el;
    this.types = types;
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
}
