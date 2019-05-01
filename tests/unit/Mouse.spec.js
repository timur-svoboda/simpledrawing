import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Mouse from "./../../src/classes/Mouse.js";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("getCoords", () => {
  let getters;
  let store;
  let mouse;

  beforeEach(() => {
    getters = {
      getScrollDistance() {
        return 100;
      }
    };

    store = new Vuex.Store({
      getters
    });

    mouse = new Mouse(store);
  });

  it("checks X coord", () => {
    const e = new MouseEvent("click");
    e.offsetX = 100;
    e.offsetY = 200;
    const { x, y } = mouse.getCoords(e);

    expect(x).toBe(100);
  });

  it("checks Y coord", () => {
    const e = new MouseEvent("click");
    e.offsetX = 100;
    e.offsetY = 200;
    const { x, y } = mouse.getCoords(e);

    expect(y).toBe(300);
  });
});
