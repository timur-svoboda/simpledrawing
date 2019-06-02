/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#select
#selectAll
  - adds 'selected' property
  - adds 'highlighted' class
#unselectAll
  - removes 'selected' property
  - removes 'highlighted' class
#reset
  - calls unselectAll once
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Selection from "@/classes/Selection.js";
import CanvasObject from "@/classes/CanvasObject.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#select", () => {
  let store;
  let objects;
  let selection;
  let coords;
  let closest;
  let co;
  let dist;
  let event;

  beforeEach(() => {
    store = new Vuex.Store();
    objects = store.getters.getObjects = [];

    selection = new Selection(store);
    selection.unselectAll = jest.fn();

    coords = selection.mouse.getCoords = jest.fn();
    closest = selection.mouse.getClosestObject = jest.fn();
    co = {};
    co.select = jest.fn();
    co.unselect = jest.fn();
    dist = 10;
    closest.mockReturnValue({ co, dist });
  });

  it("calls unselectAll once when dist > bdist and ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: false
    });

    selection.select(event);

    expect(selection.unselectAll.mock.calls.length).toBe(1);
  });

  it("doesn't call co.select when dist > bdist and ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: false
    });

    selection.select(event);

    expect(co.select.mock.calls.length).toBe(0);
  });

  it("doesn't call co.unselect when dist > bdist and ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: false
    });

    selection.select(event);

    expect(co.unselect.mock.calls.length).toBe(0);
  });

  it("doesn't call unselectAll when dist > bdist and ctrlKey is pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: true
    });

    selection.select(event);

    expect(selection.unselectAll.mock.calls.length).toBe(0);
  });

  it("doesn't call co.select when dist > bdist and ctrlKey is pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: true
    });

    selection.select(event);

    expect(co.select.mock.calls.length).toBe(0);
  });

  it("doesn't call co.unselect when dist > bdist and ctrlKey is pressed", () => {
    store.getters.getBindingDistance = 5;
    event = new MouseEvent("click", {
      ctrlKey: true
    });

    selection.select(event);

    expect(co.unselect.mock.calls.length).toBe(0);
  });

  it("doesn't call unselectAll when dist <= bdist, ctrlKey is pressed, and co.selected is false", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = false;

    selection.select(event);

    expect(selection.unselectAll.mock.calls.length).toBe(0);
  });

  it("calls co.select once when dist <= bdist, ctrlKey is pressed, and co.selected is false", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = false;

    selection.select(event);

    expect(co.select.mock.calls.length).toBe(1);
  });

  it("doesn't call co.unselect when dist <= bdist, ctrlKey is pressed, and co.selected is false", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = false;

    selection.select(event);

    expect(co.unselect.mock.calls.length).toBe(0);
  });

  it("doesn't call unselectAll when dist <= bdist, ctrlKey is pressed, and co.selected is true", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = true;

    selection.select(event);

    expect(selection.unselectAll.mock.calls.length).toBe(0);
  });

  it("doesn't call co.select when dist <= bdist, ctrlKey is pressed, and co.selected is true", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = true;

    selection.select(event);

    expect(co.select.mock.calls.length).toBe(0);
  });

  it("calls co.unselect once when dist <= bdist, ctrlKey is pressed, and co.selected is true", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click", {
      ctrlKey: true
    });
    co.selected = true;

    selection.select(event);

    expect(co.unselect.mock.calls.length).toBe(1);
  });

  it("calls unselectAll once when dist <= bdist, ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click");
    co.selected = true;

    selection.select(event);

    expect(selection.unselectAll.mock.calls.length).toBe(1);
  });

  it("calls co.select once when dist <= bdist, ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click");
    co.selected = true;

    selection.select(event);

    expect(co.select.mock.calls.length).toBe(1);
  });

  it("doesn't call co.unselect when dist <= bdist, ctrlKey isn't pressed", () => {
    store.getters.getBindingDistance = 15;
    event = new MouseEvent("click");
    co.selected = true;

    selection.select(event);

    expect(co.unselect.mock.calls.length).toBe(0);
  });
});

describe("#selectAll", () => {
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

  it("adds 'selected' property", () => {
    selection.selectAll();
    objects.forEach(obj => {
      expect(obj.selected).toBe(true);
    });
  });

  it("adds 'highlighted' class", () => {
    selection.selectAll();
    objects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBe(true);
    });
  });
});

describe("#unselectAll", () => {
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

  it("removes 'selected' property", () => {
    selection.selectAll();
    selection.unselectAll();
    objects.forEach(obj => {
      expect(obj.selected).toBe(false);
    });
  });

  it("removes 'highlighted' class", () => {
    selection.selectAll();
    selection.unselectAll();
    objects.forEach(obj => {
      expect(obj.el.hasClass("highlighted")).toBe(false);
    });
  });
});

describe("#reset", () => {
  let store;
  let selection;

  beforeEach(() => {
    store = new Vuex.Store();
    selection = new Selection(store);
    selection.unselectAll = jest.fn();
  });

  it("calls unselectAll once", () => {
    selection.reset();

    expect(selection.unselectAll.mock.calls.length).toBe(1);
  });
});
