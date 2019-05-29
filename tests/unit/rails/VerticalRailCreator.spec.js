import VerticalRailCreator from "@/classes/rail/VerticalRailCreator.js";
import VerticalRail from "@/classes/rail/VerticalRail.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# create - 2
--------------------------------------------------------------*/

describe("create", () => {
  let canvas;
  let point;
  let verticalRailCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    point = new Point(100, 200);
    verticalRailCreator = new VerticalRailCreator(canvas);
  });

  it("checks the arguments of verticalRailCreator.canvas.line", () => {
    const el = verticalRailCreator.canvas.line(1, 1, 2, 2);
    verticalRailCreator.canvas.line = jest.fn();
    verticalRailCreator.canvas.line.mockReturnValueOnce(el);
    verticalRailCreator.create(point);

    expect(verticalRailCreator.canvas.line.mock.calls[0][0]).toBe(point.x);
    expect(verticalRailCreator.canvas.line.mock.calls[0][1]).toBe(-100000);
    expect(verticalRailCreator.canvas.line.mock.calls[0][2]).toBe(point.x);
    expect(verticalRailCreator.canvas.line.mock.calls[0][3]).toBe(100000);
  });

  it("checks a return object", () => {
    const result = verticalRailCreator.create(point);

    expect(result.done).toBeTruthy();
    expect(result.value[0] instanceof VerticalRail).toBeTruthy();
  });
});
