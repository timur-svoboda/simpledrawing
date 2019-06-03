/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#getCoords
  - checks X coord
  - checks Y coord
#getBindingCoords
#getClosestObject
  - checks if co is null when objects length equals 0
  - checks if co isn't null when objects length is more than 0
  - checks if co id is 2
  - checks if dist isn't null when objects length is more than 0
  - checks if dist equals 65
#_getDistancesToObjects
  - checks length of a result array
  - checks each dist for compliance
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Mouse from "@/classes/Mouse.js";
import Point from "@/classes/Point.js";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#getCoords", () => {
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
    const x = mouse.getCoords(e).x;

    expect(x).toBe(100);
  });

  it("checks Y coord", () => {
    const e = new MouseEvent("click");
    e.offsetX = 100;
    e.offsetY = 200;
    const y = mouse.getCoords(e).y;

    expect(y).toBe(300);
  });
});

describe("#getBindingCoords", () => {
  let store;
  let mouse;
  let event;
  let point;

  beforeEach(() => {
    store = new Vuex.Store();
    store.getters.getControlPoints = [];
    store.getters.getBindingDistance = 10;

    mouse = new Mouse(store);
    mouse.getCoords = jest.fn();
    mouse.getCoords.mockReturnValue(new Point(123, 321));
    mouse.getClosestObject = jest.fn();

    event = new MouseEvent("click");
  });

  it("doesn't bind x coord when co is null", () => {
    mouse.getClosestObject.mockReturnValue({ co: null, dist: 5 });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.x).toBe(123);
  });

  it("doesn't bind y coord when co is null", () => {
    mouse.getClosestObject.mockReturnValue({ co: null, dist: 5 });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.y).toBe(321);
  });

  it("doesn't bind x coord when dist is null", () => {
    mouse.getClosestObject.mockReturnValue({
      co: { x: 321, y: 123 },
      dist: null
    });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.x).toBe(123);
  });

  it("doesn't bind y coord when dist is null", () => {
    mouse.getClosestObject.mockReturnValue({
      co: { x: 321, y: 123 },
      dist: null
    });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.y).toBe(321);
  });

  it("doesn't bind x coord when railState is false", () => {
    mouse.getClosestObject.mockReturnValue({ co: { x: 321, y: 123 }, dist: 5 });
    store.getters.getRailsState = false;

    point = mouse.getBindingCoords(event);

    expect(point.x).toBe(123);
  });

  it("doesn't bind y coord when railState is false", () => {
    mouse.getClosestObject.mockReturnValue({ co: { x: 321, y: 123 }, dist: 5 });
    store.getters.getRailsState = false;

    point = mouse.getBindingCoords(event);

    expect(point.y).toBe(321);
  });

  it("doesn't bind x coord when dist is more than bindingDistance", () => {
    mouse.getClosestObject.mockReturnValue({
      co: { x: 321, y: 123 },
      dist: 15
    });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.x).toBe(123);
  });

  it("doesn't bind y coord when dist is more than bindingDistance", () => {
    mouse.getClosestObject.mockReturnValue({
      co: { x: 321, y: 123 },
      dist: 15
    });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.y).toBe(321);
  });

  it("binds x coord when dist is less than or equals bindingDistance", () => {
    mouse.getClosestObject.mockReturnValue({ co: { x: 321, y: 123 }, dist: 5 });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.x).toBe(321);
  });

  it("binds y coord when dist is less than or equals bindingDistance", () => {
    mouse.getClosestObject.mockReturnValue({ co: { x: 321, y: 123 }, dist: 5 });
    store.getters.getRailsState = true;

    point = mouse.getBindingCoords(event);

    expect(point.y).toBe(123);
  });
});

describe("#getClosestObject", () => {
  let store;
  let mouse;
  let dists;
  let point;
  let objects;

  beforeEach(() => {
    store = new Vuex.Store();
    store.getters.getObjects = [];

    mouse = new Mouse(store);
    mouse._getDistancesToObjects = jest.fn();
    dists = [120, 200, 65, 80, 66];
    mouse._getDistancesToObjects.mockReturnValue(dists);

    point = new Point(100, 100);
    objects = [];
    for (let i = 0; i < 5; i++) {
      objects.push({ id: i });
    }
  });

  it("checks if co is null when objects length equals 0", () => {
    objects = [];

    const { co } = mouse.getClosestObject(point, objects);

    expect(co).toBeNull();
  });

  it("checks if co isn't null when objects length is more than 0", () => {
    const { co } = mouse.getClosestObject(point, objects);

    expect(co).not.toBeNull();
  });

  it("checks if co id is 2", () => {
    const { co } = mouse.getClosestObject(point, objects);

    expect(co.id).toBe(2);
  });

  it("checks if dist isn't null when objects length is more than 0", () => {
    const { dist } = mouse.getClosestObject(point, objects);

    expect(dist).not.toBeNull();
  });

  it("checks if dist equals 65", () => {
    const { dist } = mouse.getClosestObject(point, objects);

    expect(dist).toBe(65);
  });
});

describe("#_getDistancesToObjects", () => {
  let store;
  let point;
  let objects;
  let mouse;

  beforeEach(() => {
    store = new Vuex.Store();
    mouse = new Mouse(store);

    point = new Point(100, 200);
    objects = [];

    for (let i = 0; i < 10; i++) {
      const obj = {};
      obj.distToPoint = jest.fn();
      obj.distToPoint.mockReturnValue(i);
      objects.push(obj);
    }
  });

  it("checks length of a result array", () => {
    const dists = mouse._getDistancesToObjects(point, objects);

    expect(dists.length).toBe(objects.length);
  });

  it("checks each dist for compliance", () => {
    const dists = mouse._getDistancesToObjects(point, objects);

    objects.forEach((item, i) => {
      const dist = item.distToPoint();
      expect(dist).toBe(dists[i]);
    });
  });
});
