import VerticalRail from "@/classes/rail/VerticalRail.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# offset - 2
# distToPoint - 2
# clone - 2
--------------------------------------------------------------*/

describe("offset", () => {
  let canvas;
  let el;
  let verticalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(100, -10000, 100, 10000);
    verticalRail = new VerticalRail(el);
  });

  it("checks getting offset", () => {
    const offset = verticalRail.offset;

    expect(offset).toBe(+verticalRail.el.attr("x1"));
    expect(offset).toBe(+verticalRail.el.attr("x2"));
    expect(offset).toBe(100);
  });

  it("checks setting offset", () => {
    verticalRail.offset = 200;
    const offset = verticalRail.offset;

    expect(offset).toBe(+verticalRail.el.attr("x1"));
    expect(offset).toBe(+verticalRail.el.attr("x2"));
    expect(offset).toBe(200);
  });
});

describe("distToPoint", () => {
  let canvas;
  let el;
  let verticalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(100, -10000, 100, 10000);
    verticalRail = new VerticalRail(el);
  });

  it("checks the distance to the point with coords 300,250", () => {
    const point = new Point(300, 250);
    const dist = verticalRail.distToPoint(point);

    expect(dist).toBe(200);
  });

  it("checks the distance to the point with coords 20,40", () => {
    const point = new Point(20, 40);
    const dist = verticalRail.distToPoint(point);

    expect(dist).toBe(80);
  });
});

describe("clone", () => {
  let canvas;
  let el;
  let verticalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(100, -10000, 100, 10000);
    verticalRail = new VerticalRail(el);
  });

  it("checks if clone is an instance of VerticalRail", () => {
    const clone = verticalRail.clone();

    expect(clone instanceof VerticalRail).toBeTruthy();
  });

  it("checks clone's offset", () => {
    const clone = verticalRail.clone();

    expect(clone.offset).toBe(verticalRail.offset);
  });
});
