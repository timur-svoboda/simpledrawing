import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Viewport from "./../../src/classes/Viewport.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Viewport.js event handling", () => {
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

  it("sets the y coords of the viewBox attribute", () => {
    viewportInstance.init();
    viewportInstance.canvasObj.canvas.node.dispatchEvent(
      new WheelEvent("wheel", { deltaY: -100 })
    );
    const viewBoxObject = viewportInstance.canvasObj.canvas.attr("viewBox");
    expect(viewBoxObject.y).toBe(-25);
  });

  it("sets the scrollDistance property of the store", () => {
    viewportInstance.init();
    viewportInstance.canvasObj.canvas.node.dispatchEvent(
      new WheelEvent("wheel", { deltaY: 100 })
    );
    expect(store.getters.getScrollDistance).toBe(25);
  });
});
