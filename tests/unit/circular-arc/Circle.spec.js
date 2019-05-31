/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# get/set radius
  - checks get radius
  - checks set radius
# get/set center
  - get center x
  - get center y
  - set center x
  - set center y
# distFromCenterToPoint
  - checks the distance from the center to a point
# distToPoint
  - checks the distance from the arc to the point inside the circle
  - checks the distance from the arc to the point outside the circle
--------------------------------------------------------------*/

import Circle from "@/classes/circular-arc/Circle.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

describe("get/set radius", () => {
  let canvas;
  let el;
  let circle;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.circle(100, 200, 50);
    circle = new Circle(el);
  });

  it("checks get radius", () => {
    expect(circle.radius).toBe(50);
  });

  it("checks set radius", () => {
    circle.radius = 100;
    expect(circle.radius).toBe(100);
  });
});

describe("get/set center", () => {
  let canvas;
  let el;
  let circle;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.circle(100, 200, 50);
    circle = new Circle(el);
  });

  it("checks get center x", () => {
    expect(circle.center.x).toBe(100);
  });

  it("checks get center y", () => {
    expect(circle.center.y).toBe(200);
  });

  it("checks set center x", () => {
    circle.center = new Point(200, 100);
    expect(circle.center.x).toBe(200);
  });

  it("checks set center y", () => {
    circle.center = new Point(200, 100);
    expect(circle.center.y).toBe(100);
  });
});

describe("distFromCenterToPoint", () => {
  let canvas;
  let el;
  let circle;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.circle(100, 200, 50);
    circle = new Circle(el);
  });

  it("checks the distance from the center to a point", () => {
    const point = new Point(400, 600);
    const dist = circle.distFromCenterToPoint(point);
    expect(dist).toBe(500);
  });
});

describe("distToPoint", () => {
  let canvas;
  let el;
  let circle;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.circle(100, 200, 50);
    circle = new Circle(el);
  });

  it("checks the distance from the arc to the point inside the circle", () => {
    const point = new Point(100, 240);
    const dist = circle.distToPoint(point);
    expect(dist).toBe(10);
  });

  it("checks the distance from the arc to the point outside the circle", () => {
    const point = new Point(100, 270);
    const dist = circle.distToPoint(point);
    expect(dist).toBe(20);
  });
});
