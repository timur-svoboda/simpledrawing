import Line from "./../../src/classes/Line.js";
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
    expect(line.distToPoint(7, 9)).toBe(2);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(8, 8)", () => {
    expect(line.distToPoint(8, 8)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(8, 10)", () => {
    expect(line.distToPoint(8, 10)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(9, 9)", () => {
    expect(line.distToPoint(9, 9)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(9, 11)", () => {
    expect(line.distToPoint(9, 11)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(10, 10)", () => {
    expect(line.distToPoint(10, 10)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(10, 12)", () => {
    expect(line.distToPoint(10, 12)).toBeCloseTo(Math.sqrt(2));
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(11, 11)", () => {
    expect(line.distToPoint(11, 11)).toBe(0);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(11, 13)", () => {
    expect(line.distToPoint(11, 13)).toBe(2);
  });

  it("gets the distance from the line(9, 9, 11, 11) to the point(12, 12)", () => {
    expect(line.distToPoint(12, 12)).toBeCloseTo(Math.sqrt(2));
  });
});
