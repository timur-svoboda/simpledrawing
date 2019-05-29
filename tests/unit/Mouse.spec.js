import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Mouse from "@/classes/Mouse.js";
import Point from "@/classes/Point.js";

const localVue = createLocalVue();

localVue.use(Vuex);

/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
# Method - number of tests
# getCoords - 2
# _getDistancesToObjects - 2
--------------------------------------------------------------*/

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

describe("_getDistancesToObjects", () => {
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
