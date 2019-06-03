import Line from "@/classes/Line.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# distToPoint - 10
# coords - 8
--------------------------------------------------------------*/

describe("distToPoint", () => {
  let canvas;
  let el;
  let line;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(9, 9, 11, 11);
    line = new Line(el);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(7, 9)", () => {
    const point = new Point(7, 9);
    expect(line.distToPoint(point)).toBe(2);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(8, 8)", () => {
    const point = new Point(8, 8);
    expect(line.distToPoint(point)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(8, 10)", () => {
    const point = new Point(8, 10);
    expect(line.distToPoint(point)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(9, 9)", () => {
    const point = new Point(9, 9);
    expect(line.distToPoint(point)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(9, 11)", () => {
    const point = new Point(9, 11);
    expect(line.distToPoint(point)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(10, 10)", () => {
    const point = new Point(10, 10);
    expect(line.distToPoint(point)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(10, 12)", () => {
    const point = new Point(10, 12);
    expect(line.distToPoint(point)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(11, 11)", () => {
    const point = new Point(11, 11);
    expect(line.distToPoint(point)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(11, 13)", () => {
    const point = new Point(11, 13);
    expect(line.distToPoint(point)).toBe(2);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(12, 12)", () => {
    const point = new Point(12, 12);
    expect(line.distToPoint(point)).toBeCloseTo(Math.sqrt(2));
  });
});

describe("coords", () => {
  let canvas;
  let el;
  let line;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(100, 100, 200, 200);
    line = new Line(el);
  });

  it("checks get x1", () => {
    const x1 = line.x1;

    expect(x1).toBe(+line.el.attr("x1"));
    expect(x1).toBe(100);
  });

  it("checks set x1", () => {
    line.x1 = 200;
    const x1 = line.x1;

    expect(x1).toBe(+line.el.attr("x1"));
    expect(x1).toBe(200);
  });

  it("checks get y1", () => {
    const y1 = line.y1;

    expect(y1).toBe(+line.el.attr("y1"));
    expect(y1).toBe(100);
  });

  it("checks set y1", () => {
    line.y1 = 200;
    const y1 = line.y1;

    expect(y1).toBe(+line.el.attr("y1"));
    expect(y1).toBe(200);
  });

  it("checks get x2", () => {
    const x2 = line.x2;

    expect(x2).toBe(+line.el.attr("x2"));
    expect(x2).toBe(200);
  });

  it("checks set x2", () => {
    line.x2 = 100;
    const x2 = line.x2;

    expect(x2).toBe(+line.el.attr("x2"));
    expect(x2).toBe(100);
  });

  it("checks get y2", () => {
    const y2 = line.y2;

    expect(y2).toBe(+line.el.attr("y2"));
    expect(y2).toBe(200);
  });

  it("checks set y2", () => {
    line.y2 = 100;
    const y2 = line.y2;

    expect(y2).toBe(+line.el.attr("y2"));
    expect(y2).toBe(100);
  });
});
