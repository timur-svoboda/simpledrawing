/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#distToPoint
  - calcs the distance to the point(500,400)
--------------------------------------------------------------*/
import Point from "@/classes/Point.js";

describe("#distToPoint", () => {
  it("calcs the distance to the point(500,400)", () => {
    const point = new Point(100, 100);

    const dist = point.distToPoint(new Point(400, 500));

    expect(dist).toBe(500);
  });
});
