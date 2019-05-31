/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#create
  - calls circleCreator.create when an arc type is 'circle'
  - calls circularArcCreator.create when an arc type is 'circular-arc'
  - doesn't call circularArcCreator.create when an arc type is 'circle'
  - doesn't call circleCreator.create when an arc type is 'circular-arc'
  - checks if objects length equals 1 when res, res.done, and res.value are defined
  - adds res.value when res, res.done, and res.value are defined
  - doesn't add res.value when res isn't defined
  - doesn't add res.value when res.done is false
  - doesn't add res.value when res.value isn't defined
#reset
  - calls circleCreator.reset when an arc type is 'circle'
  - calls circularArcCreator.reset when an arc type is 'circular-arc'
  - doesn't call circularArcCreator.reset when an arc type is 'circle'
  - doesn't call circleCreator.reset when an arc type is 'circular-arc'
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ArcCreator from "@/classes/circular-arc/ArcCreator.js";
import Point from "@/classes/Point.js";
const Snap = require("./../../../node_modules/snapsvg/dist/snap.svg-min.js");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#create", () => {
  let canvas;
  let store;
  let curTool;
  let objects;
  let arcCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.getters.getCurrentTool = {};
    curTool = store.getters.getCurrentTool;
    store.getters.getObjects = [];
    objects = store.getters.getObjects;

    arcCreator = new ArcCreator(canvas, store);
    arcCreator.circleCreator.create = jest.fn();
    arcCreator.circularArcCreator.create = jest.fn();
  });

  it("calls circleCreator.create when an arc type is 'circle'", () => {
    curTool.arcType = "circle";
    arcCreator.create(new Point(100, 100));
    expect(arcCreator.circleCreator.create.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator.create when an arc type is 'circular-arc'", () => {
    curTool.arcType = "circular-arc";
    arcCreator.create(new Point(100, 100));
    expect(arcCreator.circularArcCreator.create.mock.calls.length).toBe(1);
  });

  it("doesn't call circularArcCreator.create when an arc type is 'circle'", () => {
    curTool.arcType = "circle";
    arcCreator.create(new Point(100, 100));
    expect(arcCreator.circularArcCreator.create.mock.calls.length).toBe(0);
  });

  it("doesn't call circleCreator.create when an arc type is 'circular-arc'", () => {
    curTool.arcType = "circular-arc";
    arcCreator.create(new Point(100, 100));
    expect(arcCreator.circleCreator.create.mock.calls.length).toBe(0);
  });

  it("checks if objects length equals 1 when res, res.done, and res.value are defined", () => {
    curTool.arcType = "circle";
    arcCreator.circleCreator.create.mockReturnValue({
      value: 10,
      done: true
    });

    arcCreator.create(new Point(100, 100));

    expect(objects.length).toBe(1);
  });

  it("adds res.value when res, res.done, and res.value are defined", () => {
    curTool.arcType = "circle";
    arcCreator.circleCreator.create.mockReturnValue({
      value: 10,
      done: true
    });

    arcCreator.create(new Point(100, 100));

    expect(objects[0]).toBe(10);
  });

  it("doesn't add res.value when res isn't defined", () => {
    curTool.arcType = "circle";
    arcCreator.circleCreator.create.mockReturnValue(undefined);

    arcCreator.create(new Point(100, 100));

    expect(objects.length).toBe(0);
  });

  it("doesn't add res.value when res.done is false", () => {
    curTool.arcType = "circle";
    arcCreator.circleCreator.create.mockReturnValue({
      done: false,
      value: 10
    });

    arcCreator.create(new Point(100, 100));

    expect(objects.length).toBe(0);
  });

  it("doesn't add res.value when res.value isn't defined", () => {
    curTool.arcType = "circle";
    arcCreator.circleCreator.create.mockReturnValue({
      done: true
    });

    arcCreator.create(new Point(100, 100));

    expect(objects.length).toBe(0);
  });
});

describe("#reset", () => {
  let canvas;
  let store;
  let curTool;
  let arcCreator;

  beforeEach(() => {
    canvas = new Snap(800, 600);

    store = new Vuex.Store();
    store.getters.getCurrentTool = {};
    curTool = store.getters.getCurrentTool;

    arcCreator = new ArcCreator(canvas, store);
    arcCreator.circleCreator.reset = jest.fn();
    arcCreator.circularArcCreator.reset = jest.fn();
  });

  it("calls circleCreator.reset when an arc type is 'circle'", () => {
    curTool.arcType = "circle";
    arcCreator.reset(new Point(100, 100));
    expect(arcCreator.circleCreator.reset.mock.calls.length).toBe(1);
  });

  it("calls circularArcCreator.reset when an arc type is 'circular-arc'", () => {
    curTool.arcType = "circular-arc";
    arcCreator.reset(new Point(100, 100));
    expect(arcCreator.circularArcCreator.reset.mock.calls.length).toBe(1);
  });

  it("doesn't call circularArcCreator.reset when an arc type is 'circle'", () => {
    curTool.arcType = "circle";
    arcCreator.reset(new Point(100, 100));
    expect(arcCreator.circularArcCreator.reset.mock.calls.length).toBe(0);
  });

  it("doesn't call circleCreator.reset when an arc type is 'circular-arc'", () => {
    curTool.arcType = "circular-arc";
    arcCreator.reset(new Point(100, 100));
    expect(arcCreator.circleCreator.reset.mock.calls.length).toBe(0);
  });
});
