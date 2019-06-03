/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#reset
  - resets RadiusControl when step equals 1
  - removes RadiusControl when step equals 1
  - calls circularArcCreator.stencil.el.remove once when step equals 1
  - calls circularArcCreator._unbindEvents once when step equals 1
  - doesn't call circularArcCreator.arc.el.remove when step equals 1
  - reset step when step equals 1
  - resets RadiusControl when step equals 2
  - removes RadiusControl when step equals 2
  - calls circularArcCreator.stencil.el.remove once when step equals 2
  - calls circularArcCreator._unbindEvents once when step equals 2
  - calls circularArcCreator.arc.el.remove when step equals 2
  - reset step when step equals 2
#create
  - calls circularArcCreator._firstStep once when step equals 0
  - calls circularArcCreator._secondStep once when step equals 1
  - calls circularArcCreator._thirdStep once when step equals 2
#_firstStep
  - checks if the stencil is an inctance of the Circle class
  - checks params of the stencil
  - checks stroke type of the stencil
  - checks opacity
  - adds RadiusControl
  - calls _bindEvents once(_firstStep)
  - checks if step equals 1
  - checks if result.done is false(_firstStep)
#_secondStep
  - checks if the arc is an inctance of the CircularArc class
  - checks params of the arc
  - checks the stroke type of the arc
  - calls _unbindEvents once(_secondStep)
  - calls _bindEvents once(_secondStep)
  - checks if step equal 2
  - checks if result.done is false(_secondStep)
#_thirdStep
  - resets RadiusControl(_thirdStep)
  - removes RadiusControl(_thirdStep)
  - calls circularArcCreator.stencil.el.remove once(_thirdStep)
  - calls circularArcCreator._unbindEvents once(_thirdStep)
  - reset step when step(_thirdStep)
  - checks result.value
  - checks if result.done is true
#_animateRadius
  - checks the radius of the stencil
  - checks state.radius
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CircularArcCreator from "@/classes/circular-arc/CircularArcCreator.js";
import CircularArc from "@/classes/circular-arc/CircularArc.js";
import Circle from "@/classes/circular-arc/Circle.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#reset", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let circularArcCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      currentTool: {
        toolControllers: ["RadiusControl"],
        radius: 100
      }
    };
    getters = {
      getCurrentTool(state) {
        return state.currentTool;
      },
      getRadius(state) {
        return state.radius;
      }
    };
    mutations = {
      setRadius(state, value) {
        state.radius = value;
      }
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations
    });

    circularArcCreator = new CircularArcCreator(canvas, store);
    circularArcCreator.stencil = {
      el: {
        remove: jest.fn()
      }
    };
    circularArcCreator._unbindEvents = jest.fn();
    circularArcCreator.arc = {
      el: {
        remove: jest.fn()
      }
    };
  });

  it("resets RadiusControl when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(store.getters.getRadius).toBe(0);
  });

  it("removes RadiusControl when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "RadiusControl"
    );
  });

  it("calls circularArcCreator.stencil.el.remove once when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(circularArcCreator.stencil.el.remove.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator._unbindEvents once when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(circularArcCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("doesn't call circularArcCreator.arc.el.remove when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(circularArcCreator.arc.el.remove.mock.calls.length).toBe(0);
  });

  it("reset step when step equals 1", () => {
    circularArcCreator.step = 1;
    circularArcCreator.reset();
    expect(circularArcCreator.step).toBe(0);
  });

  it("resets RadiusControl when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(store.getters.getRadius).toBe(0);
  });

  it("removes RadiusControl when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "RadiusControl"
    );
  });

  it("calls circularArcCreator.stencil.el.remove once when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(circularArcCreator.stencil.el.remove.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator._unbindEvents once when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(circularArcCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator.arc.el.remove when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(circularArcCreator.arc.el.remove.mock.calls.length).toBe(1);
  });

  it("reset step when step equals 2", () => {
    circularArcCreator.step = 2;
    circularArcCreator.reset();
    expect(circularArcCreator.step).toBe(0);
  });
});

describe("#create", () => {
  let canvas;
  let store;
  let circularArcCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    circularArcCreator = new CircularArcCreator(canvas, store);
  });

  it("calls circularArcCreator._firstStep once when step equals 0", () => {
    circularArcCreator._firstStep = jest.fn();
    circularArcCreator.create(new Point(100, 100));
    expect(circularArcCreator._firstStep.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator._secondStep once when step equals 1", () => {
    circularArcCreator._secondStep = jest.fn();
    circularArcCreator.step = 1;
    circularArcCreator.create(new Point(100, 100));
    expect(circularArcCreator._secondStep.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator._thirdStep once when step equals 2", () => {
    circularArcCreator._thirdStep = jest.fn();
    circularArcCreator.step = 2;
    circularArcCreator.create();
    expect(circularArcCreator._thirdStep.mock.calls.length).toBe(1);
  });
});

describe("#_firstStep", () => {
  let canvas;
  let state;
  let getters;
  let store;
  let circularArcCreator;
  let result;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      currentTool: {
        toolControllers: []
      }
    };
    getters = {
      getCurrentTool(state) {
        return state.currentTool;
      }
    };
    store = new Vuex.Store({
      state,
      getters
    });

    circularArcCreator = new CircularArcCreator(canvas, store);
    circularArcCreator._bindEvents = jest.fn();
    result = circularArcCreator._firstStep(new Point(100, 200));
  });

  it("checks if the stencil is an inctance of the Circle class", () => {
    expect(circularArcCreator.stencil).toBeInstanceOf(Circle);
  });

  it("checks params of the stencil", () => {
    expect(circularArcCreator.stencil.center.x).toBe(100);
    expect(circularArcCreator.stencil.center.y).toBe(200);
    expect(circularArcCreator.stencil.radius).toBe(0);
  });

  it("checks stroke type of the stencil", () => {
    expect(circularArcCreator.stencil.el.hasClass("solid-thin")).toBeTruthy();
    expect(circularArcCreator.stencil.types.indexOf("solid-thin")).not.toBe(-1);
  });

  it("checks opacity", () => {
    expect(+circularArcCreator.stencil.el.attr("opacity")).toBe(0.4);
  });

  it("adds RadiusControl", () => {
    expect(store.getters.getCurrentTool.toolControllers).toContain(
      "RadiusControl"
    );
  });

  it("calls _bindEvents once(_firstStep)", () => {
    expect(circularArcCreator._bindEvents.mock.calls.length).toBe(1);
  });

  it("checks if step equals 1", () => {
    expect(circularArcCreator.step).toBe(1);
  });

  it("checks if result.done is false(_firstStep)", () => {
    expect(result.done).toBeFalsy();
  });
});

describe("#_secondStep", () => {
  let canvas;
  let getters;
  let store;
  let circularArcCreator;
  let result;

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

    circularArcCreator = new CircularArcCreator(canvas, store);
    circularArcCreator._unbindEvents = jest.fn();
    circularArcCreator._bindEvents = jest.fn();
    circularArcCreator.stencil = {
      radius: 100
    };
    result = circularArcCreator._secondStep(new Point(100, 200));
  });

  it("checks if the arc is an inctance of the CircularArc class", () => {
    expect(circularArcCreator.arc).toBeInstanceOf(CircularArc);
  });

  it("checks params of the arc", () => {
    expect(circularArcCreator.arc.start.x).toBe(100);
    expect(circularArcCreator.arc.start.y).toBe(200);
    expect(circularArcCreator.arc.radius).toBe(100);
    expect(circularArcCreator.arc.laf).toBe(0);
    expect(circularArcCreator.arc.sf).toBe(0);
    expect(circularArcCreator.arc.end.x).toBe(100);
    expect(circularArcCreator.arc.end.y).toBe(200);
  });

  it("checks the stroke type of the arc", () => {
    const strokeType = store.getters.getCurrentTool.strokeType;
    expect(circularArcCreator.arc.el.hasClass(strokeType)).toBeTruthy();
    expect(circularArcCreator.arc.types.indexOf(strokeType)).not.toBe(-1);
  });

  it("calls _unbindEvents once(_secondStep)", () => {
    expect(circularArcCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("calls _bindEvents once(_secondStep)", () => {
    expect(circularArcCreator._bindEvents.mock.calls.length).toBe(1);
  });

  it("checks if step equal 2", () => {
    expect(circularArcCreator.step).toBe(2);
  });

  it("checks if result.done is false(_secondStep)", () => {
    expect(result.done).toBeFalsy();
  });
});

describe("#_thirdStep", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let circularArcCreator;
  let result;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      currentTool: {
        toolControllers: ["RadiusControl"],
        radius: 100
      }
    };
    getters = {
      getCurrentTool(state) {
        return state.currentTool;
      },
      getRadius(state) {
        return state.radius;
      }
    };
    mutations = {
      setRadius(state, value) {
        state.radius = value;
      }
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations
    });

    circularArcCreator = new CircularArcCreator(canvas, store);
    circularArcCreator.stencil = {
      el: {
        remove: jest.fn()
      }
    };
    circularArcCreator._unbindEvents = jest.fn();
    circularArcCreator.step = 2;
    result = circularArcCreator._thirdStep();
  });

  it("resets RadiusControl(_thirdStep)", () => {
    expect(store.getters.getRadius).toBe(0);
  });

  it("removes RadiusControl(_thirdStep)", () => {
    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "RadiusControl"
    );
  });

  it("calls circularArcCreator.stencil.el.remove once(_thirdStep)", () => {
    expect(circularArcCreator.stencil.el.remove.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator._unbindEvents once(_thirdStep)", () => {
    expect(circularArcCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("reset step when step(_thirdStep)", () => {
    expect(circularArcCreator.step).toBe(0);
  });

  it("checks result.value", () => {
    expect(result.value).toBe(circularArcCreator.arc);
  });

  it("checks if result.done is true", () => {
    expect(result.done).toBeTruthy();
  });
});

describe("#_animateRadius", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let circularArcCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      currentTool: {
        radius: 100
      }
    };
    getters = {
      getRadius(state) {
        return state.radius;
      }
    };
    mutations = {
      setRadius(state, value) {
        state.radius = value;
      }
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations
    });

    circularArcCreator = new CircularArcCreator(canvas, store);
    circularArcCreator.mouse.getBindingCoords = jest.fn();
    circularArcCreator.mouse.getBindingCoords.mockReturnValueOnce(
      new Point(200, 200)
    );
    circularArcCreator.stencil = {
      distFromCenterToPoint: jest.fn()
    };
    circularArcCreator.stencil.distFromCenterToPoint.mockReturnValueOnce(99.3);
    circularArcCreator._animateRadius(new Event("click"));
  });

  it("checks the radius of the stencil", () => {
    expect(circularArcCreator.stencil.radius).toBe(100);
  });

  it("checks state.radius", () => {
    expect(store.getters.getRadius).toBe(100);
  });
});
