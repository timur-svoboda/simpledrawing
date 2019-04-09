import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Viewport from "./../../src/classes/Viewport.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Viewport.js _setViewBoxY", () => {
  let paper, viewportInstance, store;

  beforeEach(() => {
    paper = Snap(1366, 600);
    /* clientWidth and clientHeight will equal zero because of element has no associated CSS layout Box,
     * so I define these properties manually.
     * https://drafts.csswg.org/cssom-view/#dom-element-clientwidth
     */
    Object.defineProperty(paper.node, "clientWidth", { value: 1366 });
    Object.defineProperty(paper.node, "clientHeight", { value: 600 });

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

    viewportInstance = new Viewport(paper, store);
  });

  it("sets the y coords of the viewBox attribute", () => {
    viewportInstance.init();
    viewportInstance._setViewBoxY(100);
    const viewBoxObject = viewportInstance.paper.attr("viewBox");
    expect(viewBoxObject.y).toBe(100);
  });
});
