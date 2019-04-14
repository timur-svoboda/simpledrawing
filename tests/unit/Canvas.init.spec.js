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

  it("checks the existence of the canvasGroup", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasGroup = canvasInstance.init();
    expect(canvasGroup).toBeDefined();
  });

  it("checks if the canvasGroup contains the canvas", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasGroup = canvasInstance.init();
    expect(canvasGroup.select(".canvas")).toBeDefined();
  });

  it("checks if the canvasGroup contains the border", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasGroup = canvasInstance.init();
    expect(canvasGroup.select(".canvas__border")).toBeDefined();
  });

  it("checks if the canvasGroup contains the main inscription ", () => {
    const canvasInstance = new Canvas(paper, store);
    const canvasGroup = canvasInstance.init();
    expect(canvasGroup.select(".canvas__main-inscription")).toBeDefined();
  });
});
