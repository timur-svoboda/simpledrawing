import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Mouse from "./../../src/classes/Mouse.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Mouse.js getCoords", () => {
  const store = new Vuex.Store({
    state: {
      scrollDistance: 100
    },
    getters: {
      getScrollDistance(state) {
        return state.scrollDistance;
      }
    }
  });
  const paper = Snap(1366, 600);
  paper.node.getBoundingClientRect = () => {
    return {
      left: 50,
      top: 50
    };
  };

  const mouseInstance = new Mouse(paper, store);

  it("returns mouse coords when a click event triggered", () => {
    const coords = mouseInstance.getCoords(
      new MouseEvent("click", { clientX: 100, clientY: 200 })
    );
    expect(coords).toEqual({ x: 50, y: 250 });
  });

  it("returns mouse coords when a mousedown event triggered", () => {
    const coords = mouseInstance.getCoords(
      new MouseEvent("mousedown", { clientX: 100, clientY: 200 })
    );
    expect(coords).toEqual({ x: 50, y: 250 });
  });

  it("returns mouse coords when a mouseup event triggered", () => {
    const coords = mouseInstance.getCoords(
      new MouseEvent("mouseup", { clientX: 100, clientY: 200 })
    );
    expect(coords).toEqual({ x: 50, y: 250 });
  });

  it("returns mouse coords when a mousemove event triggered", () => {
    const coords = mouseInstance.getCoords(
      new MouseEvent("mousemove", { clientX: 100, clientY: 200 })
    );
    expect(coords).toEqual({ x: 50, y: 250 });
  });
});
