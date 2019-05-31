/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# parseD 
  - checks x1
  - checks y1
  - checks x-radius
  - checks y-radius
  - checks x-axis-rotation
  - checks large-arc-flag
  - checks sweep-flag
  - checks x2
  - checks y2
# stringifyD
  - checks stringified d
# distToPoint
  - checks the distance from the small arc to the point(120, 80)
  - checks the distance from the small arc to the point(150, 50)
  - checks the distance from the small arc to the point(80, 60)
  - checks the distance from the small arc to the point(80, 30)
  - checks the distance from the small arc to the point(140, 110)
  - checks the distance from the small arc to the point(180, 110)
  - checks the distance from the large arc to the point(110, 70)
  - checks the distance from the large arc to the point(120, 40)
  - checks the distance from the large arc to the point(130, 90)
  - checks the distance from the large arc to the point(180, 90)
  - checks the distance from the large arc to the point(90, 120)
  - checks the distance from the large arc to the point(60, 150)
# _distFromCenterToPoint
  - checks the distance from the center to a point
# get/set d
  - checks get d
  - checks set d
# get/set start
  - checks get start x
  - checks get start y
  - checks set start x
  - checks set start y
# get/set radius
  - checks get radius
  - checks set radius
# get/set large-arc-flag
  - checks get large-arc-flag
  - checks set large-arc-flag
# get/set sweep-flag
  - checks get sweep-flag
  - checks set sweep-flag
# get/set end
  - checks get end x
  - checks get end y
  - checks set end x
  - checks set end y
# get/set center
  - checks get center x
  - checks get center y
  - checks set center x
  - checks set center y
--------------------------------------------------------------*/

import CircularArc from "@/classes/circular-arc/CircularArc.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

describe("parseD", () => {
  let canvas;
  let el;
  let circularArc;
  let parsedD;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
    parsedD = circularArc.parseD("M100,200 A300,300,0,0,1,400,500");
  });

  it("checks x1", () => {
    expect(parsedD.x1).toBe(100);
  });

  it("checks y1", () => {
    expect(parsedD.y1).toBe(200);
  });

  it("checks x-radius", () => {
    expect(parsedD.rx).toBe(300);
  });

  it("checks y-radius", () => {
    expect(parsedD.ry).toBe(300);
  });

  it("checks x-axis-rotation", () => {
    expect(parsedD.xar).toBe(0);
  });

  it("checks large-arc-flag", () => {
    expect(parsedD.laf).toBe(0);
  });

  it("checks sweep-flag", () => {
    expect(parsedD.sf).toBe(1);
  });

  it("checks x2", () => {
    expect(parsedD.x2).toBe(400);
  });

  it("checks y2", () => {
    expect(parsedD.y2).toBe(500);
  });
});

describe("stringifyD", () => {
  const canvas = new Snap(800, 600);
  const el = canvas.path("M100,200 A300,300,0,0,1,400,500");
  const circularArc = new CircularArc(el);
  const stringifiedD = circularArc.stringifyD({
    x1: 100,
    y1: 200,
    rx: 300,
    ry: 300,
    xar: 0,
    laf: 0,
    sf: 1,
    x2: 400,
    y2: 500
  });

  it("checks stringified d", () => {
    expect(stringifiedD).toBe("M100,200 A300,300,0,0,1,400,500");
  });
});

describe("distToPoint", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,50 A50,50,0,0,1,150,100");
    circularArc = new CircularArc(el);
  });

  it("checks the distance from the small arc to the point(120, 80)", () => {
    const point = new Point(120, 80);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(50 - 20 * Math.sqrt(2));
  });

  it("checks the distance from the small arc to the point(150, 50)", () => {
    const point = new Point(150, 50);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(50 * Math.sqrt(2) - 50);
  });

  it("checks the distance from the small arc to the point(80, 60)", () => {
    const point = new Point(80, 60);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(5));
  });

  it("checks the distance from the small arc to the point(80, 30)", () => {
    const point = new Point(80, 30);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(20 * Math.sqrt(2));
  });

  it("checks the distance from the small arc to the point(140, 110)", () => {
    const point = new Point(140, 110);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(2));
  });

  it("checks the distance from the small arc to the point(180, 110)", () => {
    const point = new Point(180, 110);
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(10));
  });

  it("checks the distance from the large arc to the point(110, 70)", () => {
    const point = new Point(110, 70);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(5));
  });

  it("checks the distance from the large arc to the point(120, 40)", () => {
    const point = new Point(120, 40);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(5));
  });

  it("checks the distance from the large arc to the point(130, 90)", () => {
    const point = new Point(130, 90);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(5));
  });

  it("checks the distance from the large arc to the point(180, 90)", () => {
    const point = new Point(180, 90);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(10));
  });

  it("checks the distance from the large arc to the point(90, 120)", () => {
    const point = new Point(90, 120);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(50 - 10 * Math.sqrt(5));
  });

  it("checks the distance from the large arc to the point(60, 150)", () => {
    const point = new Point(60, 150);
    circularArc.laf = 1;
    circularArc.sf = 0;
    const dist = circularArc.distToPoint(point);
    expect(dist).toBeCloseTo(10 * Math.sqrt(41) - 50);
  });
});

describe("_distFromCenterToPoint", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,100 A50,50,0,0,1,150,150");
    circularArc = new CircularArc(el);
  });

  it("checks the distance from the center to a point", () => {
    const point = new Point(150, 100);
    const dist = circularArc._distFromCenterToPoint(point);
    expect(dist).toBeCloseTo(50 * Math.sqrt(2));
  });
});

describe("get/set d", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get d", () => {
    expect(circularArc.d).toBe(circularArc.el.attr("d"));
  });

  it("checks set d", () => {
    circularArc.d = "500,400 A300,300,0,0,1,200,100";
    expect(circularArc.d).toBe("500,400 A300,300,0,0,1,200,100");
  });
});

describe("get/set start", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get start x", () => {
    expect(circularArc.start.x).toBe(100);
  });

  it("checks get start y", () => {
    expect(circularArc.start.y).toBe(200);
  });

  it("checks set start x", () => {
    circularArc.start = new Point(500, 400);
    expect(circularArc.start.x).toBe(500);
  });

  it("checks set start y", () => {
    circularArc.start = new Point(500, 400);
    expect(circularArc.start.y).toBe(400);
  });
});

describe("get/set radius", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get radius", () => {
    expect(circularArc.radius).toBe(300);
  });

  it("checks set radius", () => {
    circularArc.radius = 400;

    expect(circularArc.radius).toBe(400);
  });
});

describe("get/set large-arc-flag", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get large-arc-flag", () => {
    expect(circularArc.laf).toBe(0);
  });

  it("checks set large-arc-flag", () => {
    circularArc.laf = 1;

    expect(circularArc.laf).toBe(1);
  });
});

describe("get/set sweep-flag", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get sweep-flag", () => {
    expect(circularArc.sf).toBe(1);
  });

  it("checks set sweep-flag", () => {
    circularArc.sf = 0;

    expect(circularArc.sf).toBe(0);
  });
});

describe("get/set end", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,200 A300,300,0,0,1,400,500");
    circularArc = new CircularArc(el);
  });

  it("checks get end x", () => {
    expect(circularArc.end.x).toBe(400);
  });

  it("checks get end y", () => {
    expect(circularArc.end.y).toBe(500);
  });

  it("checks set end x", () => {
    circularArc.end = new Point(100, 200);
    expect(circularArc.end.x).toBe(100);
  });

  it("checks set end y", () => {
    circularArc.end = new Point(100, 200);
    expect(circularArc.end.y).toBe(200);
  });
});

describe("get/set center", () => {
  let canvas;
  let el;
  let circularArc;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    el = canvas.path("M100,50 A50,50,0,1,1,50,100");
    circularArc = new CircularArc(el);
  });

  it("checks get center x", () => {
    expect(circularArc.center.x).toBe(100);
  });

  it("checks get center y", () => {
    expect(circularArc.center.y).toBe(100);
  });

  it("checks set center x", () => {
    circularArc.center = new Point(200, 200);
    expect(circularArc.center.x).toBe(200);
  });

  it("checks set center y", () => {
    circularArc.center = new Point(200, 200);
    expect(circularArc.center.y).toBe(200);
  });
});
