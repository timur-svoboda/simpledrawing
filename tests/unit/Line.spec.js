import Line from "./../../src/classes/Line.js";
import Point from "./../../src/classes/Point.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

describe("distToPoint", () => {
  let canvas;
  let types;
  let el;
  let line;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    types = ["line", "solid-bold"];
    el = canvas.line(9, 9, 11, 11);
    line = new Line(el, types);
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
