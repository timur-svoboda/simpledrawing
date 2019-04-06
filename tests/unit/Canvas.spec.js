import Canvas from "./../../src/classes/Canvas.js";

describe("Canvas.js init", () => {
  it("rotates canvasGroup", () => {
    const canvasInstance = new Canvas();
    const canvasGroup = canvasInstance.init();
    expect(canvasGroup._.transform).toBe("r-90");
  });
});

describe("Canvas.js _drawCanvas: canvas width and height for the certain canvas format.", () => {
  beforeEach(() => {
    const canvasInstance = new Canvas();
  });

  it("Width; A4", () => {
    const canvas = canvasInstance._drawCanvas("A4");
    expect(canvas.getBbox().width).toBe(297);
  });

  it("Height; A4", () => {
    const canvas = canvasInstance._drawCanvas("A4");
    expect(canvas.getBbox().height).toBe(210);
  });
});

describe("Canvas.js _drawBorder: border width and height for the certain canvas format.", () => {
  beforeEach(() => {
    const canvasInstance = new Canvas();
  });

  it("Width; A4", () => {
    const border = canvasInstance._drawBorder("A4");
    expect(border.getBbox().width).toBe(287);
  });

  it("Height; A4", () => {
    const border = canvasInstance._drawBorder("A4");
    expect(border.getBbox().height).toBe(185);
  });
});

describe("Canvas.js _drawMainInscription", () => {
  beforeEach(() => {
    const canvasInstance = new Canvas();
  });

  it("Checks fields.length", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields.length).toBe(11);
  });

  it("Checks fields[9].children().length", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields[9].children().length).toBe(2);
  });

  it("Checks fields[8].children()[0].type", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields[8].children()[0].type).toBe("rect");
  });

  it("Checks fields[7].children()[2].type", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields[7].children()[2].type).toBe("text");
  });

  it("Checks the text of the author field", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields[0].children()[2].node.innerText).toBe("Author");
  });

  it("Checks the text of the examiner field", () => {
    const fields = canvasInstance
      ._drawMainInscription("educational")
      .children();
    expect(fields[3].children()[2].node.innerText).toBe("Examiner");
  });

  it("Renders text of the 5th field, when it's focused", () => {
    const inscr = canvasInstance._drawMainInscription("educational");
    const field5 = inscr.children()[5];

    field5.dispatchEvent(new MouseEvent("click"));
    field5.dispatchEvent(new FocusEvent("focus"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));

    expect(field5.innerText).toBe("t");
  });

  it("Doesn't render text of the 5th field, when it's blured", () => {
    const inscr = canvasInstance._drawMainInscription("educational");
    const field5 = inscr.children()[5];

    field5.dispatchEvent(new MouseEvent("click"));
    field5.dispatchEvent(new FocusEvent("focus"));
    field5.dispatchEvent(new FocusEvent("blur"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));

    expect(field5.innerText).toBe("");
  });
});
