import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js init", () => {
  let store;
  let canvasInstance;
  let paper;

  beforeEach(() => {
    store = new Vuex.Store({
      scale: 4,
      getters: {
        getScale(state) {
          return state.scale;
        }
      }
    });

    paper = Snap(1366, 600);

    canvasInstance = new Canvas(paper, store);
  });

  it("rotates canvasGroup if horizontal", () => {
    const canvasGroup = canvasInstance.init({ orientation: "horizontal" });
    expect(canvasGroup._.transform).toBe("r-90");
  });

  it("doesn't rotate canvasGroup if vertical", () => {
    const canvasGroup = canvasInstance.init({ orientation: "vertical" });
    expect(canvasGroup._.transform).toEqual([]);
  });
});

describe("Canvas.js _drawMainInscription", () => {
  let store;
  let canvasInstance;
  let paper;

  beforeEach(() => {
    store = new Vuex.Store({
      scale: 4,
      getters: {
        getScale(state) {
          return state.scale;
        }
      }
    });

    paper = Snap(1366, 600);

    canvasInstance = new Canvas(paper, store);
  });

  it("checks the text of the author field", () => {
    const fields = canvasInstance._drawMainInscription(0, 0);
    expect(fields.children().length).toBe(11);
  });
});

describe("Canvas.js _drawField", () => {
  let store;
  let canvasInstance;
  let paper;

  beforeEach(() => {
    store = new Vuex.Store({
      scale: 4,
      getters: {
        getScale(state) {
          return state.scale;
        }
      }
    });

    paper = Snap(1366, 600);

    canvasInstance = new Canvas(paper, store);
  });

  it("checks children length", () => {
    const field = canvasInstance._drawField(
      0,
      0,
      100,
      20,
      "some text",
      "some-id"
    );
    expect(field.children().length).toBe(2);
  });

  it("checks the first children tag name", () => {
    const field = canvasInstance._drawField(
      0,
      0,
      100,
      20,
      "some text",
      "some-id"
    );
    expect(field.children()[0].node.tagName.toLowerCase()).toBe("rect");
  });

  it("checks the second children tag name", () => {
    const field = canvasInstance._drawField(
      0,
      0,
      100,
      20,
      "some text",
      "some-id"
    );
    expect(field.children()[1].node.tagName.toLowerCase()).toBe("text");
  });

  it("checks the id", () => {
    const field = canvasInstance._drawField(
      0,
      0,
      100,
      20,
      "some text",
      "some-id"
    );
    expect(field.id).toBe("some-id");
    expect(field.node.id).toBe("some-id");
  });

  it("checks the text", () => {
    const field = canvasInstance._drawField(
      0,
      0,
      100,
      20,
      "some text",
      "some-id"
    );
    expect(field.children()[1].innerSVG()).toBe("some text");
  });
});
