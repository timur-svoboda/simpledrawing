/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#constructor
  - checks if railCreator.horizontalRailCreator is defined
  - checks if railCreator.verticalRailCreator is defined
  - checks if railCreator.parallelRailCreator is defined
  - checks if railCreator.symmetricalRailsCreator is defined
#createRailsWrapper
  - checks if railCreator.railsWrapper is defined
  - checks if railCreator.railsWrapper is a group
  - checks if railCreator.railsWrapper has a class 'rails-wrapper'
#toggleRails
  - checks if railCreator.railsWrapper is added a class 'hide'
  - checks if railCreator.railsWrapper is removed a class 'hide'
  - checks if store.railsState gets false
  - checks if store.railsState gets true
#create
  - checks if railCreator.horizontalRailCreator.create was called one time and railCreator._register was called one time
  - checks if railCreator.verticalRailCreator.create was called one time and railCreator._register was called one time
  - checks if railCreator.parallelRailCreator.create was called one time and railCreator._register was called one time
  - checks if railCreator.symmetricalRailsCreator.create was called one time and railCreator._register was called one time
#_register
  - doesn't call _calcControlPoints when res, res.done, or res.value is undefined
  - doesn't call railsWrapper.add when res, res.done, or res.value is undefined
  - doesn't add res to objects when res, res.done, or res.value is undefined
  - calls _calcControlPoints once when res, res.done, and res.value are defined
  - calls railsWrapper.add once when res, res.done, and res.value are defined
  - increases objects length when res, res.done, and res.value are defined
  - adds res to objects when res, res.done, and res.value are defined
#reset
  - checks if railCreator.parallelRailCreator.reset was called one time
  - checks if railCreator.symmetricalRailsCreator.reset was called one time
#_calcControlPoints
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RailCreator from "@/classes/rail/RailCreator.js";
import Point from "@/classes/Point.js";
import HorizontalRail from "@/classes/rail/HorizontalRail.js";
import VerticalRail from "@/classes/rail/VerticalRail.js";
import ControlPoint from "@/classes/ControlPoint.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#constructor", () => {
  let canvas;
  let store;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    railCreator = new RailCreator(canvas, store);
  });

  it("checks if railCreator.horizontalRailCreator is defined", () => {
    expect(railCreator.horizontalRailCreator).toBeDefined();
  });

  it("checks if railCreator.verticalRailCreator is defined", () => {
    expect(railCreator.verticalRailCreator).toBeDefined();
  });

  it("checks if railCreator.parallelRailCreator is defined", () => {
    expect(railCreator.parallelRailCreator).toBeDefined();
  });

  it("checks if railCreator.symmetricalRailsCreator is defined", () => {
    expect(railCreator.symmetricalRailsCreator).toBeDefined();
  });
});

describe("#createRailsWrapper", () => {
  let canvas;
  let store;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    railCreator = new RailCreator(canvas, store);
    railCreator.createRailsWrapper();
  });

  it("checks if railCreator.railsWrapper is defined", () => {
    expect(railCreator.railsWrapper).toBeDefined();
  });

  it("checks if railCreator.railsWrapper is a group", () => {
    expect(railCreator.railsWrapper.type).toBe("g");
  });

  it("checks if railCreator.railsWrapper has a class 'rails-wrapper'", () => {
    expect(railCreator.railsWrapper.hasClass("rails-wrapper")).toBeTruthy();
  });
});

describe("#toggleRails", () => {
  let canvas;
  let state;
  let getters;
  let mutations;
  let store;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    state = {
      railsState: true
    };

    getters = {
      getRailsState(state) {
        return state.railsState;
      }
    };

    mutations = {
      toggleRailsState(state) {
        state.railsState = !state.railsState;
      }
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations
    });
    railCreator = new RailCreator(canvas, store);
    railCreator.createRailsWrapper();
  });

  it("checks if railCreator.railsWrapper is added a class 'hide'", () => {
    railCreator.toggleRails();
    expect(railCreator.railsWrapper.hasClass("hide")).toBeTruthy();
  });

  it("checks if railCreator.railsWrapper is removed a class 'hide'", () => {
    railCreator.toggleRails();
    railCreator.toggleRails();
    expect(railCreator.railsWrapper.hasClass("hide")).toBeFalsy();
  });

  it("checks if store.railsState gets false", () => {
    railCreator.toggleRails();
    expect(store.getters.getRailsState).toBeFalsy();
  });

  it("checks if store.railsState gets true", () => {
    railCreator.toggleRails();
    railCreator.toggleRails();
    expect(store.getters.getRailsState).toBeTruthy();
  });
});

describe("#create", () => {
  let canvas;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
  });

  it("checks if railCreator.horizontalRailCreator.create was called one time and railCreator._register was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "horizontal" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.horizontalRailCreator.create = jest.fn();
    railCreator._register = jest.fn();

    railCreator.create(new Point(100, 100));

    expect(railCreator.horizontalRailCreator.create.mock.calls.length).toBe(1);
    expect(railCreator._register.mock.calls.length).toBe(1);
  });

  it("checks if railCreator.verticalRailCreator.create was called one time and railCreator._register was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "vertical" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.verticalRailCreator.create = jest.fn();
    railCreator._register = jest.fn();

    railCreator.create(new Point(100, 100));

    expect(railCreator.verticalRailCreator.create.mock.calls.length).toBe(1);
    expect(railCreator._register.mock.calls.length).toBe(1);
  });

  it("checks if railCreator.parallelRailCreator.create was called one time and railCreator._register was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "parallel" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.parallelRailCreator.create = jest.fn();
    railCreator._register = jest.fn();

    railCreator.create(new Point(100, 100));

    expect(railCreator.parallelRailCreator.create.mock.calls.length).toBe(1);
    expect(railCreator._register.mock.calls.length).toBe(1);
  });

  it("checks if railCreator.symmetricalRailsCreator.create was called one time and railCreator._register was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "symmetrical" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.symmetricalRailsCreator.create = jest.fn();
    railCreator._register = jest.fn();

    railCreator.create(new Point(100, 100));

    expect(railCreator.symmetricalRailsCreator.create.mock.calls.length).toBe(
      1
    );
    expect(railCreator._register.mock.calls.length).toBe(1);
  });
});

describe("#_register", () => {
  let canvas;
  let store;
  let objects;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.getters.getObjects = [];
    objects = store.getters.getObjects;

    railCreator = new RailCreator(canvas, store);
    railCreator._calcControlPoints = jest.fn();
    railCreator.railsWrapper = {
      add: jest.fn()
    };
    railCreator.railsWrapper.add.mockReturnValue(10);
  });

  it("doesn't call _calcControlPoints when res, res.done, or res.value is undefined", () => {
    const res = undefined;

    railCreator._register(res);

    expect(railCreator._calcControlPoints.mock.calls.length).toBe(0);
  });

  it("doesn't call railsWrapper.add when res, res.done, or res.value is undefined", () => {
    const res = undefined;

    railCreator._register(res);

    expect(railCreator.railsWrapper.add.mock.calls.length).toBe(0);
  });

  it("doesn't add res to objects when res, res.done, or res.value is undefined", () => {
    const res = undefined;

    railCreator._register(res);

    expect(objects.length).toBe(0);
  });

  it("calls _calcControlPoints once when res, res.done, and res.value are defined", () => {
    const res = {
      done: true,
      value: [1, 2, 3]
    };

    railCreator._register(res);

    expect(railCreator._calcControlPoints.mock.calls.length).toBe(3);
  });

  it("calls railsWrapper.add once when res, res.done, and res.value are defined", () => {
    const res = {
      done: true,
      value: [1, 2, 3]
    };

    railCreator._register(res);

    expect(railCreator.railsWrapper.add.mock.calls.length).toBe(3);
  });

  it("increases objects length when res, res.done, and res.value are defined", () => {
    const res = {
      done: true,
      value: [1, 2, 3]
    };

    railCreator._register(res);

    expect(objects.length).toBe(3);
  });

  it("adds res to objects when res, res.done, and res.value are defined", () => {
    const res = {
      done: true,
      value: [1, 2, 3]
    };

    railCreator._register(res);

    expect(objects[0]).toBe(1);
    expect(objects[1]).toBe(2);
    expect(objects[2]).toBe(3);
  });
});

describe("#reset", () => {
  let canvas;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);
  });

  it("checks if railCreator.parallelRailCreator.reset was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "parallel" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.parallelRailCreator.reset = jest.fn();
    railCreator.reset();

    expect(railCreator.parallelRailCreator.reset.mock.calls.length).toBe(1);
  });

  it("checks if railCreator.symmetricalRailsCreator.reset was called one time", () => {
    const store = new Vuex.Store({
      getters: {
        getCurrentTool() {
          return { railType: "symmetrical" };
        }
      }
    });
    const railCreator = new RailCreator(canvas, store);
    railCreator.symmetricalRailsCreator.reset = jest.fn();
    railCreator.reset();

    expect(railCreator.symmetricalRailsCreator.reset.mock.calls.length).toBe(1);
  });
});

describe("#_calcControlPoints", () => {
  let canvas;
  let store;
  let rails;
  let controlPoints;
  let railCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();

    rails = store.getters.getRails = [];
    for (let i = 0; i < 3; i++) {
      const el = canvas.line(100 * i, -10000, 100 * i, 10000);
      const rail = new VerticalRail(el);
      rails.push(rail);
    }
    controlPoints = store.getters.getControlPoints = [];

    railCreator = new RailCreator(canvas, store);
  });

  it("increases controlPoints length", () => {
    const el = canvas.line(-10000, 100, 10000, 100);
    const rail = new HorizontalRail(el);

    railCreator._calcControlPoints(rail);

    expect(controlPoints.length).toBe(3);
  });

  it("checks if elements of controlPoints are instance of the ControlPoint class", () => {
    const el = canvas.line(-10000, 100, 10000, 100);
    const rail = new HorizontalRail(el);

    railCreator._calcControlPoints(rail);

    controlPoints.forEach(cp => {
      expect(cp).toBeInstanceOf(ControlPoint);
    });
  });
});
