export default class MainInscription {
  constructor(x, y, paper, store) {
    this.x = x;
    this.y = y;
    this.paper = paper;
    this.store = store;
  }

  init() {
    this._draw();
    this._bindEvents();
    return this.inscr;
  }

  _draw() {
    const inscr = this.paper.g();
    const s = this.store.getters.getScale;
    const x = this.x;
    const y = this.y;

    inscr.add(this._drawField(x, y, 25 * s, 7 * s, "Author", "author"));
    inscr.add(this._drawField(x + 25 * s, y, 30 * s, 7 * s, "", "author-name"));
    inscr.add(
      this._drawField(x + 55 * s, y, 15 * s, 7 * s, "", "creation-date")
    );

    inscr.add(
      this._drawField(x, y + 7 * s, 25 * s, 7 * s, "Examiner", "examiner")
    );
    inscr.add(
      this._drawField(x + 25 * s, y + 7 * s, 30 * s, 7 * s, "", "author-name")
    );
    inscr.add(
      this._drawField(x + 55 * s, y + 7 * s, 15 * s, 7 * s, "", "examine-data")
    );

    inscr.add(
      this._drawField(
        x,
        y + 14 * s,
        70 * s,
        8 * s,
        "",
        "educational-institution"
      )
    );

    inscr.add(this._drawField(x + 70 * s, y, 75 * s, 14 * s, "", "work-name"));

    inscr.add(
      this._drawField(x + 70 * s, y + 14 * s, 35 * s, 8 * s, "", "material")
    );
    inscr.add(
      this._drawField(x + 105 * s, y + 14 * s, 20 * s, 8 * s, "", "scale")
    );
    inscr.add(
      this._drawField(x + 125 * s, y + 14 * s, 20 * s, 8 * s, "", "number")
    );

    inscr.addClass("canvas__main-inscription");

    this.inscr = inscr;
  }

  _drawField(x, y, width, height, text, id) {
    const field = this.paper.g();

    field.add(this.paper.rect(x, y, width, height));
    field.add(this.paper.text(x + width / 2, y + height / 2 + 4, text));

    field.id = field.node.id = id;
    field.addClass("main-inscription__field");

    field.node.addEventListener("focus", () => {
      field.node.classList.add("inscription__field_highlighted");
    });

    field.node.addEventListener("blur", () => {
      field.node.classList.remove("inscription__field_highlighted");
    });

    return field;
  }

  _bindEvents() {
    this.inscr.node.addEventListener(
      "keydown",
      this._keydownHandler.bind(this)
    );
    this.inscr.node.addEventListener(
      "mousedown",
      this._mousedownHandler.bind(this)
    );
  }

  _mousedownHandler(e) {
    e.stopPropagation();
  }

  _keydownHandler(e) {
    const key = e.key;
    const textTag = document.querySelector(
      ".inscription__field_highlighted text"
    );
    if (textTag) {
      if (key === "Backspace") {
        let text = textTag.textContent;
        textTag.textContent = text.slice(0, -1);
      } else if (key.length === 1 && /./i.test(key)) {
        textTag.textContent += key;
      }
    }
  }
}
