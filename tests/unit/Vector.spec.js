/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#dot
  - calcs a dot product of vectors
#length
  - calcs a length of a vector
#product
  - calcs a cross product of vectors
#angle
  - calcs an angle between vectors
--------------------------------------------------------------*/
import Vector from "@/classes/Vector.js";

describe("#dot", () => {
  it("calcs a dot product of vectors", () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(4, 5, 6);
    expect(a.dot(b)).toBe(32);
  });
});

describe("#length", () => {
  it("calcs a length of a vector", () => {
    const a = new Vector(1, 2, 2);
    expect(a.length()).toBe(3);
  });
});

describe("#product", () => {
  it("calcs a cross product of vectors", () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(4, 5, 6);

    const newVector = a.product(b);

    expect(newVector.x).toBe(-3);
    expect(newVector.y).toBe(6);
    expect(newVector.z).toBe(-3);
  });
});

describe("#angle", () => {
  it("calcs an angle between vectors", () => {
    const a = new Vector(2, 4, 0);
    const b = new Vector(4, 2, 0);

    const angle = a.angle(b);

    expect(angle).toBeCloseTo(0.6435);
  });
});
