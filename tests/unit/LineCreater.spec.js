import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LineCreater from "./../../src/classes/LineCreater.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("_addPoint", () => {
  let canvas;
  let store;
  let line;
  const { x, y } = { x: 100, y: 200 };

  beforeEach(() => {
    canvas = new Snap(800, 600);
    store = new Vuex.Store();
    line = new LineCreater(canvas, store);
  });

  it("checks temporaryPoints length", () => {
    line._addPoint(x, y);

    expect(line.tps.length).toBe(1);
  });

  it("checks coords", () => {
    line._addPoint(x, y);
    const lastItemIndex = line.tps.length - 1;

    expect(line.tps[lastItemIndex].x).toBe(x);
    expect(line.tps[lastItemIndex].y).toBe(y);
  });

  it("checks temporaryPoints length", () => {
    line._addPoint(x, y);
    line._addPoint(x, y);

    expect(line.tps.length).toBe(1);
  });
});
