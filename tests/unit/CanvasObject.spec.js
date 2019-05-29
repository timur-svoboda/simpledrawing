import CanvasObject from "@/classes/CanvasObject.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# select - 2
# unselect - 2
# addTypes - 1
--------------------------------------------------------------*/

describe("select", () => {
  let el;
  let obj;

  beforeEach(() => {
    el = new Snap(800, 600).g();
    obj = new CanvasObject(el);
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
  let obj;

  beforeEach(() => {
    el = new Snap(800, 600).g();
    obj = new CanvasObject(el);
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

describe("addTypes", () => {
  it("checks obj.types", () => {
    const el = new Snap(800, 600).g();
    const obj = new CanvasObject(el);

    obj.addTypes("type1", "type2");

    expect(obj.types).toContain("type1");
    expect(obj.types).toContain("type2");
  });
});
