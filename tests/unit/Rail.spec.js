import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rail from "./../../src/classes/Rail.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("_drawVerticalRail", () => {
  let canvas;
  let store;
  let rail;
  let offset;
  let verticalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    rail = new Rail(canvas, store);
    offset = 100;
    verticalRail = rail._drawVerticalRail(offset);
  });

  it("checks the existance of the rail element", () => {
    expect(verticalRail).toBeDefined();
  });

  it("checks the class of the rail element", () => {
    expect(verticalRail.hasClass("canvas__rail")).toBeTruthy();
  });

  it("checks the equality of x1 and x2 coords", () => {
    expect(+verticalRail.attr("x1")).toBe(+verticalRail.attr("x2"));
  });

  it("checks x1 coord", () => {
    expect(+verticalRail.attr("x1")).toBe(offset);
  });

  it("checks y1 coord", () => {
    expect(+verticalRail.attr("y1")).toBe(-50000);
  });

  it("checks y2 coord", () => {
    expect(+verticalRail.attr("y2")).toBe(50000);
  });
});

describe("_drawHorizontalRail", () => {
  let canvas;
  let store;
  let rail;
  let offset;
  let horizontalRail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    rail = new Rail(canvas, store);
    offset = 100;
    horizontalRail = rail._drawHorizontalRail(offset);
  });

  it("checks the existance of the rail element", () => {
    expect(horizontalRail).toBeDefined();
  });

  it("checks the class of the rail element", () => {
    expect(horizontalRail.hasClass("canvas__rail")).toBeTruthy();
  });

  it("checks the equality of y1 and y2 coords", () => {
    expect(+horizontalRail.attr("y1")).toBe(+horizontalRail.attr("y2"));
  });

  it("checks y1 coord", () => {
    expect(+horizontalRail.attr("y1")).toBe(offset);
  });

  it("checks x1 coord", () => {
    expect(+horizontalRail.attr("x1")).toBe(-50000);
  });

  it("checks x2 coord", () => {
    expect(+horizontalRail.attr("x2")).toBe(50000);
  });
});

describe("_calcControlPoints", () => {
  let canvas;
  let store;
  let rail;

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store({
      state: {
        controlPoints: []
      },
      getters: {
        getRails() {
          return [{ types: ["rail", "vertical"], offset: 100 }];
        },
        getControlPoints(state) {
          return state.controlPoints;
        }
      }
    });
    rail = new Rail(canvas, store);
  });

  it("checks controlPoints length when there is one intersection", () => {
    rail._calcControlPoints({ types: ["rail", "horizontal"], offset: 100 });
    expect(store.getters.getControlPoints.length).toBe(1);
  });

  it("checks controlPoints length when there are three intersection", () => {
    rail._calcControlPoints({ types: ["rail", "horizontal"], offset: 100 });
    rail._calcControlPoints({ types: ["rail", "horizontal"], offset: 200 });
    rail._calcControlPoints({ types: ["rail", "horizontal"], offset: 300 });
    expect(store.getters.getControlPoints.length).toBe(3);
  });
});
