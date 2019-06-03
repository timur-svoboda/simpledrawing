/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#reset
  - calls _unbindEvents once(reset)
  - calls baseRail.unselect once(reset)
  - calls rail.el.remove once for each rail
  - calls store.commit with 'setDistToBaseRail', 0 once(reset)
  - removes 'DistToBaseRail' from toolControllers(reset)
  - resets step(reset)
#create
  - calls _firstStep once when step equals 0
  - doesn't call _secondStep when step equals 0
  - doesn't call _firstStep when step equals 1
  - calls _secondStep once when step equals 1
#_firstStep
  - calls mouse.getClosestObject with point, rails once
  - calls co.clone twice
  - adds 100 and 200 to symmetricalRailsCreator.rails
  - calls co.select once
  - adds 'DistToBaseRailControl' to toolControllers
  - calls _bindEvents once
  - increases step to 1
  - checks if res.done is false
#_secondStep
  - calls _unbindEvents once(_secondStep)
  - calls baseRail.unselect once(_secondStep)
  - calls store.commit with 'setDistToBaseRail', 0 once(_secondStep)
  - removes 'DistToBaseRailControl' from toolControllers(_secondStep)
  - resets step(_secondStep)
  - checks if res.done is true
  - checks if res.value is symmetricalRailsCreator.rails
#_animateOffset
  - checks the first rail offset
  - checks the second rail offset
  - calls store.commit with 'setDistToBaseRail', 100 once
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SymmetricalRailsCreator from "@/classes/rail/SymmetricalRailsCreator.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#reset", () => {
  let canvas;
  let store;
  let symmetricalRailsCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.commit = jest.fn();
    store.getters.getCurrentTool = { toolControllers: ["DistToBaseRail"] };

    symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
    symmetricalRailsCreator._unbindEvents = jest.fn();
    symmetricalRailsCreator.baseRail = { unselect: jest.fn() };
    symmetricalRailsCreator.rails = [];
    for (let i = 0; i < 2; i++) {
      symmetricalRailsCreator.rails.push({ el: { remove: jest.fn() } });
    }
    symmetricalRailsCreator.step = 1;
  });

  it("calls _unbindEvents once(reset)", () => {
    symmetricalRailsCreator.reset();

    expect(symmetricalRailsCreator._unbindEvents).toHaveBeenCalled();
  });

  it("calls baseRail.unselect once(reset)", () => {
    symmetricalRailsCreator.reset();

    expect(symmetricalRailsCreator.baseRail.unselect).toHaveBeenCalled();
  });

  it("calls rail.el.remove once for each rail", () => {
    symmetricalRailsCreator.reset();

    symmetricalRailsCreator.rails.forEach(rail => {
      expect(rail.el.remove).toHaveBeenCalled();
    });
  });

  it("calls store.commit with 'setDistToBaseRail', 0 once(reset)", () => {
    symmetricalRailsCreator.reset();

    expect(store.commit).toHaveBeenCalledWith("setDistToBaseRail", 0);
  });

  it("removes 'DistToBaseRail' from toolControllers(reset)", () => {
    symmetricalRailsCreator.reset();

    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "DistToBaseRail"
    );
  });

  it("resets step(reset)", () => {
    symmetricalRailsCreator.reset();

    expect(symmetricalRailsCreator.step).toBe(0);
  });
});

describe("#create", () => {
  let canvas;
  let store;
  let symmetricalRailsCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();

    symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
    symmetricalRailsCreator._firstStep = jest.fn();
    symmetricalRailsCreator._secondStep = jest.fn();
  });

  it("calls _firstStep once when step equals 0", () => {
    const point = new Point(100, 100);
    symmetricalRailsCreator.step = 0;

    symmetricalRailsCreator.create(point);

    expect(symmetricalRailsCreator._firstStep).toHaveBeenCalledWith(point);
  });

  it("doesn't call _secondStep when step equals 0", () => {
    const point = new Point(100, 100);
    symmetricalRailsCreator.step = 0;

    symmetricalRailsCreator.create(point);

    expect(symmetricalRailsCreator._secondStep).not.toHaveBeenCalled();
  });

  it("doesn't call _firstStep when step equals 1", () => {
    const point = new Point(100, 100);
    symmetricalRailsCreator.step = 1;

    symmetricalRailsCreator.create(point);

    expect(symmetricalRailsCreator._firstStep).not.toHaveBeenCalled();
  });

  it("calls _secondStep once when step equals 1", () => {
    const point = new Point(100, 100);
    symmetricalRailsCreator.step = 1;

    symmetricalRailsCreator.create(point);

    expect(symmetricalRailsCreator._secondStep).toHaveBeenCalledWith();
  });
});

describe("#_firstStep", () => {
  let canvas;
  let store;
  let rails;
  let symmetricalRailsCreator;
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

    symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
    symmetricalRailsCreator.mouse.getClosestObject = jest.fn();
    co = {
      clone: jest.fn(),
      select: jest.fn()
    };
    co.clone.mockReturnValueOnce(100).mockReturnValueOnce(200);
    symmetricalRailsCreator.mouse.getClosestObject.mockReturnValue({
      co,
      dist: 10
    });
    symmetricalRailsCreator._bindEvents = jest.fn();
    symmetricalRailsCreator.rails = [];

    point = new Point(100, 100);
  });

  it("calls mouse.getClosestObject with point, rails once", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(symmetricalRailsCreator.mouse.getClosestObject).toHaveBeenCalledWith(
      point,
      rails
    );
  });

  it("calls co.clone twice", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(co.clone).toHaveBeenCalledTimes(2);
  });

  it("adds 100 and 200 to symmetricalRailsCreator.rails", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(symmetricalRailsCreator.rails[0]).toBe(100);
    expect(symmetricalRailsCreator.rails[1]).toBe(200);
  });

  it("calls co.select once", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(co.select).toHaveBeenCalled();
  });

  it("adds 'DistToBaseRailControl' to toolControllers", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(store.getters.getCurrentTool.toolControllers).toContain(
      "DistToBaseRailControl"
    );
  });

  it("calls _bindEvents once", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(symmetricalRailsCreator._bindEvents).toHaveBeenCalled();
  });

  it("increases step to 1", () => {
    symmetricalRailsCreator._firstStep(point);

    expect(symmetricalRailsCreator.step).toBe(1);
  });

  it("checks if res.done is false", () => {
    const res = symmetricalRailsCreator._firstStep(point);

    expect(res.done).toBeFalsy();
  });
});

describe("#_secondStep", () => {
  let canvas;
  let store;
  let symmetricalRailsCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.commit = jest.fn();
    store.getters.getCurrentTool = {
      toolControllers: ["DistToBaseRailControl"]
    };

    symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
    symmetricalRailsCreator._unbindEvents = jest.fn();
    symmetricalRailsCreator.baseRail = { unselect: jest.fn() };
    symmetricalRailsCreator.rail = {};
  });

  it("calls _unbindEvents once(_secondStep)", () => {
    symmetricalRailsCreator._secondStep();

    expect(symmetricalRailsCreator._unbindEvents).toHaveBeenCalled();
  });

  it("calls baseRail.unselect once(_secondStep)", () => {
    symmetricalRailsCreator._secondStep();

    expect(symmetricalRailsCreator.baseRail.unselect).toHaveBeenCalled();
  });

  it("calls store.commit with 'setDistToBaseRail', 0 once(_secondStep)", () => {
    symmetricalRailsCreator._secondStep();

    expect(store.commit).toHaveBeenCalledWith("setDistToBaseRail", 0);
  });

  it("removes 'DistToBaseRailControl' from toolControllers(_secondStep)", () => {
    symmetricalRailsCreator._secondStep();

    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "DistToBaseRailControl"
    );
  });

  it("resets step(_secondStep)", () => {
    symmetricalRailsCreator._secondStep();

    expect(symmetricalRailsCreator.step).toBe(0);
  });

  it("checks if res.done is true", () => {
    const res = symmetricalRailsCreator._secondStep();

    expect(res.done).toBeTruthy();
  });

  it("checks if res.value is symmetricalRailsCreator.rails", () => {
    const res = symmetricalRailsCreator._secondStep();

    expect(res.value).toBe(symmetricalRailsCreator.rails);
  });
});

describe("#_animateOffset", () => {
  let canvas;
  let store;
  let symmetricalRailsCreator;
  let event;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.commit = jest.fn();

    symmetricalRailsCreator = new SymmetricalRailsCreator(canvas, store);
    symmetricalRailsCreator.mouse.getCoords = jest.fn();
    symmetricalRailsCreator.mouse.getCoords.mockReturnValue(
      new Point(222, 333)
    );
    symmetricalRailsCreator.baseRail = {
      offset: 200,
      distToPoint: jest.fn()
    };
    symmetricalRailsCreator.baseRail.distToPoint.mockReturnValue(100);
    symmetricalRailsCreator.rails = [{ offset: 0 }, { offset: 0 }];

    event = new MouseEvent("click");
  });

  it("checks the first rail offset", () => {
    symmetricalRailsCreator._animateOffset(event);

    expect(symmetricalRailsCreator.rails[0].offset).toBe(300);
  });

  it("checks the second rail offset", () => {
    symmetricalRailsCreator._animateOffset(event);

    expect(symmetricalRailsCreator.rails[1].offset).toBe(100);
  });

  it("calls store.commit with 'setDistToBaseRail', 100 once", () => {
    symmetricalRailsCreator._animateOffset(event);

    expect(store.commit).toHaveBeenCalledWith("setDistToBaseRail", 100);
  });
});
