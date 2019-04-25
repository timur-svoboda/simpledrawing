import Rail from "./Rail.js";
import MainInscription from "./MainInscription.js";

export default class Canvas {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
    this.canvas = this.paper.g();
    this.canvas.addClass("canvas");

    this.rail = new Rail(this.canvas, this.store);
  }

  init() {
    const s = this.store.getters.getScale;
    const sheetWidth = 210 * s;
    const sheetHeight = 297 * s;
    const sheetX = this.paper.node.clientWidth / 2 - sheetWidth / 2;
    const sheetY = this.paper.node.clientHeight / 2 - sheetHeight / 2;

    const sheet = this._drawSheet(sheetX, sheetY, sheetWidth, sheetHeight);
    const border = this._drawBorder(
      sheetX + 20 * s,
      sheetY + 5 * s,
      sheetWidth - 25 * s,
      sheetHeight - 10 * s
    );
    const mainInscription = this._drawMainInscription(
      sheetX + sheetWidth - 150 * s,
      sheetY + sheetHeight - 27 * s
    );

    this.canvas.add(sheet, border, mainInscription);

    this._bindEvents();
    return this.canvas;
  }

  _drawSheet(x, y, width, height) {
    const sheet = this.paper.rect(x, y, width, height);

    sheet.addClass("canvas__sheet");

    return sheet;
  }

  _drawBorder(x, y, width, height) {
    const border = this.paper.rect(x, y, width, height);

    border.addClass("canvas__border");

    return border;
  }

  _drawMainInscription(x, y) {
    const mainInscription = new MainInscription(x, y, this.paper, this.store);
    return mainInscription.init();
  }

  _bindEvents() {
    this.canvas.node.addEventListener("mousedown", this._action.bind(this));
  }

  _action(e) {
    if (e.button === 0) {
      const currentToolId = this.store.getters.getCurrentTool.id;
      switch (currentToolId) {
        case "select":
          alert("select");
          break;
        case "rails":
          this.rail.drawRail(e);
          break;
        case "line":
          alert("line");
          break;
        case "circular-arc":
          alert("circular-arc");
          break;
        case "ruler":
          alert("ruler");
          break;
      }
    }
  }
}
