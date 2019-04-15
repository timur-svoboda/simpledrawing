import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rail from "./../../src/classes/Rail.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Rail.js _drawVerticalRail", () => {
  const store = new Vuex.Store({
    state: {
      scrollDistance: 0
    },
    getters: {
      getScrollDistance(state) {
        return state.scrollDistance;
      }
    }
  });

  const paper = Snap(1366, 600);

  const railInstance = new Rail(paper, store);

  it("draws rail", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawVerticalRail(x, y);

    expect(rail.obj).toBeDefined();
  });

  it("checks verticality", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawVerticalRail(x, y);

    expect(+rail.obj.attr("x1")).toBe(+rail.obj.attr("x2"));
  });

  it("checks X coord", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawVerticalRail(x, y);

    expect(+rail.obj.attr("x1")).toBe(x);
  });
});

describe("Rail.js _drawHorizontalRail", () => {
  const store = new Vuex.Store({
    state: {
      scrollDistance: 0
    },
    getters: {
      getScrollDistance(state) {
        return state.scrollDistance;
      }
    }
  });

  const paper = Snap(1366, 600);

  const railInstance = new Rail(paper, store);

  it("draws rail", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawHorizontalRail(x, y);

    expect(rail.obj).toBeDefined();
  });

  it("checks horizontality", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawHorizontalRail(x, y);

    expect(+rail.obj.attr("y1")).toBe(+rail.obj.attr("y2"));
  });

  it("checks Y coord", () => {
    const x = 100;
    const y = 100;

    const rail = railInstance._drawHorizontalRail(x, y);

    expect(+rail.obj.attr("y1")).toBe(y);
  });
});
