import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Selection from "./../../src/classes/Selection.js";
import CanvasObject from "./../../src/classes/CanvasObject.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("selectAll", () => {
  let objects;
  let canvas;
  let getters;
  let store;
  let selection;

  beforeEach(() => {
    objects = [];

    canvas = new Snap(800, 600);

    for (let i = 0; i < 10; i += 5) {
      const el = canvas.line(i, 0, i + 5, 5);
      const types = ["line", "some-line"];
      objects.push(new CanvasObject(el, types));
    }

    getters = {
      getObjects() {
        return objects;
      }
    };

    store = new Vuex.Store({
      getters
    });

    selection = new Selection(store);
  });

  it("checks 'selected' property", () => {
    selection.selectAll();
    objects.forEach(obj => {
      expect(obj.selected).toBe(true);
    });
  });

  it("checks 'highlighted' class", () => {
    selection.selectAll();
    objects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBe(true);
    });
  });
});

describe("unselectAll", () => {
  let objects;
  let canvas;
  let getters;
  let store;
  let selection;

  beforeEach(() => {
    objects = [];

    canvas = new Snap(800, 600);

    for (let i = 0; i < 10; i += 5) {
      const el = canvas.line(i, 0, i + 5, 5);
      const types = ["line", "some-line"];
      objects.push(new CanvasObject(el, types));
    }

    getters = {
      getObjects() {
        return objects;
      }
    };

    store = new Vuex.Store({
      getters
    });

    selection = new Selection(store);
  });

  it("checks 'selected' property", () => {
    selection.selectAll();
    selection.unselectAll();
    objects.forEach(obj => {
      expect(obj.selected).toBe(false);
    });
  });

  it("checks 'highlighted' class", () => {
    selection.selectAll();
    selection.unselectAll();
    objects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBe(false);
    });
  });
});
