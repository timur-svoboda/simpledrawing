import HorizontalRailCreator from "@/classes/rail/HorizontalRailCreator.js";
import HorizontalRail from "@/classes/rail/HorizontalRail.js";
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
  let horizontalRailCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    point = new Point(100, 200);
    horizontalRailCreator = new HorizontalRailCreator(canvas);
  });

  it("checks the arguments of horizontalRailCreator.canvas.line", () => {
    const el = horizontalRailCreator.canvas.line(1, 1, 2, 2);
    horizontalRailCreator.canvas.line = jest.fn();
    horizontalRailCreator.canvas.line.mockReturnValueOnce(el);
    horizontalRailCreator.create(point);

    expect(horizontalRailCreator.canvas.line.mock.calls[0][0]).toBe(-100000);
    expect(horizontalRailCreator.canvas.line.mock.calls[0][1]).toBe(point.y);
    expect(horizontalRailCreator.canvas.line.mock.calls[0][2]).toBe(100000);
    expect(horizontalRailCreator.canvas.line.mock.calls[0][3]).toBe(point.y);
  });

  it("checks a return object", () => {
    const result = horizontalRailCreator.create(point);

    expect(result.done).toBeTruthy();
    expect(result.value[0] instanceof HorizontalRail).toBeTruthy();
  });
});
