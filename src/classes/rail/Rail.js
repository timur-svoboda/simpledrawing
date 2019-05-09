export default class Rail {
  constructor(el) {
    this.el = el;
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
