import Rail from "./../../src/classes/Rail.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

describe("offset", () => {
  let canvas;
  let types;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    types = ["rail"];
  });

  it("gets offset when a rail is vertical", () => {
    const el = canvas.line(100, -5000, 100, 5000);
    types.push("vertical");
    const rail = new Rail(el, types);

    expect(rail.offset).toBe(+el.attr("x1"));
  });

  it("gets offset when a rail is horizontal", () => {
    const el = canvas.line(-5000, 100, 5000, 100);
    types.push("horizontal");
    const rail = new Rail(el, types);

    expect(rail.offset).toBe(+el.attr("y1"));
  });

  it("sets offset when a rail is vertical", () => {
    const el = canvas.line(100, -5000, 100, 5000);
    types.push("vertical");
    const rail = new Rail(el, types);
    rail.offset = 200;

    expect(rail.offset).toBe(+el.attr("x1"));
  });

  it("sets offset when a rail is horizontal", () => {
    const el = canvas.line(-5000, 100, 5000, 100);
    types.push("horizontal");
    const rail = new Rail(el, types);
    rail.offset = 200;

    expect(rail.offset).toBe(+el.attr("y1"));
  });
});

describe("distToPoint", () => {
  let canvas;
  let types;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    types = ["rail"];
  });

  it("gets the distance from the vertical rail with offset 100 and the point with coords 150, 100", () => {
    const el = canvas.line(100, -5000, 100, 5000);
    types.push("vertical");
    const rail = new Rail(el, types);
    const dist = rail.distToPoint(150, 100);

    expect(dist).toBe(50);
  });

  it("gets the distance from the vertical rail with offset 100 and the point with coords 75, 100", () => {
    const el = canvas.line(100, -5000, 100, 5000);
    types.push("vertical");
    const rail = new Rail(el, types);
    const dist = rail.distToPoint(75, 100);

    expect(dist).toBe(25);
  });

  it("gets the distance from the horizontal rail with offset 100 and the point with coords 100, 200", () => {
    const el = canvas.line(-5000, 100, 5000, 100);
    types.push("horizontal");
    const rail = new Rail(el, types);
    const dist = rail.distToPoint(100, 200);

    expect(dist).toBe(100);
  });

  it("gets the distance from the horizontal rail with offset 100 and the point with coords 100, 25", () => {
    const el = canvas.line(-5000, 100, 5000, 100);
    types.push("horizontal");
    const rail = new Rail(el, types);
    const dist = rail.distToPoint(100, 25);

    expect(dist).toBe(75);
  });
});
