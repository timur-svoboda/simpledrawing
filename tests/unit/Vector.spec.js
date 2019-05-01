import Vector from "./../../src/classes/Vector.js";

describe("dot", () => {
  it("calcs dot product of a and b vectors", () => {
    const a = new Vector(12, -32);
    const b = new Vector(-22, 1);
    expect(a.dot(b)).toBe(-296);
  });
});

describe("length", () => {
  it("calcs length of a vector", () => {
    const a = new Vector(-12, 9);
    expect(a.length()).toBe(15);
  });
});