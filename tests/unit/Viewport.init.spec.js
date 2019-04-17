import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Viewport from "./../../src/classes/Viewport.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Viewport.js init", () => {
  let paper, viewportInstance, store;

  beforeEach(() => {
    paper = Snap(1366, 600);

    store = new Vuex.Store({
      state: {
        scrollDistance: 0
      },
      getters: {
        getScrollDistance(state) {
          return state.scrollDistance;
        }
      },
      mutations: {
        setScrollDistance(state, distance) {
          state.scrollDistance = distance;
        }
      }
    });

    viewportInstance = new Viewport(
      {
        canvas: paper,
        width: 1366,
        height: 600
      },
      store
    );
  });

  it("renders the viewBox attribute", () => {
    viewportInstance.init();
    const viewBoxObject = viewportInstance.canvasObj.canvas.attr("viewBox");
    expect(viewBoxObject).toBeDefined();
  });

  it("checks the width", () => {
    viewportInstance.init();
    const viewBoxObject = viewportInstance.canvasObj.canvas.attr("viewBox");
    expect(viewBoxObject.width).toBe(1366);
  });

  it("checks the height", () => {
    viewportInstance.init();
    const viewBoxObject = viewportInstance.canvasObj.canvas.attr("viewBox");
    expect(viewBoxObject.height).toBe(600);
  });
});
