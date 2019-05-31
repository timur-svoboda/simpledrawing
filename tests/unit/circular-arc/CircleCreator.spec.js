/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#reset
  - resets RadiusControl(reset)
  - removes RadiusControl(reset)
  - calls circleCreator.circle.el.remove once
  - calls circleCreator._unbindEvents once(reset)
  - resets circleCreator.step(reset)
#create
  - calls circleCreator._firstStep once when step equals 0
  - calls circleCreator._secondStep once when step equals 1
#_firstStep
  - checks if circleCreator.circle is instance of the Circle class
  - checks the params of circleCreator.circle
  - checks stroke type
  - adds RadiusControl
  - calls circleCreator._bindEvents once
  - checks if circleCreator.step equal 1
  - checks if result.done is false
#_secondStep
  - resets RadiusControl(_secondStep)
  - removes RadiusControl(_secondStep)
  - calls circleCreator._unbindEvents once(_secondStep)
  - resets circleCreator.step(_secondStep)
  - checks result.value
  - checks if result.done is true
#_animateRadius
  - checks circleCreator.circle.radius
  - checks state.radius
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CircleCreator from "@/classes/circular-arc/CircleCreator.js";
import Circle from "@/classes/circular-arc/Circle.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("reset", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let circleCreator;

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

    circleCreator = new CircleCreator(canvas, store);
    circleCreator.step = 1;

    circleCreator.circle = {
      el: {
        remove: jest.fn()
      }
    };
    circleCreator._unbindEvents = jest.fn();

    circleCreator.reset();
  });

  it("resets RadiusControl(reset)", () => {
    expect(store.getters.getRadius).toBe(0);
  });

  it("removes RadiusControl(reset)", () => {
    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "RadiusControl"
    );
  });

  it("calls circleCreator.circle.el.remove once", () => {
    expect(circleCreator.circle.el.remove.mock.calls.length).toBe(1);
  });

  it("calls circleCreator._unbindEvents once(reset)", () => {
    expect(circleCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("resets circleCreator.step(reset)", () => {
    expect(circleCreator.step).toBe(0);
  });
});

describe("#create", () => {
  let canvas;
  let store;
  let circleCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    circleCreator = new CircleCreator(canvas, store);
  });

  it("calls circleCreator._firstStep once when step equals 0", () => {
    circleCreator._firstStep = jest.fn();
    circleCreator.create(new Point(100, 100));
    expect(circleCreator._firstStep.mock.calls.length).toBe(1);
  });

  it("calls circleCreator._secondStep once when step equals 1", () => {
    circleCreator._secondStep = jest.fn();
    circleCreator.step = 1;
    circleCreator.create();
    expect(circleCreator._secondStep.mock.calls.length).toBe(1);
  });
});

describe("#_firstStep", () => {
  let canvas;
  let state;
  let getters;
  let store;
  let circleCreator;
  let result;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      currentTool: {
        toolControllers: [],
        strokeType: "solid-bold"
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

    circleCreator = new CircleCreator(canvas, store);
    circleCreator._bindEvents = jest.fn();
    result = circleCreator._firstStep(new Point(100, 200));
  });

  it("checks if circleCreator.circle is an instance of the Circle class", () => {
    expect(circleCreator.circle).toBeInstanceOf(Circle);
  });

  it("checks the params of circleCreator.circle", () => {
    expect(circleCreator.circle.center.x).toBe(100);
    expect(circleCreator.circle.center.y).toBe(200);
    expect(circleCreator.circle.radius).toBe(0);
  });

  it("checks stroke type", () => {
    const strokeType = store.getters.getCurrentTool.strokeType;
    expect(circleCreator.circle.el.hasClass(strokeType)).toBeTruthy();
    expect(circleCreator.circle.types.indexOf(strokeType)).not.toBe(-1);
  });

  it("adds RadiusControl", () => {
    expect(
      store.getters.getCurrentTool.toolControllers.indexOf("RadiusControl")
    ).not.toBe(-1);
  });

  it("calls _bindEvents once", () => {
    expect(circleCreator._bindEvents.mock.calls.length).toBe(1);
  });

  it("checks if step equal 1", () => {
    expect(circleCreator.step).toBe(1);
  });

  it("checks if result.done is false", () => {
    expect(result.done).toBeFalsy();
  });
});

describe("#_secondStep", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let circleCreator;
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

    circleCreator = new CircleCreator(canvas, store);
    circleCreator.step = 1;
    circleCreator._unbindEvents = jest.fn();
    result = circleCreator._secondStep();
  });

  it("resets RadiusControl(_secondStep)", () => {
    expect(store.getters.getRadius).toBe(0);
  });

  it("removes RadiusControl(_secondStep)", () => {
    expect(store.getters.getCurrentTool.toolControllers).not.toContain(
      "RadiusControl"
    );
  });

  it("calls circleCreator._unbindEvents once(_secondStep)", () => {
    expect(circleCreator._unbindEvents.mock.calls.length).toBe(1);
  });

  it("resets circleCreator.step(_secondStep)", () => {
    expect(circleCreator.step).toBe(0);
  });

  it("checks result.value", () => {
    expect(result.value).toBe(circleCreator.circle);
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
  let circleCreator;

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

    circleCreator = new CircleCreator(canvas, store);
    circleCreator.mouse.getBindingCoords = jest.fn();
    circleCreator.mouse.getBindingCoords.mockReturnValueOnce(
      new Point(200, 200)
    );
    circleCreator.circle = {
      distFromCenterToPoint: jest.fn()
    };
    circleCreator.circle.distFromCenterToPoint.mockReturnValueOnce(99.3);
    circleCreator._animateRadius(new Event("click"));
  });

  it("checks circleCreator.circle.radius", () => {
    expect(circleCreator.circle.radius).toBe(100);
  });

  it("checks state.radius", () => {
    expect(store.getters.getRadius).toBe(100);
  });
});
