import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RailCreator from "@/classes/rail/RailCreator.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# constructor - 4
# createRailsWrapper - 3
# toggleRails - 4
# create - 4
# reset - 2
--------------------------------------------------------------*/

describe("constructor", () => {
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

describe("createRailsWrapper", () => {
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

describe("toggleRails", () => {
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

describe("create", () => {
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

describe("reset", () => {
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
