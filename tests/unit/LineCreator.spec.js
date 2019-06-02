import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LineCreator from "@/classes/LineCreator.js";
import Line from "@/classes/Line.js";
import Point from "@/classes/Point.js";
import Mouse from "@/classes/Mouse.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#create
  - checks if lineCreator._firstStep was called one time with 'point' as the first argument when lineCreator.create was called one time
  - checks if lineCreator._firstStep was called one time with 'point' as the first argument and lineCreator._secondStep was called one time when lineCreator.create was called one time
#_firstStep
  - checks if lineCreator.line is an instace of Line
  - checks coords of lineCreator.line
  - checks if lineCreator.line.types contains 'solid-bold'
  - checks if lineCreator._bindEvents was called one time
  - checks if lineCreator.step equals 1
#_secondStep
  - checks if lineCreator._unbindEvents was called one time
  - checks if this.line was pushed into objects
  - resets step
#reset
  - checks if lineCreator._unbindEvents was called once
  - checks if lineCreator.line.el.remove was called once
  - resets step
#_animateEndingCoords
  - checks ending coords
--------------------------------------------------------------*/

describe("#create", () => {
  let canvas;
  let store;
  let lineCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    lineCreator = new LineCreator(canvas, store);
  });

  it("checks if lineCreator._firstStep was called one time with 'point' as the first argument when lineCreator.create was called one time", () => {
    const point = new Point(100, 200);
    lineCreator._firstStep = jest.fn();

    lineCreator.create(point);
    lineCreator.step = 1;

    expect(lineCreator._firstStep.mock.calls.length).toBe(1);
    expect(lineCreator._firstStep.mock.calls[0][0]).toBe(point);
  });

  it("checks if lineCreator._firstStep was called one time with 'point' as the first argument and lineCreator._secondStep was called one time when lineCreator.create was called one time", () => {
    const point1 = new Point(100, 200);
    const point2 = new Point(200, 100);
    lineCreator._firstStep = jest.fn();
    lineCreator._secondStep = jest.fn();

    lineCreator.create(point1);
    lineCreator.step = 1;
    lineCreator.create(point2);
    lineCreator.step = 0;

    expect(lineCreator._firstStep.mock.calls.length).toBe(1);
    expect(lineCreator._firstStep.mock.calls[0][0]).toBe(point1);
    expect(lineCreator._secondStep.mock.calls.length).toBe(1);
  });
});

describe("#_firstStep", () => {
  let canvas;
  let getters;
  let store;
  let lineCreator;
  let point;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    getters = {
      getCurrentTool() {
        return {
          strokeType: "solid-bold"
        };
      }
    };
    store = new Vuex.Store({
      getters
    });

    lineCreator = new LineCreator(canvas, store);
    point = new Point(150, 300);
  });

  it("checks if lineCreator.line is an instace of Line", () => {
    lineCreator._firstStep(point);

    expect(lineCreator.line instanceof Line).toBeTruthy();
  });

  it("checks coords of lineCreator.line", () => {
    lineCreator._firstStep(point);

    expect(lineCreator.line.x1).toBe(point.x);
    expect(lineCreator.line.y1).toBe(point.y);
  });

  it("checks if lineCreator.line.types contains 'solid-bold'", () => {
    lineCreator._firstStep(point);

    expect(lineCreator.line.types).toContain("solid-bold");
  });

  it("checks if lineCreator._bindEvents was called one time", () => {
    lineCreator._bindEvents = jest.fn();
    lineCreator._firstStep(point);

    expect(lineCreator._bindEvents.mock.calls.length).toBe(1);
  });

  it("checks if lineCreator.step equals 1", () => {
    lineCreator._firstStep(point);

    expect(lineCreator.step).toBe(1);
  });
});

describe("#_secondStep", () => {
  let canvas;
  let state;
  let getters;
  let store;
  let lineCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      objects: []
    };
    getters = {
      getObjects(state) {
        return state.objects;
      }
    };
    store = new Vuex.Store({
      state,
      getters
    });

    lineCreator = new LineCreator(canvas, store);
  });

  it("checks if lineCreator._unbindEvents was called one time", () => {
    lineCreator._unbindEvents = jest.fn();

    lineCreator._secondStep();

    expect(lineCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("checks if this.line was pushed into objects", () => {
    lineCreator.line = {};

    lineCreator._secondStep();

    expect(store.getters.getObjects).toContain(lineCreator.line);
  });

  it("resets step", () => {
    lineCreator.step = 1;

    lineCreator._secondStep();

    expect(lineCreator.step).toBe(0);
  });
});

describe("#reset", () => {
  let canvas;
  let getters;
  let store;
  let lineCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    getters = {
      getCurrentTool() {
        return {
          strokeType: "solid-bold"
        };
      }
    };
    store = new Vuex.Store({
      getters
    });

    lineCreator = new LineCreator(canvas, store);
  });

  it("checks if lineCreator._unbindEvents was called once", () => {
    lineCreator._unbindEvents = jest.fn();
    lineCreator.create(new Point(100, 100));

    lineCreator.reset();

    expect(lineCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("checks if lineCreator.line.el.remove was called once", () => {
    lineCreator.create(new Point(100, 100));
    lineCreator.line.el.remove = jest.fn();

    lineCreator.reset();

    expect(lineCreator.line.el.remove.mock.calls.length).toBe(1);
  });

  it("resets step", () => {
    lineCreator.create(new Point(100, 100));

    lineCreator.reset();

    expect(lineCreator.step).toBe(0);
  });
});

describe("#_animateEndingCoords", () => {
  let canvas;
  let getters;
  let store;
  let lineCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    getters = {
      getCurrentTool() {
        return {
          strokeType: "solid-bold"
        };
      },
      getObjects() {
        return [];
      },
      getScrollDistance() {
        return 0;
      }
    };
    store = new Vuex.Store({
      getters
    });

    lineCreator = new LineCreator(canvas, store);
  });

  it("checks ending coords", () => {
    const mousemoveEvent = new MouseEvent("mousemove");
    mousemoveEvent.offsetX = 250;
    mousemoveEvent.offsetY = 150;

    lineCreator.create(new Point(100, 100));
    lineCreator._animateEndingCoords(mousemoveEvent);

    expect(lineCreator.line.x2).toBe(250);
    expect(lineCreator.line.y2).toBe(150);
  });
});
