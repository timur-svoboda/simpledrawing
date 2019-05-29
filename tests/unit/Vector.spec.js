import Vector from "@/classes/Vector.js";

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# dot - 1
# length - 1
# product - 1
--------------------------------------------------------------*/

describe("dot", () => {
  it("calcs dot product of a and b vectors", () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(4, 5, 6);
    expect(a.dot(b)).toBe(32);
  });
});

describe("length", () => {
  it("calcs length of a vector", () => {
    const a = new Vector(1, 2, 2);
    expect(a.length()).toBe(3);
  });
});

describe("product", () => {
  it("calcs cross product of a vector", () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(4, 5, 6);

    const newVector = a.product(b);

    expect(newVector.x).toBe(-3);
    expect(newVector.y).toBe(6);
    expect(newVector.z).toBe(-3);
  });
});
