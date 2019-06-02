/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#reset
  - calls _unbindEvents once
  - calls baseRail.unselect once
  - calls rail.el.remove once
  - calls store.commit with 'setDistToBaseRail', 0 once
  - removes 'DistToBaseRail' from toolControllers
  - resets step
#create
  - calls _firstStep once when step equals 0
  - doesn't call _secondStep when step equals 0
  - doesn't call _firstStep when step equals 1
  - calls _secondStep once when step equals 1
#_firstStep
  - calls mouse.getClosestObject with point, rails once
  - calls co.clone once
  - calls co.select once
  - adds 'DistToBaseRailControl' to toolControllers
  - calls _bindEvents once
  - increases step to 1
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ParallelRailCreator from "@/classes/rail/ParallelRailCreator.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#reset", () => {
  let canvas;
  let store;
  let parallelRailCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.commit = jest.fn();
    store.getters.getCurrentTool = { toolControllers: ["DistToBaseRail"] };

    parallelRailCreator = new ParallelRailCreator(canvas, store);
    parallelRailCreator._unbindEvents = jest.fn();
    parallelRailCreator.baseRail = { unselect: jest.fn() };
    parallelRailCreator.rail = { el: { remove: jest.fn() } };
    parallelRailCreator.step = 1;
  });

  it("calls _unbindEvents once", () => {
    parallelRailCreator.reset();

    expect(parallelRailCreator._unbindEvents).toHaveBeenCalled();
  });

  it("calls baseRail.unselect once", () => {
    parallelRailCreator.reset();

    expect(parallelRailCreator.baseRail.unselect).toHaveBeenCalled();
  });

  it("calls rail.el.remove once", () => {
    parallelRailCreator.reset();

    expect(parallelRailCreator.rail.el.remove).toHaveBeenCalled();
  });

  it("calls store.commit with 'setDistToBaseRail', 0 once", () => {
    parallelRailCreator.reset();

    expect(store.commit).toHaveBeenCalledWith("setDistToBaseRail", 0);
  });

  it("removes 'DistToBaseRail' from toolControllers", () => {
    parallelRailCreator.reset();

    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "DistToBaseRail"
    );
  });

  it("resets step", () => {
    parallelRailCreator.reset();

    expect(parallelRailCreator.step).toBe(0);
  });
});

describe("#create", () => {
  let canvas;
  let store;
  let parallelRailCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();

    parallelRailCreator = new ParallelRailCreator(canvas, store);
    parallelRailCreator._firstStep = jest.fn();
    parallelRailCreator._secondStep = jest.fn();
  });

  it("calls _firstStep once when step equals 0", () => {
    const point = new Point(100, 100);
    parallelRailCreator.step = 0;

    parallelRailCreator.create(point);

    expect(parallelRailCreator._firstStep).toHaveBeenCalledWith(point);
  });

  it("doesn't call _secondStep when step equals 0", () => {
    const point = new Point(100, 100);
    parallelRailCreator.step = 0;

    parallelRailCreator.create(point);

    expect(parallelRailCreator._secondStep).not.toHaveBeenCalled();
  });

  it("doesn't call _firstStep when step equals 1", () => {
    const point = new Point(100, 100);
    parallelRailCreator.step = 1;

    parallelRailCreator.create(point);

    expect(parallelRailCreator._firstStep).not.toHaveBeenCalled();
  });

  it("calls _secondStep once when step equals 1", () => {
    const point = new Point(100, 100);
    parallelRailCreator.step = 1;

    parallelRailCreator.create(point);

    expect(parallelRailCreator._secondStep).toHaveBeenCalledWith();
  });
});

describe("#_firstStep", () => {
  let canvas;
  let store;
  let rails;
  let parallelRailCreator;
  let co;
  let point;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.getters.getRails = [];
    rails = store.getters.getRails;
    store.getters.getCurrentTool = {
      toolControllers: []
    };

    parallelRailCreator = new ParallelRailCreator(canvas, store);
    parallelRailCreator.mouse.getClosestObject = jest.fn();
    co = {
      clone: jest.fn(),
      select: jest.fn()
    };
    parallelRailCreator.mouse.getClosestObject.mockReturnValue({
      co,
      dist: 10
    });
    parallelRailCreator._bindEvents = jest.fn();

    point = new Point(100, 100);
  });

  it("calls mouse.getClosestObject with point, rails once", () => {
    parallelRailCreator._firstStep(point);

    expect(parallelRailCreator.mouse.getClosestObject).toHaveBeenCalledWith(
      point,
      rails
    );
  });

  it("calls co.clone once", () => {
    parallelRailCreator._firstStep(point);

    expect(co.clone).toHaveBeenCalled();
  });

  it("calls co.select once", () => {
    parallelRailCreator._firstStep(point);

    expect(co.select).toHaveBeenCalled();
  });

  it("adds 'DistToBaseRailControl' to toolControllers", () => {
    parallelRailCreator._firstStep(point);

    expect(store.getters.getCurrentTool.toolControllers).toContain(
      "DistToBaseRailControl"
    );
  });

  it("calls _bindEvents once", () => {
    parallelRailCreator._firstStep(point);

    expect(parallelRailCreator._bindEvents).toHaveBeenCalled();
  });

  it("increases step to 1", () => {
    parallelRailCreator._firstStep(point);

    expect(parallelRailCreator.step).toBe(1);
  });
});

// describe("#_secondStep", () => {
//   let canvas;
//   let store;
//   let parallelRailCreator;

//   beforeEach(() => {
//     canvas = new Snap(800, 600);

//     store = new Vuex.Store();

//     parallelRailCreator = new ParallelRailCreator(canvas, store);
//     parallelRailCreator._unbindEvents = jest.fn();
//     parallelRailCreator.baseRail = { unselect: jest.fn() };
//   });
// });
