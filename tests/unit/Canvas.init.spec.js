import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js init", () => {
  const store = new Vuex.Store({
    scale: 4,
    getters: {
      getScale(state) {
        return state.scale;
      }
    }
  });
  const paper = Snap(1366, 600);
  const canvasInstance = new Canvas(paper, store);

  it("rotates canvasGroup if horizontal", () => {
    const canvasGroup = canvasInstance.init({ orientation: "horizontal" });
    expect(canvasGroup._.transform).toBe("r-90");
  });

  it("doesn't rotate canvasGroup if vertical", () => {
    const canvasGroup = canvasInstance.init({ orientation: "vertical" });
    expect(canvasGroup._.transform).toEqual([]);
  });
});
