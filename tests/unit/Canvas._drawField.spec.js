import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js _drawField", () => {
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

  const field = canvasInstance._drawField(
    0,
    0,
    100,
    20,
    "some text",
    "some-id"
  );

  it("checks children length", () => {
    expect(field.children().length).toBe(2);
  });

  it("checks the first children tag name", () => {
    expect(field.select("rect").node.tagName.toLowerCase()).toBe("rect");
  });

  it("checks the second children tag name", () => {
    expect(field.select("text").node.tagName.toLowerCase()).toBe("text");
  });

  it("checks the id", () => {
    expect(field.id).toBe("some-id");
    expect(field.node.id).toBe("some-id");
  });

  it("checks the text", () => {
    expect(field.select("text").node.textContent).toBe("some text");
  });
});
