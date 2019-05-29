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
