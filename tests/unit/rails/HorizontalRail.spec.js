import HorizontalRail from "@/classes/rail/HorizontalRail.js";
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
  let horizontalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(-10000, 100, 10000, 100);
    horizontalRail = new HorizontalRail(el);
  });

  it("checks getting offset", () => {
    const offset = horizontalRail.offset;

    expect(offset).toBe(+horizontalRail.el.attr("y1"));
    expect(offset).toBe(+horizontalRail.el.attr("y2"));
    expect(offset).toBe(100);
  });

  it("checks setting offset", () => {
    horizontalRail.offset = 200;
    const offset = horizontalRail.offset;

    expect(offset).toBe(+horizontalRail.el.attr("y1"));
    expect(offset).toBe(+horizontalRail.el.attr("y2"));
    expect(offset).toBe(200);
  });
});

describe("distToPoint", () => {
  let canvas;
  let el;
  let horizontalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(-10000, 100, 10000, 100);
    horizontalRail = new HorizontalRail(el);
  });

  it("checks the distance to the point with coords 300,250", () => {
    const point = new Point(300, 250);
    const dist = horizontalRail.distToPoint(point);

    expect(dist).toBe(150);
  });

  it("checks the distance to the point with coords 120,40", () => {
    const point = new Point(120, 40);
    const dist = horizontalRail.distToPoint(point);

    expect(dist).toBe(60);
  });
});

describe("clone", () => {
  let canvas;
  let el;
  let horizontalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.line(-10000, 100, 10000, 100);
    horizontalRail = new HorizontalRail(el);
  });

  it("checks if clone is an instance of HorizontalRail", () => {
    const clone = horizontalRail.clone();

    expect(clone instanceof HorizontalRail).toBeTruthy();
  });

  it("checks clone's offset", () => {
    const clone = horizontalRail.clone();

    expect(clone.offset).toBe(horizontalRail.offset);
  });
});
