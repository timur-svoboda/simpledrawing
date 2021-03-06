/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#init
  - calls mainInscription.draw once
  - calls mainInscription._bindEvents once
  - checks if a returned value is mainInscription.inscr
#_drawField
  - checks the existance of the field
  - checks the 'main-inscription__field' class of the field
  - checks the id of the field
  - checks the children number
  - checks the existance of the border
  - checks the existance of the text
  - checks the text
#focus and blur events
  - checks adding a class
  - checks removing a class
#keydown event
  - prints 'a' letter
  - prints 'a' and 'b' letters
  - prints 'a' and 'b' letters and erases the 'b' letter with 'Backspace'
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MainInscription from "@/classes/MainInscription.js";
const Snap = require("./../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#init", () => {
  let paper;
  let store;
  let mainInscription;

  beforeEach(() => {
    paper = new Snap(800, 600);

    store = new Vuex.Store();

    mainInscription = new MainInscription(0, 0, paper, store);
    mainInscription._draw = jest.fn();
    mainInscription._bindEvents = jest.fn();
  });

  it("calls mainInscription._draw once", () => {
    mainInscription.init();

    expect(mainInscription._draw.mock.calls.length).toBe(1);
  });

  it("calls mainInscription._bindEvents once", () => {
    mainInscription.init();

    expect(mainInscription._bindEvents.mock.calls.length).toBe(1);
  });

  it("checks if a returned value is mainInscription.inscr", () => {
    const returnedValue = mainInscription.init();

    expect(returnedValue).toBe(mainInscription.inscr);
  });
});

describe("#_drawField", () => {
  let paper;
  let getters;
  let store;
  let field;

  beforeEach(() => {
    getters = {
      getScale() {
        return 4;
      }
    };

    store = new Vuex.Store({
      getters
    });

    paper = new Snap(800, 600);
  });

  afterEach(() => {
    field.remove();
  });

  it("checks the existance of the field", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(field).toBeDefined();
  });

  it("checks the 'main-inscription__field' class of the field", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(
      field.node.classList.contains("main-inscription__field")
    ).toBeTruthy();
  });

  it("checks the id of the field", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(field.id).toBe("some-id");
    expect(field.node.id).toBe("some-id");
  });

  it("checks the children number", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(field.node.childElementCount).toBe(2);
  });

  it("checks the existance of the border", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(field.node.querySelector("rect")).toBeDefined();
  });

  it("checks the existance of the text", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    expect(field.node.querySelector("text")).toBeDefined();
  });

  it("checks the text", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");
    const text = field.node.querySelector("text");
    expect(text.textContent).toBe("some text");
  });
});

describe("#focus and blur events", () => {
  let paper;
  let getters;
  let store;
  let field;

  beforeEach(() => {
    getters = {
      getScale() {
        return 4;
      }
    };

    store = new Vuex.Store({
      getters
    });

    paper = new Snap(800, 600);
  });

  afterEach(() => {
    field.remove();
  });

  it("checks adding a class", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");

    field.node.dispatchEvent(new FocusEvent("focus"));

    expect(
      field.node.classList.contains("inscription__field_highlighted")
    ).toBeTruthy();
  });

  it("checks removing a class", () => {
    const inscr = new MainInscription(0, 0, paper, store);
    field = inscr._drawField(0, 0, 100, 100, "some text", "some-id");

    field.node.dispatchEvent(new FocusEvent("focus"));
    field.node.dispatchEvent(new FocusEvent("blur"));

    expect(
      field.node.classList.contains("inscription__field_highlighted")
    ).toBeFalsy();
  });
});

describe("#keydown event", () => {
  let paper;
  let getters;
  let store;
  let inscr;

  beforeEach(() => {
    getters = {
      getScale() {
        return 4;
      }
    };

    store = new Vuex.Store({
      getters
    });

    paper = new Snap(800, 600);
  });

  afterEach(() => {
    inscr.remove();
  });

  it("prints 'a' letter", () => {
    const mainInscription = new MainInscription(0, 0, paper, store);
    mainInscription.init();
    inscr = mainInscription.inscr.node;
    const field = document.getElementById("material");
    const text = field.querySelector("text");

    field.dispatchEvent(new FocusEvent("focus"));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

    expect(text.textContent).toBe("a");
  });

  it("prints 'a' and 'b' letters", () => {
    const mainInscription = new MainInscription(0, 0, paper, store);
    mainInscription.init();
    inscr = mainInscription.inscr.node;
    const field = document.getElementById("material");
    const text = field.querySelector("text");

    field.dispatchEvent(new FocusEvent("focus"));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "b" }));

    expect(text.textContent).toBe("ab");
  });

  it("prints 'a' and 'b' letters and erases the 'b' letter with 'Backspace'", () => {
    const mainInscription = new MainInscription(0, 0, paper, store);
    mainInscription.init();
    inscr = mainInscription.inscr.node;
    const field = document.getElementById("material");
    const text = field.querySelector("text");

    field.dispatchEvent(new FocusEvent("focus"));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "b" }));
    inscr.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));

    expect(text.textContent).toBe("a");
  });
});
