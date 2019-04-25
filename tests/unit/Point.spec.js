import Point from "./../../src/classes/Point.js";

describe("constructor", () => {
  it("checks the X coord of the point", () => {
    const point = new Point(100, -100);
    expect(point.x).toBe(100);
  });
  it("checks the Y coord of the point", () => {
    const point = new Point(100, -100);
    expect(point.y).toBe(-100);
  });
});
