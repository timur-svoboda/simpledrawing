import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Canvas from "./../../src/classes/Canvas.js";

const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Canvas.js event handling", () => {
  const store = new Vuex.Store({
    scale: 4,
    getters: {
      getScale(state) {
        return state.scale;
      }
    }
  });
  const paper = Snap(1366, 600);

  const canvasInstance = new Canvas(paper, store);

  canvasInstance._bindEvents();

  let field;

  beforeEach(() => {
    field = canvasInstance._drawField(0, 0, 100, 20, "", "some-id");
  });

  afterEach(() => {
    field.remove();
  });

  it("adds class 'inscription__field_highlighted' when a field focused", () => {
    field.node.dispatchEvent(new MouseEvent("click"));
    field.node.dispatchEvent(new FocusEvent("focus"));

    expect(
      field.node.classList.contains("inscription__field_highlighted")
    ).toBe(true);
  });

  it("removes class 'inscription__field_highlighted' when a field blured", () => {
    field.node.dispatchEvent(new MouseEvent("click"));
    field.node.dispatchEvent(new FocusEvent("focus"));
    field.node.dispatchEvent(new FocusEvent("blur"));

    expect(
      field.node.classList.contains("inscription__field_highlighted")
    ).toBe(false);
  });

  it("renders the textContent of the field", () => {
    field.node.dispatchEvent(new MouseEvent("click"));
    field.node.dispatchEvent(new FocusEvent("focus"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));

    expect(field.select("text").node.textContent).toBe("t");
  });

  it("renders the textContent of the field", () => {
    field.node.dispatchEvent(new MouseEvent("click"));
    field.node.dispatchEvent(new FocusEvent("focus"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));

    expect(field.select("text").node.textContent).toBe("");
  });
});
