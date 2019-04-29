import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Scroll from "./../../src/classes/Scroll.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("_doScroll", () => {
  let canvas;
  let store;
  let scroll;

  beforeEach(() => {
    canvas = new Snap(800, 600);
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
    scroll = new Scroll(canvas, store);
  });

  it("checks scrollDistance after two scrolls up", () => {
    scroll._doScroll(new WheelEvent("wheel", { deltaY: -100 }));
    scroll._doScroll(new WheelEvent("wheel", { deltaY: -100 }));
    expect(store.getters.getScrollDistance).toBe(-50);
  });

  it("checks scrollDistance after two scrolls down", () => {
    scroll._doScroll(new WheelEvent("wheel", { deltaY: 100 }));
    scroll._doScroll(new WheelEvent("wheel", { deltaY: 100 }));
    expect(store.getters.getScrollDistance).toBe(50);
  });

  it("checks scrollDistance after one scrolls up and one scroll down", () => {
    scroll._doScroll(new WheelEvent("wheel", { deltaY: -100 }));
    scroll._doScroll(new WheelEvent("wheel", { deltaY: 100 }));
    expect(store.getters.getScrollDistance).toBe(0);
  });
});
