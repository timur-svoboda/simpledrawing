import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Trash from "./../../src/classes/Trash.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("_removeControlPoints", () => {
  let rails;
  let state;
  let getters;
  let store;
  let trash;

  beforeEach(() => {
    rails = [];

    for (let i = 0; i < 6; i++) {
      rails[i] = { x: i };
    }

    let state = {
      controlPoints: [
        { rails: [rails[0], rails[1]] },
        { rails: [rails[2], rails[3]] },
        { rails: [rails[4], rails[5]] }
      ]
    };

    getters = {
      getControlPoints(state) {
        return state.controlPoints;
      }
    };

    store = new Vuex.Store({
      state,
      getters
    });

    trash = new Trash(store);
  });

  it("checks controlPoints initial length", () => {
    const controlPointsLength = store.getters.getControlPoints.length;
    expect(controlPointsLength).toBe(3);
  });

  it("checks controlPoints length", () => {
    trash._removeControlPoints(rails[2]);
    const controlPointsLength = store.getters.getControlPoints.length;

    expect(controlPointsLength).toBe(2);
  });

  it("checks the existance of the second control point", () => {
    trash._removeControlPoints(rails[2]);
    const controlPoints = store.getters.getControlPoints;

    expect(controlPoints[1]).toBeDefined();
  });

  it("checks that no control point has a rail", () => {
    const rail = rails[2];
    trash._removeControlPoints(rail);
    store.getters.getControlPoints.forEach(cp => {
      expect(cp.rails.indexOf(rail)).toBe(-1);
    });
  });
});
