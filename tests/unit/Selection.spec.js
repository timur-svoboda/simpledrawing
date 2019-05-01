import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Selection from "./../../src/classes/Selection.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("selectAll and unselectAll", () => {
  let canvas;
  let objects;
  let state;
  let getters;
  let store;
  let selection;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    objects = [];

    for (let i = 0; i < 50; i += 5) {
      objects.push({
        el: canvas.line(i, 0, i + 5, 5),
        selected: i % 2 ? true : false
      });
    }

    state = {
      objects: objects
    };

    getters = {
      getObjects(state) {
        return state.objects;
      }
    };

    store = new Vuex.Store({
      state,
      getters
    });

    selection = new Selection(canvas, store);
  });

  it("checks if properties 'selected' are true", () => {
    selection.selectAll();

    store.getters.getObjects.forEach(obj => {
      expect(obj.selected).toBeTruthy();
    });
  });

  it("checks if elements have class 'highlighted'", () => {
    selection.selectAll();

    store.getters.getObjects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBeTruthy();
    });
  });

  it("checks if properties 'selected' are false", () => {
    selection.unselectAll();

    store.getters.getObjects.forEach(obj => {
      expect(obj.selected).toBeFalsy();
    });
  });

  it("checks if elements don't have class 'highlighted'", () => {
    selection.unselectAll();

    store.getters.getObjects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBeFalsy();
    });
  });
});
