import CanvasObject from "./../../src/classes/CanvasObject.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

describe("select", () => {
  let el;
  let types;
  let obj;

  beforeEach(() => {
    el = new Snap(800, 600).g();
    types = ["line", "subtype"];
    obj = new CanvasObject(el, types);
  });

  it("checks 'selected' property", () => {
    obj.select();
    expect(obj.selected).toBe(true);
  });

  it("checks 'highlighted' class", () => {
    obj.select();
    expect(obj.el.hasClass("highlighted")).toBe(true);
  });
});

describe("unselect", () => {
  let el;
  let types;
  let obj;

  beforeEach(() => {
    el = new Snap(800, 600).g();
    types = ["line", "subtype"];
    obj = new CanvasObject(el, types);
  });

  it("checks 'selected' property", () => {
    obj.select();
    obj.unselect();
    expect(obj.selected).toBe(false);
  });

  it("checks 'highlighted' class", () => {
    obj.select();
    obj.unselect();
    expect(obj.el.hasClass("highlighted")).toBe(false);
  });
});
