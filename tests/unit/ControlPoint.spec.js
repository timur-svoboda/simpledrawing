import ControlPoint from "./../../src/classes/ControlPoint.js";
import Point from "./../../src/classes/Point.js";

describe("_calcCoords", () => {
  it("doesn't define coords when main types don't match", () => {
    const rail1 = { types: ["rail", "vertical"], offset: 100 };
    const rail2 = { types: ["line", "horizontal"], offset: -100 };
    const cp = new ControlPoint(rail1, rail2);

    expect(cp.x).not.toBeDefined();
    expect(cp.y).not.toBeDefined();
  });

  it("doesn't define coords when main types match and subtypes are 'vertical'", () => {
    const rail1 = { types: ["rail", "vertical"], offset: 100 };
    const rail2 = { types: ["rail", "vertical"], offset: -100 };
    const cp = new ControlPoint(rail1, rail2);

    expect(cp.x).not.toBeDefined();
    expect(cp.y).not.toBeDefined();
  });

  it("doesn't define coords when main types match and subtypes are 'horizontal'", () => {
    const rail1 = { types: ["rail", "horizontal"], offset: 100 };
    const rail2 = { types: ["rail", "horizontal"], offset: -100 };
    const cp = new ControlPoint(rail1, rail2);

    expect(cp.x).not.toBeDefined();
    expect(cp.y).not.toBeDefined();
  });

  it("define coords when main types match and the first rail's subtype is 'vertical' and the second rail's subtype is 'horizontal'", () => {
    const rail1 = { types: ["rail", "vertical"], offset: 100 };
    const rail2 = { types: ["rail", "horizontal"], offset: -100 };
    const cp = new ControlPoint(rail1, rail2);

    expect(cp.x).toBe(100);
    expect(cp.y).toBe(-100);
  });

  it("define coords when main types match and the first rail's subtype is 'horizontal' and the second rail's subtype is 'vertical'", () => {
    const rail1 = { types: ["rail", "horizontal"], offset: 100 };
    const rail2 = { types: ["rail", "vertical"], offset: -100 };
    const cp = new ControlPoint(rail1, rail2);

    expect(cp.x).toBe(-100);
    expect(cp.y).toBe(100);
  });
});

describe("distToPoint", () => {
  it("calculate the distance to the point", () => {
    const rail1 = { types: ["rail", "horizontal"], offset: 100 };
    const rail2 = { types: ["rail", "vertical"], offset: 100 };
    const cp = new ControlPoint(rail1, rail2);
    const point = new Point(500, 400);

    expect(cp.distToPoint(point)).toBe(500);
  });
});
