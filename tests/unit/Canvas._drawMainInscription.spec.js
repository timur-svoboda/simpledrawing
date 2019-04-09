import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js _drawMainInscription", () => {
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

  const canvasInstance = new Canvas(paper, store);
  const fields = canvasInstance._drawMainInscription(0, 0);

  it("checks the text of the author field", () => {
    expect(fields.children().length).toBe(11);
  });
});
