export default class Canvas {
  constructor(paper, store) {
    this.paper = paper;
    this.store = store;
  }

  init() {
    const s = this.store.getters.getScale;
    const canvasWidth = 210 * s;
    const canvasHeight = 297 * s;
    const canvasX = this.paper.node.clientWidth / 2 - canvasWidth / 2;
    const canvasY = this.paper.node.clientHeight / 2 - canvasHeight / 2;

    const canvas = this._drawCanvas(
      canvasX,
      canvasY,
      canvasWidth,
      canvasHeight
    );
    const border = this._drawBorder(
      canvasX + 20 * s,
      canvasY + 5 * s,
      canvasWidth - 25 * s,
      canvasHeight - 10 * s
    );
    const mainInscription = this._drawMainInscription(
      canvasX + canvasWidth - 150 * s,
      canvasY + canvasHeight - 27 * s
    );

    const canvasGroup = this.paper.g(canvas, border, mainInscription);

    this._bindEvents();

    return canvasGroup;
  }

  _drawCanvas(x, y, width, height) {
    const canvas = this.paper.rect(x, y, width, height);

    canvas.addClass("canvas");

    return canvas;
  }

  _drawBorder(x, y, width, height) {
    const border = this.paper.rect(x, y, width, height);

    border.addClass("canvas__border");

    return border;
  }

  _drawMainInscription(x, y) {
    const inscr = this.paper.g();
    const s = this.store.getters.getScale;

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
      this._drawField(x + 70 * s, y + 14 * s, 35 * s, 8 * s, "", "materail")
    );
    inscr.add(
      this._drawField(x + 105 * s, y + 14 * s, 20 * s, 8 * s, "", "scale")
    );
    inscr.add(
      this._drawField(x + 125 * s, y + 14 * s, 20 * s, 8 * s, "", "scale")
    );

    inscr.addClass("canvas__main-inscription");

    inscr.node.addEventListener("click", e => e.stopPropagation());

    return inscr;
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
    window.addEventListener("keydown", e => {
      const key = e.key;
      const textTag = document.querySelector(
        ".inscription__field_highlighted text"
      );
      if (textTag) {
        if (key === "Backspace" || key === "Delete") {
          let text = textTag.textContent;
          textTag.textContent = text.slice(0, -1);
        } else if (key.length === 1 && /./i.test(key)) {
          textTag.textContent += key;
        }
      }
    });
  }
}
