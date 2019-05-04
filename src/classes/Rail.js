export default class Rail {
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

  distToPoint(x, y) {
    let dist;

    if (this.types.indexOf("vertical") !== -1) {
      dist = Math.abs(x - this.offset);
    } else {
      dist = Math.abs(y - this.offset);
    }

    return dist;
  }

  get offset() {
    if (this.types.indexOf("vertical") !== -1)
      return Number(this.el.attr("x1"));
    else return Number(this.el.attr("y1"));
  }

  set offset(value) {
    if (this.types.indexOf("vertical")) {
      this.el.attr("x1", value);
      this.el.attr("x2", value);
    } else {
      this.el.attr("y1", value);
      this.el.attr("y2", value);
    }
  }
}
