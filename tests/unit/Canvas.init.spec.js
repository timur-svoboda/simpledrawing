import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js init", () => {
  const store = new Vuex.Store({
    state: {
      scale: 4
    },
    getters: {
      getScale(state) {
        return state.scale;
      }
    }
  });
  const paper = Snap(1366, 600);

  it("checks the existence of the canvasObj", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasObj = canvasInstance.init();
    expect(canvasObj).toBeDefined();
  });

  it("checks if the canvas contains the canvas", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasObj = canvasInstance.init();
    expect(canvasObj.canvas.select(".canvas")).toBeDefined();
  });

  it("checks if the canvas contains the border", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasObj = canvasInstance.init();
    expect(canvasObj.canvas.select(".canvas__border")).toBeDefined();
  });

  it("checks if the canvas contains the main inscription ", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasObj = canvasInstance.init();
    expect(canvasObj.canvas.select(".canvas__main-inscription")).toBeDefined();
  });
});
